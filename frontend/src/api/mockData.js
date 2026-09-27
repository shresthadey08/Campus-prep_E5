// ---------------------------------------------------------------------
// Mock / static data for the Campus Prep frontend demo.
//
// Everything here is local, in-memory sample content used so the
// Student section can be fully demonstrated without a backend. When
// backend integration is enabled later, these arrays are replaced by
// real API responses fetched through src/api/api.js.
// ---------------------------------------------------------------------

// Demo accounts so the Login page can be used immediately without
// registering first. New accounts created via Register are appended
// to this same list (persisted in localStorage — see api.js).
export const seedUsers = [
  {
    id: "u-student-demo",
    name: "Aditi Sharma",
    email: "student@campusprep.com",
    password: "student123",
    role: "student",
  },
  {
    id: "u-mentor-demo",
    name: "Rahul Verma",
    email: "mentor@campusprep.com",
    password: "mentor123",
    role: "mentor",
  },
  {
    id: "u-admin-demo",
    name: "Priya Nair",
    email: "admin@campusprep.com",
    password: "admin123",
    role: "admin",
  },
];

// Default structured CV used to pre-fill the Edit CV form the first
// time a student opens it.
export const defaultCV = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  education: [{ degree: "", institution: "", year: "" }],
  skills: ["HTML", "CSS", "JavaScript"],
  projects: [{ title: "", description: "" }],
  experience: [{ role: "", company: "", duration: "" }],
  certifications: [],
};

// Current job openings (static demo listings).
export const jobOpenings = [
  {
    id: "job-1",
    title: "Frontend Developer Intern",
    company: "Nimbus Technologies",
    location: "Bengaluru, India",
    description:
      "Work with the product team to build and maintain user-facing features using React. Good opportunity to learn component-driven development in a small team.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    eligibility: "Pre-final or final year students, CGPA 6.5+",
  },
  {
    id: "job-2",
    title: "Backend Developer (Python)",
    company: "Coral Systems",
    location: "Pune, India",
    description:
      "Assist in building REST APIs and internal tools. Exposure to relational databases and version control expected.",
    requiredSkills: ["Python", "SQL", "Git", "REST API"],
    eligibility: "Final year students, CS/IT background",
  },
  {
    id: "job-3",
    title: "Data Analyst Intern",
    company: "Vertex Analytics",
    location: "Remote",
    description:
      "Support the analytics team with data cleaning, dashboards and basic reporting. Strong spreadsheet and query skills preferred.",
    requiredSkills: ["SQL", "Excel", "Python", "Communication"],
    eligibility: "Any branch, CGPA 6.0+",
  },
  {
    id: "job-4",
    title: "Full-Stack Developer",
    company: "Bramble Labs",
    location: "Hyderabad, India",
    description:
      "Build features across the stack for a small SaaS product — from the database layer up to the React frontend.",
    requiredSkills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
    eligibility: "Final year students",
  },
  {
    id: "job-5",
    title: "Java Developer Trainee",
    company: "Ferro Solutions",
    location: "Chennai, India",
    description:
      "Entry-level role building and testing modules for enterprise applications under senior developer guidance.",
    requiredSkills: ["Java", "SQL", "Git", "Communication"],
    eligibility: "Any branch, CGPA 6.5+",
  },
];

// A simple, static missing/alternative skill map keyed by a skill the
// student already has. This intentionally stays simple frontend logic
// rather than a real recommendation engine.
export const skillGapMap = {
  HTML: { missing: ["React", "Git"], alternative: ["Accessibility Basics"] },
  CSS: { missing: ["React", "Sass"], alternative: ["Tailwind CSS"] },
  JavaScript: { missing: ["React", "Node.js", "Git"], alternative: ["TypeScript"] },
  React: { missing: ["Node.js", "SQL"], alternative: ["Next.js"] },
  Python: { missing: ["Flask", "SQL"], alternative: ["Django"] },
  SQL: { missing: ["Python", "Git"], alternative: ["MongoDB"] },
  Java: { missing: ["SQL", "Git"], alternative: ["Kotlin"] },
  Git: { missing: ["REST API"], alternative: ["GitHub Actions"] },
};

export const DEFAULT_MISSING_SKILLS = ["React", "Git", "SQL"];
export const DEFAULT_ALTERNATIVE_SKILLS = ["TypeScript", "Next.js", "Tailwind CSS"];

// Modules/samples provided by mentors.
export const suggestedModules = [
  {
    id: "mod-1",
    title: "Resume Writing Basics",
    description: "A short guide covering structure, formatting and common mistakes to avoid.",
    mentorName: "Rahul Verma",
    details:
      "Covers how to structure a one-page resume, choosing action verbs, quantifying achievements, and formatting consistently. Includes a short checklist to review before submitting a resume for placements.",
  },
  {
    id: "mod-2",
    title: "Cracking the Technical Interview",
    description: "Overview of common data structures and problem-solving patterns asked in interviews.",
    mentorName: "Rahul Verma",
    details:
      "Walks through frequently asked topics — arrays, strings, recursion and basic graph traversal — along with a suggested approach for breaking down a new problem during a live interview.",
  },
  {
    id: "mod-3",
    title: "Git & Version Control Essentials",
    description: "Hands-on notes on branching, commits and collaborating with Git.",
    mentorName: "Neha Kapoor",
    details:
      "Explains the basic Git workflow: init, add, commit, branch, merge and resolving simple conflicts. Also covers writing clear commit messages and using .gitignore effectively.",
  },
  {
    id: "mod-4",
    title: "SQL for Interviews",
    description: "Practice queries and concepts frequently tested in placement interviews.",
    mentorName: "Neha Kapoor",
    details:
      "Reviews SELECT, JOIN, GROUP BY and subqueries with short practice questions, plus a few tips on how interviewers usually frame SQL problems.",
  },
];
