# Campus Prep — React Frontend

A React frontend for the Campus Prep placement platform, connected to the
`Campus-prep_E5` Flask backend.

## Scope of this build

- **Student** section connects to the real backend for login, job listings,
  and CV upload/skill-matching. If the backend isn't running, these pages
  fall back to local mock data so the demo still works standalone.
- CV editing and job applications have no matching backend fields/endpoints
  yet, so they stay on frontend state / `localStorage`, same as before.
- **Admin → Add Job** and **Mentor → Upload Module** are wired to the
  backend's `POST /jobs` and `POST /modules`. **Admin → Manage Openings**
  reads live data from `GET /jobs`. Everything else under Mentor/Admin
  (edit/delete job or module, companies, performance) remains a UI
  placeholder — the backend has no endpoints for those yet.
- Design is strictly black, white and grayscale.

## Getting started

### 1. Run the backend (Campus-prep_E5)

```bash
cd backend
pip install -r requirements.txt
python seed.py      # first time only — creates app.db with sample data
python app.py        # runs on http://localhost:5000
```

### 2. Run this frontend

```bash
cp .env.example .env   # defaults to http://localhost:5000, edit if needed
npm install
npm start
```

The app runs at `http://localhost:3000`. It also works with the backend
turned off — job listings and skill-matching just fall back to bundled
sample data in that case.

### Demo accounts

The backend seeds one account (`student@demo.com` / `demo`, role: student).
For mentor/admin logins, either add users directly to the backend's
database, or use the local-only demo accounts below (these exist purely in
this frontend's `localStorage` and don't hit the backend):

| Role    | Email                     | Password    |
|---------|---------------------------|-------------|
| Student | student@campusprep.com    | student123  |
| Mentor  | mentor@campusprep.com     | mentor123   |
| Admin   | admin@campusprep.com      | admin123    |

You can also register a new account for any role from the Register page —
registration is local-only, since the backend has no `/register` route.

## Backend integration

`src/api/api.js` calls the backend at the URL in `REACT_APP_API_URL`
(`.env`, defaults to `http://localhost:5000`) for everything it exposes:

| Function             | Backend route      |
|----------------------|---------------------|
| `loginUser`           | `POST /login`        |
| `fetchJobs`           | `GET /jobs`           |
| `createJob`           | `POST /jobs`          |
| `createModule`        | `POST /modules`       |
| `submitCVUpload`      | `POST /upload-cv`     |
| `checkBackendHealth`  | `GET /health`         |

`registerUser`, `submitCVEdit`, and `submitApplication` remain local-only,
since the backend has no matching endpoints — calling one would just 404.

## Project structure

```
src/
├── api/            mock/fallback data + the API layer (src/api/api.js)
├── components/     Navbar, Sidebar, ProfileMenu, Footer, layout, guards
├── context/        Auth, Theme, CV, Jobs, Applications (state + localStorage)
├── pages/
│   ├── Home, Login, Register
│   ├── student/    Dashboard, CV, Jobs, Job Details, Applications, Modules
│   ├── mentor/     Upload Module is live; the rest are UI placeholders
│   └── admin/      Add Job & Manage Openings are live; the rest are UI placeholders
└── styles/         theme.css — black/white/grayscale design system
```

## Notes

- CV structured data and applications persist in `localStorage`, so they
  survive a page refresh.
- The uploaded CV file is kept in memory (via React context) so it stays
  available while navigating between CV Upload, Edit and Preview.
- Only PDF and DOCX files are parsed for skill-matching (matches the
  backend's `cv_parser.py`); a `.doc` upload is still kept and previewed,
  it just won't be matched against jobs.
- Theme (light/dark, both black-and-white) is switchable from the Profile
  menu and persists across sessions.
