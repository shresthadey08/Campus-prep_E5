/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";

export const API = "http://localhost:5000";

// fetch wrapper: adds the token (if any) and throws a readable error
export async function request(path, options = {}, token) {
    const headers = { ...(options.headers || {}) };
    if (token) headers.Authorization = "Bearer " + token;
    const res = await fetch(API + path, { ...options, headers });
    let data;
    try {
        data = await res.json();
    } catch {
        data = null; // response had no JSON body
    }

    if (!res.ok) {
        throw new Error(
            (data && (data.error || data.message)) ||
                (res.status === 404
                    ? "Not available yet: the backend has no " + path + " endpoint"
                    : "Request failed (" + res.status + ")")
        );
    }
    return data;
}

// builds fetch options for a JSON body
export const jsonOptions = (method, body) => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

// "Python, SQL , React" -> ["python", "sql", "react"]
export const skillList = (text) =>
    text.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

// small reusable form: fields = [{ name, label, type? }]
export function SimpleForm({ title, fields, buttonText, onSubmit }) {
    const [values, setValues] = useState({});
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        try {
            const result = await onSubmit(values);
            setMessage((result && result.message) || "Done");
            setValues({});
        } catch (err) {
            setMessage(err.message);
        }
    }

    return (
        <form className="panel" onSubmit={handleSubmit}>
            <h3>{title}</h3>
            {fields.map((f) => (
                <div className="field" key={f.name}>
                    <label>{f.label}</label>
                    <input
                        type={f.type || "text"}
                        value={values[f.name] || ""}
                        onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                        required
                    />
                </div>
            ))}
            <button type="submit">{buttonText}</button>
            {message && <p className="message">{message}</p>}
        </form>
    );
}