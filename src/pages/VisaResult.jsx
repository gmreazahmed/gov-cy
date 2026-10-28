import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Download,
  Printer,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import "./VisaResult.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://gcy.fragavenuebd.com";

function formatDate(value) {
  if (!value) return "—";

  const datePart = String(value).slice(0, 10);
  const date = new Date(`${datePart}T12:00:00`);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Detail({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value || "—"}</strong>
    </div>
  );
}

export default function VisaResult({ records: initialRecords }) {
  const { id } = useParams();

  const [records, setRecords] = useState(initialRecords || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecord = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/records.php`, {
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error("Could not load the application record.");
      }

      if (!Array.isArray(result.records)) {
        throw new Error("Invalid API response.");
      }

      setRecords(result.records);
    } catch {
      setError(
        "Unable to connect to the demo API. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecord();
  }, [loadRecord]);

  const record = records.find(
    (item) => String(item.id) === String(id)
  );

  function downloadDocument() {
    if (!record) return;

    // Use the PDF path returned by the PHP API.
    if (record.pdfPath) {
      const pdfUrl = new URL(
        String(record.pdfPath).replace(/^\/+/, ""),
        `${API_BASE.replace(/\/+$/, "")}/`
      );

      if (pdfUrl.origin !== new URL(API_BASE).origin) {
        setError("The document URL is not valid.");
        return;
      }

      const link = document.createElement("a");
      link.href = pdfUrl.href;
      link.download = record.pdfName || "practice-document.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    // Generate a clearly labelled text demo file when no PDF exists.
    const content = [
      "INDEPENDENT PRACTICE DEMO",
      "NOT AN OFFICIAL DOCUMENT",
      "",
      `Applicant: ${record.fullName || ""}`,
      `Reference: ${record.reference || ""}`,
      `Status: ${record.status || ""}`,
      "",
      "This sample file is for interface testing only.",
    ].join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${record.reference || "sample"}-demo.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="result-container">
          <section className="result-card">
            <p>Loading sample result...</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !record) {
    return (
      <>
        <Header />

        <main className="result-container">
          <section className="result-card">
            <h2>
              {error ? "Unable to load result" : "Sample result not found"}
            </h2>

            <p>
              {error ||
                "No matching record was found. Check the application again."}
            </p>

            <div className="form-actions">
              <button className="btn" type="button" onClick={loadRecord}>
                <RefreshCw size={15} />
                Retry
              </button>

              <Link to="/" className="btn">
                <ArrowLeft size={15} />
                Check another application
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  const status = String(record.status || "pending").toLowerCase();

  return (
    <>
      <Header />

      <section className="page-heading">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/">Check Status</Link>
            <span>/</span>
            <span>Result</span>
          </div>

          <h1>Application Result</h1>

          <p>
            This is a sample application result for interface testing only. It
            is not an official visa decision.
          </p>
        </div>
      </section>

      <main className="result-container">
        <section className="result-card">
          <div className="result-card-header">
            <div className="result-heading">
              <h2>Applicant details</h2>

              <span className={`status-badge ${status}`}>
                <CheckCircle2 size={13} />
                {record.status || "Pending"}
              </span>
            </div>

            <div className="result-buttons">
              <button
                className="btn btn-small"
                type="button"
                onClick={downloadDocument}
              >
                <Download size={14} />
                {record.pdfPath ? "Download document" : "Download demo file"}
              </button>

              <button
                className="btn btn-small"
                type="button"
                onClick={downloadDocument}
              >
                <Printer size={14} />
                Print
              </button>
            </div>
          </div>

          <div className="detail-list watermark">
            <Detail label="Full name" value={record.fullName} />
            <Detail label="Passport number" value={record.passport} />
            <Detail label="Date of birth" value={formatDate(record.dob)} />
            <Detail label="Nationality" value={record.nationality} />
            <Detail label="Application reference" value={record.reference} />
            <Detail label="Demo document number" value={record.visaNumber} />
          </div>
        </section>

        <section className="result-card">
          <h2>Visa details</h2>

          <div className="detail-list watermark">
            <Detail label="Visa type" value={record.visaType} />
            <Detail label="Number of entries" value={record.entries} />
            <Detail label="Duration of stay" value={record.duration} />
            <Detail label="Port of entry" value={record.port} />
            <Detail
              label="Application submitted"
              value={formatDate(record.submitted)}
            />
            <Detail label="Decision date" value={formatDate(record.decision)} />
            <Detail label="Visa issue date" value={formatDate(record.issue)} />
            <Detail
              label="Visa expiry date"
              value={formatDate(record.expiry)}
            />
          </div>
        </section>

        {record.pdfPath && (
          <section className="result-card">
            <h2>Attached sample document</h2>
            <p>{record.pdfName || "PDF document"}</p>

            <button
              className="btn btn-small"
              type="button"
              onClick={downloadDocument}
            >
              <Download size={14} />
              Download document
            </button>
          </section>
        )}

        <div className="result-actions">
          <Link to="/" className="btn">
            <ArrowLeft size={15} />
            Check another application
          </Link>

          <Link to="/" className="text-link">
            Back to demo home
          </Link>
        </div>

        <div className="notice">
          <ShieldCheck size={20} />

          <div>
            <strong>Important demo notice</strong>

            <p>
              This page displays fictional practice data. It is not an official
              document and cannot be used for travel or identity verification.
            </p>
          </div>
        </div>

        <section className="contact-card">
          <h3>Demo support</h3>
          <p>Independent frontend practice project</p>
          <p>Sample data only</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
