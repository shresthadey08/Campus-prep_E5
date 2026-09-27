import { createContext, useContext, useEffect, useState } from "react";
import { submitApplication } from "../api/api";

const ApplicationsContext = createContext(null);
const APPLICATIONS_KEY = "cp_applications";

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem(APPLICATIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  }, [applications]);

  const hasApplied = (jobId) => applications.some((a) => a.jobId === jobId);

  const applyToJob = async (job) => {
    if (hasApplied(job.id)) return null;
    const application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: "Applied",
    };
    await submitApplication(application);
    setApplications((prev) => [application, ...prev]);
    return application;
  };

  return (
    <ApplicationsContext.Provider value={{ applications, applyToJob, hasApplied }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error("useApplications must be used within an ApplicationsProvider");
  return ctx;
}
