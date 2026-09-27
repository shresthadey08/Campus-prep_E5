// ---------------------------------------------------------------------
// API layer.
//
// This connects to the Campus-prep_E5 Flask backend for everything the
// backend actually implements:
//   GET  /health
//   POST /login
//   GET  /jobs
//   POST /jobs
//   POST /modules
//   POST /upload-cv
//
// The backend has no endpoints for registration, editing/deleting a
// job or module, or tracking applications, so those stay on local
// frontend state / localStorage (clearly marked below) exactly like
// the original build — this avoids calling routes that don't exist.
// ---------------------------------------------------------------------

import axios from "axios";
import { seedUsers } from "./mockData";

// Backend base URL. Override by setting REACT_APP_API_URL in .env
// (see .env.example). Falls back to the Flask dev server default.
export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL: BASE_URL });

const USERS_KEY = "cp_users";

const delay = (data, ms = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

const readUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
  return seedUsers;
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const extractErrorMessage = (err, fallback) => {
  if (err.response && err.response.data && err.response.data.error) {
    return err.response.data.error;
  }
  if (err.request) {
    return `Could not reach the backend at ${BASE_URL}. Is the Flask server running?`;
  }
  return err.message || fallback;
};

// -----------------------------------------------------------------
// Health check — used to detect whether the backend is reachable.
// -----------------------------------------------------------------

export const checkBackendHealth = async () => {
  try {
    const res = await api.get("/health");
    return res.data?.status === "ok";
  } catch {
    return false;
  }
};

// -----------------------------------------------------------------
// Auth
// -----------------------------------------------------------------
//
// The backend's /login only checks email + password and returns
// { id, name, role } for whatever role is on that account — it does
// not accept role as an input. The role dropdown on the Login page
// is used client-side to confirm the account matches the section the
// user meant to log into.
//
// There is no /register endpoint on the backend, so registration
// stays local (new accounts are stored in localStorage only, same as
// the original build) — this is intentional, not a shortcut we forgot
// to wire up.

export const loginUser = async ({ email, password, role }) => {
  const res = await api.post("/login", { email, password }).catch((err) => {
    if (err.response && err.response.status === 401) {
      throw new Error("Invalid email or password.");
    }
    throw new Error(extractErrorMessage(err, "Unable to log in."));
  });

  const backendUser = res.data;

  if (role && backendUser.role !== role) {
    throw new Error(
      `This account is registered as "${backendUser.role}", not "${role}". Pick the correct role and try again.`
    );
  }

  // The backend doesn't echo the email back, so keep the one the
  // person typed alongside the id/name/role it returns.
  return { id: backendUser.id, name: backendUser.name, role: backendUser.role, email };
};

export const registerUser = ({ name, email, password, role }) => {
  const users = readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return Promise.reject(new Error("An account with this email already exists."));
  }
  const newUser = { id: `u-${Date.now()}`, name, email, password, role };
  users.push(newUser);
  writeUsers(users);

  // Not sent to the backend — there is no POST /register route on
  // Campus-prep_E5 yet. New accounts made here can log in against
  // this same local list, but won't be recognized once real backend
  // login is used with a fresh browser/profile.
  return delay({ ...newUser });
};

// -----------------------------------------------------------------
// Jobs — real backend data.
// -----------------------------------------------------------------

export const fetchJobs = async () => {
  const res = await api.get("/jobs");
  return res.data; // [{ id, title, company, location, required_skills, description }, ...]
};

export const createJob = async ({ title, company, location, description, required_skills }) => {
  const res = await api.post("/jobs", {
    title,
    company,
    location,
    description,
    required_skills,
  });
  return res.data;
};

// -----------------------------------------------------------------
// Modules — real backend data.
// -----------------------------------------------------------------

export const createModule = async ({ title, mentor_name, skills_taught, file_path }) => {
  const res = await api.post("/modules", {
    title,
    mentor_name,
    skills_taught,
    file_path,
  });
  return res.data;
};

// -----------------------------------------------------------------
// CV — file upload goes to the real backend and returns real
// skill-matching results; the manual "Edit CV" form has no matching
// backend field to save to, so it stays local exactly as before.
// -----------------------------------------------------------------

export const submitCVUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api
    .post("/upload-cv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch((err) => {
      throw new Error(extractErrorMessage(err, "Failed to upload and match your CV."));
    });

  // { cv_id, overall_match, extracted_text_preview, recommended_jobs,
  //   missing_skills, recommended_modules }
  return res.data;
};

export const submitCVEdit = (cvData) => {
  // No backend field to persist structured CV form data to yet — kept
  // local, same as the original build.
  return delay(cvData);
};

// -----------------------------------------------------------------
// Applications — the backend has no /applications endpoint yet, so
// this stays on local frontend state / localStorage, same as before.
// -----------------------------------------------------------------

export const submitApplication = (application) => {
  return delay(application);
};

export default api;
