SKILLS_LIST = [
    "Python", "Java", "C++", "JavaScript", "HTML", "CSS",
    "React", "SQL", "MySQL", "MongoDB", "Flask", "Django",
    "Git", "GitHub", "Spring", "Pandas", "NumPy", "Excel",
    "REST API", "Machine Learning"
]


def extract_skills_from_cv(cv_text):
    resume_lower = cv_text.lower()
    return [skill for skill in SKILLS_LIST if skill.lower() in resume_lower]


def match_cv_to_jd(cv_text, jd_skills):
    found_skills = extract_skills_from_cv(cv_text)
    found_lower = [s.lower() for s in found_skills]

    matched = []
    missing = []

    for skill in jd_skills:
        if skill.lower() in found_lower:
            matched.append(skill)
        else:
            missing.append(skill)

    total = len(jd_skills)
    percentage = round((len(matched) / total) * 100, 2) if total > 0 else 0

    return {
        "percentage": percentage,
        "matched": matched,
        "missing": missing,
        "all_cv_skills": found_skills,
    }