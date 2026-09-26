from matcher import match_cv_to_jd
import os
import json
import uuid

from flask import Flask, request, jsonify
from flask_cors import CORS

from models import db, User, Company, Job, Module, CVUpload, Match
from cv_parser import extract_text
from matcher import match_cv_to_jd


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = "uploads/cvs"
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

db.init_app(app)
CORS(app)


def job_to_dict(job):
    return {
        "id": job.id,
        "title": job.title,
        "company": job.company.name if job.company else "",
        "location": job.location or "",
        "required_skills": json.loads(job.required_skills or "[]"),
        "description": job.description or "",
    }


def module_to_dict(module):
    return {
        "id": module.id,
        "title": module.title,
        "mentor_name": module.mentor_name or "",
        "skills_taught": json.loads(module.skills_taught or "[]"),
        "file_path": module.file_path or "",
    }


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()
    if not user or user.password_hash != password:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"id": user.id, "name": user.name, "role": user.role})


@app.route("/jobs", methods=["GET"])
def list_jobs():
    return jsonify([job_to_dict(j) for j in Job.query.all()])


@app.route("/jobs", methods=["POST"])
def add_job():
    data = request.get_json() or {}
    company_name = data.get("company", "").strip()
    if not company_name:
        return jsonify({"error": "Company name is required"}), 400

    company = Company.query.filter_by(name=company_name).first()
    if not company:
        company = Company(
            name=company_name,
            industry=data.get("industry", ""),
            location=data.get("location", ""),
        )
        db.session.add(company)
        db.session.commit()

    job = Job(
        company_id=company.id,
        title=data.get("title", ""),
        description=data.get("description", ""),
        required_skills=json.dumps(data.get("required_skills", [])),
        location=data.get("location", ""),
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job_to_dict(job)), 201


@app.route("/modules", methods=["POST"])
def add_module():
    data = request.get_json() or {}
    module = Module(
        title=data.get("title", ""),
        mentor_name=data.get("mentor_name", ""),
        skills_taught=json.dumps(data.get("skills_taught", [])),
        file_path=data.get("file_path", ""),
    )
    db.session.add(module)
    db.session.commit()
    return jsonify(module_to_dict(module)), 201


@app.route("/upload-cv", methods=["POST"])
def upload_cv():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".pdf", ".docx"]:
        return jsonify({"error": "Only PDF and DOCX allowed"}), 400

    unique_name = f"{uuid.uuid4().hex}{ext}"
    save_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_name)
    file.save(save_path)

    try:
        cv_text = extract_text(save_path)
    except Exception as e:
        return jsonify({"error": f"Failed to parse CV: {str(e)}"}), 500

    cv = CVUpload(user_id=1, file_path=save_path, extracted_text=cv_text)
    db.session.add(cv)
    db.session.commit()

    jobs = Job.query.all()
    results = []
    all_missing = set()

    for job in jobs:
        jd_skills = json.loads(job.required_skills or "[]")
        match = match_cv_to_jd(cv_text, jd_skills)

        db.session.add(Match(
            cv_id=cv.id,
            job_id=job.id,
            match_percentage=match["percentage"],
            matched_skills=json.dumps(match["matched"]),
            missing_skills=json.dumps(match["missing"]),
        ))

        all_missing.update(match["missing"])

        results.append({
            "job_id": job.id,
            "title": job.title,
            "company": job.company.name if job.company else "",
            "location": job.location or "",
            "match_percentage": match["percentage"],
            "matched_skills": match["matched"],
            "missing_skills": match["missing"],
        })

    db.session.commit()
    results.sort(key=lambda r: r["match_percentage"], reverse=True)

    modules = Module.query.all()
    recommended_modules = []
    for m in modules:
        taught = json.loads(m.skills_taught or "[]")
        if any(skill in all_missing for skill in taught):
            recommended_modules.append(module_to_dict(m))

    top_scores = [r["match_percentage"] for r in results[:3]]
    overall = round(sum(top_scores) / len(top_scores), 1) if top_scores else 0

    return jsonify({
        "cv_id": cv.id,
        "overall_match": overall,
        "extracted_text_preview": cv_text[:300],
        "recommended_jobs": results,
        "missing_skills": sorted(all_missing),
        "recommended_modules": recommended_modules,
    })


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)