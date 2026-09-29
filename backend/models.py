from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(20), default="student")

class Company(db.Model):
    __tablename__ = "company"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    industry = db.Column(db.String(100))
    location = db.Column(db.String(100))

    jobs = db.relationship("Job", backref="company", lazy=True)

class Job(db.Model):
    __tablename__ = "job"
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(
        db.Integer,
        db.ForeignKey("company.id"),
        nullable=False,
    )
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    required_skills = db.Column(db.Text)
    location = db.Column(db.String(100))
    matches = db.relationship("Match", backref="job", lazy=True)

class CVUpload(db.Model):
    __tablename__ = "cv_upload"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False,
    )
    file_path = db.Column(db.String(300))
    extracted_text = db.Column(db.Text)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    matches = db.relationship("Match", backref="cv", lazy=True)

class Module(db.Model):
    __tablename__ = "module"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    mentor_name = db.Column(db.String(120))
    skills_taught = db.Column(db.Text)
    file_path = db.Column(db.String(300))

class Match(db.Model):
    __tablename__ = "match"
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(
        db.Integer,
        db.ForeignKey("cv_upload.id"),
        nullable=False,
    )
    job_id = db.Column(
        db.Integer,
        db.ForeignKey("job.id"),
        nullable=False,
    )
    match_percentage = db.Column(db.Float)
    matched_skills = db.Column(db.Text)
    missing_skills = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Skill(db.Model):
    __tablename__ = "skill"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    category = db.Column(db.String(100))

class Application(db.Model):
    __tablename__ = "application"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False,
    )
    job_id = db.Column(
        db.Integer,
        db.ForeignKey("job.id"),
        nullable=False,
    )
    status = db.Column(db.String(30), default="Applied")
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship("User", backref="applications")
    job = db.relationship("Job", backref="applications")