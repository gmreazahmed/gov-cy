import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RefreshCw, ShieldCheck } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://gcy.fragavenuebd.com";

const CAPTCHA_CODES = ["D3M0", "T3ST", "P4SS"];

export default function CheckVisa({ records: initialRecords }) {
  const navigate = useNavigate();

  const [records, setRecords] = useState(initialRecords || []);
  const [reference, setReference] = useState("");
  const [dob, setDob] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [code, setCode] = useState("D3M0");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const loadRecords = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/records.php`, {
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error("Could not load sample records.");
      }

      if (!Array.isArray(result.records)) {
        throw new Error("Invalid records response.");
      }

      setRecords(result.records);
      setError("");
    } catch {
      setError(
        "Could not connect to the demo API. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (checking || loading) return;

    if (captcha.trim().toUpperCase() !== code) {
      setError("Incorrect demo security code.");
      return;
    }

    if (!reference.trim() || !dob) {
      setError("Enter your reference and date of birth.");
      return;
    }

    setChecking(true);
    setError("");

    try {
      // Refresh records before checking for the latest database data.
      const response = await fetch(`${API_BASE}/records.php`, {
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (!response.ok || result.success !== true ||
          !Array.isArray(result.records)) {
        throw new Error("Could not retrieve records. Please try again.");
      }

      const currentRecords = result.records;
      setRecords(currentRecords);

      const record = currentRecords.find(
        (item) =>
          String(item.reference || "").trim().toLowerCase() ===
            reference.trim().toLowerCase() &&
          String(item.dob || "").slice(0, 10) === dob
      );

      if (!record) {
        setError("No matching sample record found.");
        return;
      }

      navigate(`/result/${record.id}`);
    } catch (err) {
      setError(
        err.message || "Unable to check status. Please try again."
      );
    } finally {
      setChecking(false);
    }
  }

  function clearForm() {
    setReference("");
    setDob("");
    setCaptcha("");
    setError("");
  }

  function refreshCaptcha() {
    const availableCodes = CAPTCHA_CODES.filter((item) => item !== code);
    const nextCode =
      availableCodes[Math.floor(Math.random() * availableCodes.length)];

    setCode(nextCode);
    setCaptcha("");
    setError("");
  }

  return (
    <>
      <Header />

      <section className="page-heading">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Check Visa Status</span>
          </div>

          <h1>Check Visa Status</h1>

          <p>
            Use this independent practice service to check a sample application.
            Only fictional demo records are supported.
          </p>
        </div>
      </section>

      <main className="container content-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Application details</h2>
          <p className="muted">
            All fields are required.
            {loading ? " Loading records..." : ""}
          </p>

          <div className="form-field">
            <label htmlFor="reference">Application reference</label>
            <input
              id="reference"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="e.g. DEMO-7209991"
              autoComplete="off"
              required
              disabled={checking}
            />
          </div>

          <div className="form-field">
            <label htmlFor="dob">Date of birth</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              required
              disabled={checking}
            />
          </div>

          <div className="form-field">
            <label htmlFor="captcha">Demo security check</label>
            <p className="muted">Enter the sample code shown below.</p>

            <div className="captcha-row">
              <div className="captcha-code" aria-label="Demo security code">
                {code}
              </div>

              <button
                type="button"
                className="btn"
                onClick={refreshCaptcha}
                disabled={checking}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>

            <input
              id="captcha"
              className="captcha-input"
              value={captcha}
              onChange={(event) => setCaptcha(event.target.value)}
              placeholder="Enter demo code"
              autoComplete="off"
              required
              disabled={checking}
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={checking || loading}
            >
              {checking ? "Checking..." : "Check status"}
            </button>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={clearForm}
              disabled={checking}
            >
              Clear form
            </button>
          </div>

          <div className="notice">
            <ShieldCheck size={20} />
            <p>
              This is a practice demo. Do not enter real passport details or
              personal documents.
            </p>
          </div>
        </form>

        <aside className="sidebar">
          <div className="side-card">
            <h3>About this demo</h3>
            <p>
              This independent project demonstrates a sample visa-status lookup
              interface.
            </p>

            <div className="side-info">
              <span>Mode</span>
              <strong>Practice</strong>
            </div>

            <div className="side-info">
              <span>Data</span>
              <strong>Sample records</strong>
            </div>

            <div className="side-info">
              <span>Available records</span>
              <strong>{records.length}</strong>
            </div>
          </div>

          <div className="side-card">
            <h3>Need help?</h3>
            <a href="#instructions">How to use the demo</a>
            <a href="#privacy">Privacy and safety</a>
            <Link to="/admin">Open Admin Demo</Link>
          </div>

          <div className="side-card">
            <h3>Admin access</h3>
            <p>
              Add a fictional sample record in the practice admin panel before
              checking its status.
            </p>

            <Link to="/admin" className="text-link">
              Open Admin Panel →
            </Link>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
}