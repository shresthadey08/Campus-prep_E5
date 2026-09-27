import { createContext, useContext, useEffect, useRef, useState } from "react";
import { defaultCV } from "../api/mockData";

const CVContext = createContext(null);
const CV_DATA_KEY = "cp_cv_data";

export function CVProvider({ children }) {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem(CV_DATA_KEY);
    return saved ? JSON.parse(saved) : defaultCV;
  });

  // The uploaded File object cannot be serialized to localStorage, so it
  // is kept in memory here (at a level above the routed pages) so it
  // survives navigation between CV Upload, Edit and Preview within the
  // same session, per the project's local-frontend requirement.
  const [cvFile, setCvFile] = useState(null);
  const [cvFileUrl, setCvFileUrl] = useState(null);
  const previousUrl = useRef(null);

  // Result of the last successful /upload-cv call: { cv_id,
  // overall_match, extracted_text_preview, recommended_jobs,
  // missing_skills, recommended_modules }. Null until a CV has been
  // uploaded and matched against the backend's job data this session.
  const [matchResults, setMatchResults] = useState(null);

  useEffect(() => {
    localStorage.setItem(CV_DATA_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const setUploadedFile = (file) => {
    if (previousUrl.current) {
      URL.revokeObjectURL(previousUrl.current);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      previousUrl.current = url;
      setCvFile(file);
      setCvFileUrl(url);
    } else {
      previousUrl.current = null;
      setCvFile(null);
      setCvFileUrl(null);
    }
  };

  const updateCVData = (updater) => {
    setCvData((prev) => (typeof updater === "function" ? updater(prev) : updater));
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        updateCVData,
        cvFile,
        cvFileUrl,
        setUploadedFile,
        matchResults,
        setMatchResults,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error("useCV must be used within a CVProvider");
  return ctx;
}
