import { createContext, useContext, useEffect, useState } from "react";
import { fetchJobs } from "../api/api";
import { jobOpenings as mockJobOpenings } from "../api/mockData";

const JobsContext = createContext(null);

// The backend's job dict uses required_skills (snake_case) and has no
// eligibility field. Normalize it to the same shape the pages were
// already written against (requiredSkills, eligibility) so existing
// UI code doesn't need to branch on where the data came from.
const normalizeBackendJob = (job) => ({
  id: String(job.id),
  title: job.title,
  company: job.company,
  location: job.location || "",
  description: job.description || "",
  requiredSkills: job.required_skills || [],
  eligibility: "See the job description for eligibility details.",
});

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(mockJobOpenings);
  const [source, setSource] = useState("mock"); // "backend" | "mock"
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const backendJobs = await fetchJobs();
      if (Array.isArray(backendJobs) && backendJobs.length > 0) {
        setJobs(backendJobs.map(normalizeBackendJob));
        setSource("backend");
      } else {
        // Backend reachable but empty (e.g. fresh DB, seed.py not run
        // yet) — keep the demo usable with sample listings.
        setJobs(mockJobOpenings);
        setSource("mock");
      }
    } catch {
      // Backend not running / not reachable — fall back to the local
      // sample listings so the Student section still works standalone.
      setJobs(mockJobOpenings);
      setSource("mock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, source, loading, refreshJobs: loadJobs }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs must be used within a JobsProvider");
  return ctx;
}
