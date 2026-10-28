import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RefreshCw, ShieldCheck, Info } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./CheckVisa.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://gcy.fragavenuebd.com";

const generateCaptchaCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ023456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

function CaptchaImage({ code }) {
  const lines = [
    [47, 45, 138, 26],
    [67, 57, 179, 56],
    [158, 11, 66, 9],
    [167, 13, 44, 5],
    [23, 35, 120, 52],
    [136, 44, 134, 49],
  ];

  const dots = [
    [129, 57], [49, 36], [76, 57], [106, 51], [150, 42],
    [18, 37], [69, 46], [17, 18], [36, 7], [38, 34],
    [93, 11], [133, 25], [2, 17], [146, 43], [108, 58],
    [78, 22], [83, 48], [133, 3], [140, 18], [63, 14],
    [27, 36], [142, 12], [12, 40], [109, 51], [92, 4],
  ];

  return (
    <svg
      className="captcha-image"
      viewBox="0 0 180 60"
      role="img"
      aria-label="Captcha image"
    >
      <rect width="180" height="60" rx="5" fill="#f1f5f9" />
      {lines.map(([x1, y1, x2, y2], index) => (
        <line
          key={`line-${index}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#94a3b8"
          strokeWidth="1"
          opacity=".6"
        />
      ))}
      {dots.map(([cx, cy], index) => (
        <circle
          key={`dot-${index}`}
          cx={cx}
          cy={cy}
          r="1"
          fill="#64748b"
          opacity=".7"
        />
      ))}
      {code.split("").map((character, index) => (
        <text
          key={`${character}-${index}`}
          x={17 + index * 27}
          y={41 + (index % 2) * 2}
          fontFamily="Roboto, sans-serif"
          fontSize="28"
          fontWeight="700"
          fill="#1e293b"
          transform={`rotate(${[-2, 3, -2, 5, -5, -3][index % 6]} ${17 + index * 27} 34)`}
        >
          {character}
        </text>
      ))}
    </svg>
  );
}

export default function CheckVisa({ records: initialRecords }) {
  const navigate = useNavigate();

  const [records, setRecords] = useState(initialRecords || []);
  const [reference, setReference] = useState("");
  const [dob, setDob] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [code, setCode] = useState(generateCaptchaCode);
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
      setError("Could not connect to the demo API. Please try again later.");
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
      const response = await fetch(`${API_BASE}/records.php`, {
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (
        !response.ok ||
        result.success !== true ||
        !Array.isArray(result.records)
      ) {
        throw new Error("Could not retrieve records. Please try again.");
      }

      const currentRecords = result.records;
      setRecords(currentRecords);

      // Keep compatibility with the existing API's reference field,
      // while also supporting records that store a passport number.
      const record = currentRecords.find(
        (item) =>
          String(item.passport || item.passport_number || item.reference || "")
            .trim()
            .toLowerCase() === reference.trim().toLowerCase() &&
          String(item.dob || "").slice(0, 10) === dob
      );

      if (!record) {
        setError("No matching sample record found.");
        return;
      }

      navigate(`/result/${record.id}`);
    } catch (err) {
      setError(err.message || "Unable to check status. Please try again.");
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
    setCode(generateCaptchaCode());
    setCaptcha("");
    setError("");
  }

  return (
    <>
      <Header />

      
      <section className="page-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Check Visa Status</span>
          </nav>

          <h1>Check Visa Status</h1>

          <p>
            Use this service to check the current status of your Republic of
            Cyprus visa application. You will need your passport number and date
            of birth as submitted in your application.
          </p>
        </div>
      </section>

      <section className="visa-content-section">
        <div className="container content-grid">
          <div className="visa-form-column">
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <h2>Application details</h2>
              <p className="muted form-description">
                All fields are required.
                {loading ? " Loading records..." : ""}
              </p>

              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="reference">Passport number</label>
                  <input
                    id="reference"
                    name="passport"
                    type="text"
                    value={reference}
                    onChange={(event) => setReference(event.target.value)}
                    placeholder="e.g. K12345678"
                    autoComplete="off"
                    inputMode="text"
                    maxLength={20}
                    required
                    disabled={checking}
                    aria-invalid={Boolean(error)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="dob">Date of birth</label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    required
                    disabled={checking}
                    aria-invalid={Boolean(error)}
                  />
                </div>

                <div className="form-field captcha-field">
                  <label htmlFor="captcha">Security check</label>
                  <p className="muted captcha-description">
                    Type the characters shown in the image below.
                  </p>

                  <div className="captcha-row">
                    <CaptchaImage code={code} />
                    <button
                      type="button"
                      className="btn btn-refresh"
                      onClick={refreshCaptcha}
                      disabled={checking}
                      aria-label="Refresh captcha"
                    >
                      <RefreshCw size={16} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <input
                    id="captcha"
                    name="captcha"
                    className="captcha-input"
                    type="text"
                    value={captcha}
                    onChange={(event) => setCaptcha(event.target.value)}
                    placeholder="Enter code"
                    autoComplete="off"
                    maxLength={10}
                    required
                    disabled={checking}
                    aria-invalid={Boolean(error)}
                  />
                </div>
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
                <ShieldCheck
                  className="notice-icon"
                  size={20}
                  aria-hidden="true"
                />
                <p>
                  Your data is processed by the Civil Registry and Migration
                  Department of the Republic of Cyprus in accordance with the
                  General Data Protection Regulation (GDPR).
                </p>
              </div>
            </form>
          </div>

          <aside className="sidebar">
            <div className="side-card side-card-info">
              <div className="side-card-heading">
                <Info size={20} className="side-card-icon" aria-hidden="true" />
                <h3>About the Republic of Cyprus</h3>
              </div>
              <p className="side-description">
                Cyprus is an island country in the Eastern Mediterranean and a
                member state of the European Union since 2004. Its capital is
                Nicosia and its official languages are Greek and Turkish.
              </p>
              <dl className="side-details">
                <div className="side-info">
                  <dt>Capital</dt>
                  <dd>Nicosia</dd>
                </div>
                <div className="side-info">
                  <dt>Currency</dt>
                  <dd>Euro (€)</dd>
                </div>
                <div className="side-info">
                  <dt>Time zone</dt>
                  <dd>EET (UTC+2)</dd>
                </div>
                <div className="side-info">
                  <dt>Calling code</dt>
                  <dd>+357</dd>
                </div>
              </dl>
            </div>

            <div className="side-card">
              <h3>Need help?</h3>
              <div className="side-links">
                <a href="#contact">Contact the Migration Department</a>
                <a href="#faq">Frequently asked questions</a>
                <a href="#guides">Visa application guides</a>
              </div>
            </div>

            <div className="side-card">
              <h3>Processing times</h3>
              <p className="side-description">
                Most short-stay visa applications are processed within 15
                calendar days. Long-stay and category-specific applications may
                take longer.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}
