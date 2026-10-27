import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Upload,
  X,
  FileText,
  ExternalLink,
  RefreshCw,
  Database,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  LoaderCircle,
  Save,
  LogOut,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AdminPanel.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const MAX_PDF_SIZE = 10 * 1024 * 1024;

const emptyRecord = {
  fullName: "",
  passport: "",
  dob: "",
  nationality: "",
  reference: "",
  visaNumber: "",
  status: "Pending",
  visaType: "",
  entries: "",
  duration: "",
  port: "",
  submitted: "",
  decision: "",
  issue: "",
  expiry: "",
};

const fields = [
  ["fullName", "Full name", "text"],
  ["reference", "Reference", "text"],
  ["passport", "Passport ID", "text"],
  ["visaNumber", "Document number", "text"],
  ["nationality", "Nationality", "text"],
  ["dob", "Date of birth", "date"],
  ["visaType", "Visa type", "text"],
  ["entries", "Entries", "text"],
  ["duration", "Duration", "text"],
  ["port", "Entry port", "text"],
  ["submitted", "Submitted date", "date"],
  ["decision", "Decision date", "date"],
  ["issue", "Issue date", "date"],
  ["expiry", "Expiry date", "date"],
];

const requiredFields = ["fullName", "reference"];

async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE}/${path}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : options.body
            ? { "Content-Type": "application/json" }
            : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "API connection failed. Check server, HTTPS and CORS settings.",
    );
  }

  const raw = await response.text();
  let result;

  try {
    result = JSON.parse(raw);
  } catch {
    throw new Error(
      `Invalid API response (HTTP ${response.status}): ${
        raw.slice(0, 120) || "Empty response"
      }`,
    );
  }

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message || `Request failed (HTTP ${response.status}).`,
    );
  }

  return result;
}

function pdfUrl(record) {
  if (!record?.pdfPath) return "";

  if (/^https?:\/\//i.test(record.pdfPath)) {
    return record.pdfPath;
  }

  return `${API_BASE}/${String(record.pdfPath).replace(/^\/+/, "")}`;
}

