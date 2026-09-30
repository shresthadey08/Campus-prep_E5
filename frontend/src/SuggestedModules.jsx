import { useState } from "react";
import { API } from "./helpers.jsx";

const STORE_KEY = "downloadedModules";

// Files downloaded during this session, kept so they can be reopened instantly.
const blobCache = new Map();

function loadDownloaded() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveDownloaded(list) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable: the module will simply download again next time
  }
}

function moduleFileUrl(m) {
  if (m.file_url) return m.file_url;
  if (m.download_url) return m.download_url;
  if (m.file_path) {
    if (/^https?:\/\//i.test(m.file_path)) return m.file_path;
    return `${API}/uploads/modules/${encodeURIComponent(m.file_path)}`;
  }
  return null;
}

function moduleFileName(m, url) {
  const raw = m.file_path || decodeURIComponent(url.split("?")[0].split("/").pop());
  return raw.split(/[\\/]/).pop() || "module";
}

export default function SuggestedModules({ modules }) {
  const list = modules || [];
  const [downloaded, setDownloaded] = useState(loadDownloaded);
  const [busyUrl, setBusyUrl] = useState("");
  const [errors, setErrors] = useState({});

  function openFile(url) {
    window.open(blobCache.get(url) || url, "_blank", "noopener");
  }

  async function handleModuleClick(e, m, url) {
    e.preventDefault();

    // already downloaded -> just open it
    if (downloaded.includes(url)) {
      openFile(url);
      return;
    }

    // first click -> download it
    setBusyUrl(url);
    setErrors((prev) => ({ ...prev, [url]: "" }));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Request failed (" + res.status + ")");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      blobCache.set(url, objectUrl);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = moduleFileName(m, url);
      document.body.appendChild(a);
      a.click();
      a.remove();

      const next = [...downloaded, url];
      setDownloaded(next);
      saveDownloaded(next);
    } catch {
      setErrors((prev) => ({
        ...prev,
        [url]: "Could not download this file. Please try again.",
      }));
    }
    setBusyUrl("");
  }

  return (
    <div className="page">
      <div className="panel">
        <h2>Suggested Modules</h2>
        {list.length === 0 ? (
          <p className="hint">
            Upload your CV under Resume Analysis to see the learning modules
            recommended for you.
          </p>
        ) : (
          list.map((m, i) => {
            const fileUrl = moduleFileUrl(m);
            const isDownloaded = fileUrl && downloaded.includes(fileUrl);
            const details = [
              m.mentor || m.mentor_name,
              Array.isArray(m.skills_taught)
                ? m.skills_taught.join(", ")
                : Array.isArray(m.skills)
                  ? m.skills.join(", ")
                  : m.skills,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <div className="module" key={i}>
                {fileUrl ? (
                  <a
                    className="module-link"
                    href={fileUrl}
                    onClick={(e) => handleModuleClick(e, m, fileUrl)}
                  >
                    {m.title || m.name}
                  </a>
                ) : (
                  <strong>{m.title || m.name}</strong>
                )}
                <span className="label">{details}</span>
                {fileUrl && (
                  <span className="hint">
                    {busyUrl === fileUrl
                      ? "Downloading..."
                      : isDownloaded
                        ? "Downloaded · click to open"
                        : "Click to download"}
                  </span>
                )}
                {fileUrl && errors[fileUrl] && (
                  <span className="message error">{errors[fileUrl]}</span>
                )}
                {!fileUrl && (
                  <span className="hint">No file attached to this module.</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
