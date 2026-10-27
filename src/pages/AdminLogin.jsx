
import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin";
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <div className="admin-login-icon">
          <LockKeyhole size={30} />
        </div>

        <h1>Admin Login</h1>
        <p>Enter your password to continue.</p>

        <label htmlFor="admin-password">Password</label>

        <div className="admin-password-field">
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className="admin-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <button className="admin-login-submit" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

