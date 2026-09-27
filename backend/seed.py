import json
from flask import Flask
from werkzeug.security import generate_password_hash
from models import db, User, Company, Job, Module

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

    student = User(
        name="Demo Student",
        email="student@demo.com",
        password_hash=generate_password_hash("demo"),
        role="student",
    )
    mentor = User(
        name="Prof. Ravi",
        email="mentor@demo.com",
        password_hash=generate_password_hash("demo"),
        role="mentor",
    )
    admin = User(
        name="Admin User",
        email="admin@demo.com",
        password_hash=generate_password_hash("demo"),
        role="admin",
    )
    db.session.add_all([student, mentor, admin])
    db.session.commit()

    companies = [
        Company(name="TCS", industry="IT Services", location="Chennai"),
        Company(name="Infosys", industry="IT Services", location="Bangalore"),
        Company(name="Zoho", industry="Software Product", location="Chennai"),
    ]
    db.session.add_all(companies)
    db.session.commit()

    jobs = [
        Job(
            company_id=companies[0].id,
            title="Junior Python Developer",
            description="Build backend services using Python and Flask. Work with SQL databases.",
            required_skills=json.dumps(["python", "flask", "sql", "git"]),
            location="Chennai",
        ),
        Job(
            company_id=companies[0].id,
            title="Data Analyst",
            description="Analyze business data using Python, SQL and visualization tools.",
            required_skills=json.dumps(["python", "sql", "pandas", "excel"]),
            location="Chennai",
        ),
        Job(
            company_id=companies[1].id,
            title="Frontend Developer",
            description="Build responsive web apps using React and JavaScript.",
            required_skills=json.dumps(["javascript", "react", "html", "css"]),
            location="Bangalore",
        ),
        Job(
            company_id=companies[2].id,
            title="Backend Engineer",
            description="Design APIs and services using Java or Python.",
            required_skills=json.dumps(["python", "java", "sql", "rest api"]),
            location="Chennai",
        ),
        Job(
            company_id=companies[2].id,
            title="Machine Learning Intern",
            description="Work on ML models for real-world datasets.",
            required_skills=json.dumps(["python", "machine learning", "numpy", "pandas"]),
            location="Remote",
        ),
    ]
    db.session.add_all(jobs)
    db.session.commit()

    modules = [
        Module(
            title="Python Basics",
            mentor_name="Prof. Ravi",
            skills_taught=json.dumps(["python"]),
            file_path="/uploads/modules/python.pdf",
        ),
        Module(
            title="SQL for Beginners",
            mentor_name="Prof. Meena",
            skills_taught=json.dumps(["sql"]),
            file_path="/uploads/modules/sql.pdf",
        ),
        Module(
            title="Flask Web Development",
            mentor_name="Prof. Ravi",
            skills_taught=json.dumps(["flask", "rest api"]),
            file_path="/uploads/modules/flask.pdf",
        ),
        Module(
            title="React Fundamentals",
            mentor_name="Prof. Anil",
            skills_taught=json.dumps(["react", "javascript"]),
            file_path="/uploads/modules/react.pdf",
        ),
        Module(
            title="Intro to Machine Learning",
            mentor_name="Prof. Meena",
            skills_taught=json.dumps(["machine learning", "numpy", "pandas"]),
            file_path="/uploads/modules/ml.pdf",
        ),
    ]
    db.session.add_all(modules)
    db.session.commit()

    print("Database seeded successfully!")
    print(f"Users: {User.query.count()}")
    print(f"Companies: {Company.query.count()}")
    print(f"Jobs: {Job.query.count()}")
    print(f"Modules: {Module.query.count()}")