function normalizeRecord(record) {
  return {
    ...emptyRecord,
    ...record,
    id: String(record.id ?? ""),
    pdfName: record.pdfName || "",
    pdfPath: record.pdfPath || "",
    pdfUrl: pdfUrl(record),
  };
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const icons = {
    Approved: <CheckCircle2 size={15} />,
    Pending: <Clock3 size={15} />,
    Rejected: <XCircle size={15} />,
  };

  const value = status || "Pending";

  return (
    <span className={`admin-status status-${value.toLowerCase()}`}>
      {icons[value] || <Clock3 size={15} />}
      {value}
    </span>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin-login", { replace: true });
  }

  const showMessage = useCallback((text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  }, []);

  const loadRecords = useCallback(
    async (showSuccess = false) => {
      setLoading(true);

      try {
        const result = await apiRequest("records.php");

        if (!Array.isArray(result.records)) {
          throw new Error("API response does not contain a records array.");
        }

        setRecords(result.records.map(normalizeRecord));
        setMessage("");

        if (showSuccess) {
          showMessage("Records refreshed successfully.");
        }
      } catch (error) {
        showMessage(error.message || "Could not load records.", "error");
      } finally {
        setLoading(false);
      }
    },
    [showMessage],
  );

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const filteredRecords = useMemo(() => {
    const search = query.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch = [
        record.id,
        record.fullName,
        record.reference,
        record.passport,
        record.visaNumber,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(search),
      );

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, query, statusFilter]);

  const stats = useMemo(
    () => [
      {
        label: "Total records",
        value: records.length,
        icon: <Database size={21} />,
        color: "blue",
      },
      {
        label: "Approved",
        value: records.filter((r) => r.status === "Approved").length,
        icon: <CheckCircle2 size={21} />,
        color: "green",
      },
      {
        label: "Pending",
        value: records.filter((r) => r.status === "Pending").length,
        icon: <Clock3 size={21} />,
        color: "orange",
      },
      {
        label: "Rejected",
        value: records.filter((r) => r.status === "Rejected").length,
        icon: <XCircle size={21} />,
        color: "red",
      },
    ],
    [records],
  );

  function addRecord() {
    setEditing({ ...emptyRecord, id: "" });
    setPdfFile(null);
    setMessage("");
  }

  function editRecord(record) {
    setEditing({ ...record });
    setPdfFile(null);
    setMessage("");
  }

  function closeEditor() {
    if (saving) return;
    setEditing(null);
    setPdfFile(null);
    setMessage("");
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!editing || saving) return;

    if (!editing.fullName.trim() || !editing.reference.trim()) {
      showMessage("Full name and reference are required.", "error");
      return;
    }

    if (pdfFile) {
      if (
        pdfFile.type !== "application/pdf" &&
        !pdfFile.name.toLowerCase().endsWith(".pdf")
      ) {
        showMessage("Please select a PDF file.", "error");
        return;
      }

      if (pdfFile.size > MAX_PDF_SIZE) {
        showMessage("PDF must be 10 MB or smaller.", "error");
        return;
      }
    }

    setSaving(true);
    setMessage("");

    let saved = false;

    try {
      const payload = { ...emptyRecord };

      for (const [key] of fields) {
        payload[key] = editing[key] || "";
      }

      payload.status = editing.status || "Pending";

      const isExisting = Boolean(editing.id);

      if (isExisting) {
        payload.id = Number(editing.id);
      }

      const result = await apiRequest("records.php", {
        method: isExisting ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      const id = String(result.id || editing.id || "");

      if (!id) {
        throw new Error("Record saved, but API did not return its ID.");
      }

      saved = true;

      if (pdfFile) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("pdfFile", pdfFile);

        await apiRequest("upload.php", {
          method: "POST",
          body: formData,
        });
      }

      setEditing(null);
      setPdfFile(null);
      showMessage(
        pdfFile
          ? "Record saved and PDF uploaded."
          : isExisting
            ? "Record updated successfully."
            : "Record added successfully.",
      );
    } catch (error) {
      showMessage(
        saved
          ? `Record saved, but PDF upload or another step failed: ${error.message}`
          : error.message || "Could not save record.",
        "error",
      );
    } finally {
      await loadRecords();
      setSaving(false);
    }
  }

  async function deleteRecord(record) {
    if (saving) return;

    const confirmed = window.confirm(
      `Delete record "${record.fullName}" (ID ${record.id}) and its attached PDF?`,
    );

    if (!confirmed) return;

    setSaving(true);
    setMessage("");

    try {
      await apiRequest("delete.php", {
        method: "POST",
        body: JSON.stringify({ id: Number(record.id) }),
      });

      if (editing?.id === record.id) {
        setEditing(null);
        setPdfFile(null);
      }

      showMessage("Record deleted successfully.");
    } catch (error) {
      showMessage(error.message || "Could not delete record.", "error");
    } finally {
      await loadRecords();
      setSaving(false);
    }
  }

  return (
    <>
      <Header />

      <main className="admin-page">
        <div className="admin-shell">
          <nav className="admin-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Admin dashboard</span>
          </nav>

          <section className="admin-hero">
            <div>
              <span className="admin-eyebrow">
                <Database size={15} /> API CONNECTED WORKSPACE
              </span>

              <h1>Admin Dashboard</h1>

              <p>Manage records, edit information and upload PDF files.</p>

            
            </div>

            <div className="admin-hero-actions">
              <div className="admin-hero-icon">
                <Database size={40} />
              </div>
              <button
                type="button"
                className="admin-button admin-logout-button"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </section>

          {message && (
            <div
              className={`admin-alert alert-${messageType}`}
              role="status"
              aria-live="polite"
            >
              {messageType === "error" ? (
                <AlertCircle size={19} />
              ) : (
                <CheckCircle2 size={19} />
              )}

              <span>{message}</span>

              <button
                type="button"
                onClick={() => setMessage("")}
                aria-label="Close message"
              >
                <X size={17} />
              </button>
            </div>
          )}

          <section className="admin-stats">
            {stats.map((stat) => (
              <article className="admin-stat-card" key={stat.label}>
                <div className={`admin-stat-icon stat-${stat.color}`}>
                  {stat.icon}
                </div>

                <div>
                  <span>{stat.label}</span>
                  <strong>{loading ? "—" : stat.value}</strong>
                </div>
              </article>
            ))}
          </section>

          {editing && (
            <section className="admin-editor" id="record-editor">
              <div className="admin-section-heading">
                <div>
                  <span className="admin-section-kicker">
                    RECORD MANAGEMENT
                  </span>
                  <h2>{editing.id ? "Edit record" : "Create a record"}</h2>
                  <p>Fields marked with * are required.</p>
                </div>

                <button
                  type="button"
                  className="admin-icon-button"
                  onClick={closeEditor}
                  disabled={saving}
                  aria-label="Close editor"
                >
                  <X size={19} />
                </button>
              </div>

              <form className="admin-record-form" onSubmit={handleSave}>
                <div className="admin-form-grid">
                  {fields.map(([name, label, type]) => (
                    <div className="admin-field" key={name}>
                      <label htmlFor={`admin-${name}`}>
                        {label}
                        {requiredFields.includes(name) && (
                          <span className="admin-required"> *</span>
                        )}
                      </label>

                      <input
                        id={`admin-${name}`}
                        name={name}
                        type={type}
                        value={editing[name] || ""}
                        onChange={(event) =>
                          setEditing((current) => ({
                            ...current,
                            [name]: event.target.value,
                          }))
                        }
                        required={requiredFields.includes(name)}
                        disabled={saving}
                        maxLength={type === "text" ? 150 : undefined}
                      />
                    </div>
                  ))}

                  <div className="admin-field">
                    <label htmlFor="admin-status">Status</label>

                    <select
                      id="admin-status"
                      value={editing.status || "Pending"}
                      onChange={(event) =>
                        setEditing((current) => ({
                          ...current,
                          status: event.target.value,
                        }))
                      }
                      disabled={saving}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="admin-field admin-upload-field">
                    <label htmlFor="admin-pdf">
                      <Upload size={16} /> Upload PDF
                    </label>

                    <input
                      id="admin-pdf"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(event) =>
                        setPdfFile(event.target.files?.[0] || null)
                      }
                      disabled={saving}
                    />

                    <small>
                      {pdfFile
                        ? pdfFile.name
                        : editing.pdfName
                          ? `Current file: ${editing.pdfName}`
                          : "PDF only · Maximum 10 MB"}
                    </small>

                    {editing.pdfUrl && (
                      <a
                        className="admin-file-link"
                        href={editing.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileText size={15} />
                        View current PDF
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="admin-form-note">
                  <FileText size={18} />
                  <p>
                    Use fictional sample information and documents while testing
                    this demo panel.
                  </p>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="submit"
                    className="admin-button admin-button-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <LoaderCircle className="admin-spin" size={17} />
                    ) : (
                      <Save size={17} />
                    )}
                    {saving ? "Saving..." : "Save record"}
                  </button>

                  <button
                    type="button"
                    className="admin-button admin-button-secondary"
                    onClick={closeEditor}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          <section className="admin-records-section">
            <div className="admin-records-heading">
              <div>
                <span className="admin-section-kicker">YOUR DATABASE</span>
                <h2>Records</h2>
                <p>
                  {loading
                    ? "Loading records from API..."
                    : `${records.length} records loaded from database`}
                </p>
              </div>

              <div className="admin-toolbar-actions">
                <button
                  type="button"
                  className="admin-button admin-button-secondary"
                  onClick={() => loadRecords(true)}
                  disabled={loading || saving}
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "admin-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  type="button"
                  className="admin-button admin-button-primary"
                  onClick={addRecord}
                  disabled={saving}
                >
                  <Plus size={18} /> Add record
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <div className="admin-table-toolbar">
                <div className="admin-search-box">
                  <Search size={18} />

                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, reference, passport or ID..."
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <select
                  className="admin-filter-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="admin-table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Record</th>
                      <th>Reference</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>PDF document</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6}>
                          <div className="admin-table-state">
                            <LoaderCircle className="admin-spin" size={26} />
                            <strong>Loading records...</strong>
                          </div>
                        </td>
                      </tr>
                    ) : filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <div className="admin-table-state">
                            <div className="admin-empty-icon">
                              <Users size={25} />
                            </div>
                            <strong>
                              {records.length
                                ? "No matching records"
                                : "No records yet"}
                            </strong>
                            <span>
                              {records.length
                                ? "Change your search or status filter."
                                : "Add your first demo record to get started."}
                            </span>

                            {!records.length && (
                              <button
                                type="button"
                                className="admin-button admin-button-primary"
                                onClick={addRecord}
                              >
                                <Plus size={16} /> Create first record
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record) => (
                        <tr key={record.id}>
                          <td>
                            <div className="admin-person-cell">
                              <div className="admin-avatar">
                                {(record.fullName || "R")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="admin-person-info">
                                <strong>{record.fullName}</strong>
                                <span>ID: {record.id}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="admin-reference">
                              {record.reference || "—"}
                            </span>
                          </td>

                          <td>
                            <StatusBadge status={record.status} />
                          </td>

                          <td className="admin-date-cell">
                            {formatDate(record.submitted)}
                          </td>

                          <td>
                            {record.pdfUrl ? (
                              <a
                                className="admin-file-link"
                                href={record.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FileText size={15} />
                                <span>{record.pdfName || "View PDF"}</span>
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span className="admin-muted">No attachment</span>
                            )}
                          </td>

                          <td>
                            <div className="admin-row-actions">
                              <button
                                type="button"
                                className="admin-icon-button"
                                title="Edit record"
                                onClick={() => editRecord(record)}
                                disabled={saving}
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                className="admin-icon-button admin-delete-button"
                                title="Delete record"
                                onClick={() => deleteRecord(record)}
                                disabled={saving}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="admin-table-footer">
                <span>
                  Showing {loading ? 0 : filteredRecords.length} of{" "}
                  {loading ? 0 : records.length} records
                </span>
                <span className="admin-api-footer">
                  <span className="admin-live-dot" />
                  API-managed data
                </span>
              </div>
            </div>
          </section>

          <footer className="admin-security-note">
            <AlertCircle size={17} />
            <p>
              Protect this admin panel with server-side authentication before
              storing real personal information.
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </>
  );
}
