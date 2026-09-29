import { useState } from "react";
import { request, jsonOptions } from "./helpers.jsx";

export default function Auth({ mode, onAuth, onSwitch }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isLogin = mode === "login";

    const demoCredentials = [
        {
            role: "Student",
            email: "student@demo.com",
            password: "demo",
        },
        {
            role: "Mentor",
            email: "mentor@demo.com",
            password: "demo",
        },
        {
            role: "Admin",
            email: "admin@demo.com",
            password: "demo",
        },
    ];

    function handleDemoCredential(email, password) {
        setForm((current) => ({
            ...current,
            email,
            password,
        }));

        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const email = form.email.trim().toLowerCase();

            const body = isLogin
                ? {
                    email,
                    password: form.password,
                }
                : {
                    ...form,
                    email,
                };

            const data = await request(
                isLogin ? "/login" : "/register",
                jsonOptions("POST", body)
            );

            if (isLogin) {
                onAuth(data);
            } else {
                onSwitch("login");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    function switchMode(e) {
        e.preventDefault();

        setError("");

        onSwitch(isLogin ? "register" : "login");
    }

    return (
        <form className="auth-box" onSubmit={handleSubmit}>

            {/* BRAND */}
            <h2>Campus Prep</h2>

            <p className="auth-subtitle">
                {isLogin ? "Log in to continue" : "Create your account"}
            </p>

            {/* NAME - REGISTER ONLY */}
            {!isLogin && (
                <div className="field">
                    <label>Name</label>

                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                        required
                    />
                </div>
            )}

            {/* EMAIL */}
            <div className="field">
                <label>Email</label>

                <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                    required
                />
            </div>

            {/* PASSWORD */}
            <div className="field">
                <label>Password</label>

                <div className="password-wrap">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                        required
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? "HIDE" : "SHOW"}
                    </button>
                </div>
            </div>

            {/* ROLE - REGISTER ONLY */}
            {!isLogin && (
                <div className="field">
                    <label>Role</label>

                    <select
                        value={form.role}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                role: e.target.value,
                            })
                        }
                        required
                    >
                        <option value="student">
                            Student
                        </option>

                        <option value="mentor">
                            Mentor
                        </option>

                        <option value="admin">
                            Admin
                        </option>
                    </select>
                </div>
            )}

            {/* LOGIN / REGISTER BUTTON */}
            <button type="submit">
                {isLogin ? "Login" : "Register"}
            </button>

            {/* ERROR */}
            {error && (
                <p className="message error">
                    {error}
                </p>
            )}

            {/* REGISTER / LOGIN LINK */}
            <p className="switch">
                {isLogin
                    ? "Don't have an account? "
                    : "Already registered? "}

                <a href="#" onClick={switchMode}>
                    {isLogin ? "Register" : "Login"}
                </a>
            </p>

            {/* =========================
                DEMO CREDENTIALS
               ========================= */}
            {isLogin && (
                <div className="demo-credentials">

                    <div className="demo-divider"></div>

                    <div className="demo-credentials-title">
                        Demo credentials (password: demo)
                    </div>

                    <div className="demo-credentials-list">

                        {demoCredentials.map((demo) => (
                            <button
                                key={demo.email}
                                type="button"
                                className="demo-credential"
                                onClick={() =>
                                    handleDemoCredential(
                                        demo.email,
                                        demo.password
                                    )
                                }
                            >
                                {demo.role}
                            </button>
                        ))}

                    </div>



                </div>
            )}

        </form>
    );
}