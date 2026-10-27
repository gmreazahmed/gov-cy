
import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import CheckVisa from "./pages/CheckVisa";
import VisaResult from "./pages/VisaResult";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";

const initialRecords = [
  {
    id: 1,
    fullName: "DEMO APPLICANT",
    passport: "DEMO12345",
    dob: "2002-04-12",
    nationality: "SAMPLE COUNTRY",
    reference: "DEMO-7209991",
    visaNumber: "DEMO-00001",
    status: "Approved",
    visaType: "Practice Permit",
    entries: "Multiple",
    duration: "365 days",
    port: "Sample Entry Point",
    submitted: "2026-08-12",
    decision: "2026-08-14",
    issue: "2026-08-14",
    expiry: "2027-08-13",
    pdfName: "",
    pdfUrl: "",
  },
];

function ProtectedAdmin({ records, setRecords }) {
  const location = useLocation();

  const isLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/admin-login"
        replace
        state={{ from: location }}
      />
    );
  }

  return (
    <AdminPanel
      records={records}
      setRecords={setRecords}
    />
  );
}

export default function App() {
  const [records, setRecords] = useState(initialRecords);

  return (
    <Routes>
      {/* Home page প্রথমে দেখাবে */}
      <Route path="/" element={<Home />} />

      {/* Visa check page */}
      <Route
        path="/check-visa"
        element={<CheckVisa records={records} />}
      />

      {/* Visa result */}
      <Route
        path="/result/:id"
        element={<VisaResult records={records} />}
      />

      {/* Admin login */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      {/* Protected admin */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin
            records={records}
            setRecords={setRecords}
          />
        }
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}