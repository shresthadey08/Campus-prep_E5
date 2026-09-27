import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCV } from "../../../context/CVContext";
import { submitCVUpload } from "../../../api/api";

export default function CVUpload() {
  const { cvFile, cvFileUrl, setUploadedFile, matchResults, setMatchResults } = useCV();
  const [error, setError] = useState("");
  const [matching, setMatching] = useState(false);
  const inputRef = useRef(null);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a PDF, DOC or DOCX file.");
      return;
    }

    // The backend only accepts PDF and DOCX for parsing (see
    // cv_parser.py) — a .doc file can still be kept as the student's
    // uploaded file, it just won't be matched against jobs.
    setError("");
    setUploadedFile(file);
    setMatchResults(null);

    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (ext !== ".pdf" && ext !== ".docx") {
      return;
    }

    setMatching(true);
    try {
      const results = await submitCVUpload(file);
      setMatchResults(results);
    } catch (err) {
      setError(
        err.message ||
          "Your file was kept, but it couldn't be matched against job openings right now."
      );
    } finally {
      setMatching(false);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setMatchResults(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const isPdf = cvFile && cvFile.type === "application/pdf";

  return (
    <div className="card">
      <div className="form-group">
        <label htmlFor="cv-file">Select your CV (PDF, DOC or DOCX)</label>
        <input
          id="cv-file"
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      {error && <div className="auth-error">{error}</div>}

      {matching && <p className="page-subtitle">Matching your CV against job openings...</p>}

      {cvFile && (
        <div className="file-row">
          <span>Selected file: <strong>{cvFile.name}</strong></span>
          <button className="btn btn-outline btn-sm" onClick={handleRemove}>
            Remove
          </button>
        </div>
      )}

      {isPdf && cvFileUrl && (
        <iframe
          title="CV PDF preview"
          src={cvFileUrl}
          className="pdf-preview-frame"
        />
      )}

      {cvFile && !isPdf && (
        <p className="page-subtitle" style={{ marginTop: 14 }}>
          A live in-browser preview is only available for PDF files. Your file is
          still saved and can be viewed again from the Preview tab.
        </p>
      )}

      {matchResults && (
        <>
          <hr className="divider" />
          <p className="page-subtitle" style={{ margin: 0 }}>
            Overall match score: <strong>{matchResults.overall_match}%</strong> — see{" "}
            <Link to="/student/jobs/suggested">Suggested Jobs</Link> and{" "}
            <Link to="/student/jobs/missing-skills">Missing Skills</Link> for the full
            breakdown.
          </p>
        </>
      )}

      <hr className="divider" />

      <p className="page-subtitle" style={{ margin: 0 }}>
        You can also fill in your details manually under{" "}
        <Link to="/student/cv/edit">Edit</Link>, or see the combined result under{" "}
        <Link to="/student/cv/preview">Preview</Link>.
      </p>
    </div>
  );
}
