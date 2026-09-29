from app import app
from models import Job, User, Company, Module

with app.app_context():
    print("Users:", User.query.count())
    print("Jobs:", Job.query.count())
    print("Companies:", Company.query.count())
    print("Modules:", Module.query.count())