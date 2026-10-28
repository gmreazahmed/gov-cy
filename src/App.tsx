
import { useEffect, useState } from "react";
import type {
  Dispatch,
  SetStateAction,
  ComponentType,
} from "react";

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

type VisaRecord = {
  id: number;
  fullName: string;
  passport: string;
  dob: string;
  nationality: string;
  reference: string;
  visaNumber: string;
  status: string;
  visaType: string;
  entries: string;
  duration: string;
  port: string;
  submitted: string;
  decision: string;
  issue: string;
  expiry: string;
  pdfName: string;
  pdfUrl: string;
};

type ProtectedAdminProps = {
  records: VisaRecord[];
  setRecords: Dispatch<SetStateAction<VisaRecord[]>>;
};

const initialRecords: VisaRecord[] = [
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

function ProtectedAdmin({
  records,
  setRecords,
}: ProtectedAdminProps) {
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

  const TypedAdminPanel =
    AdminPanel as ComponentType<ProtectedAdminProps>;

  return (
    <TypedAdminPanel
      records={records}
      setRecords={setRecords}
    />
  );
}

export default function App() {
  const [records, setRecords] =
    useState<VisaRecord[]>(initialRecords);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      document.title = "Home";
    } else if (path === "/check-visa-status") {
      document.title = "Check Visa Status — gov.cy";
    } else if (path === "/admin-login") {
      document.title = "Admin Login";
    } else if (path === "/admin") {
      document.title = "Admin Panel";
    } else if (/^\/result\/\d+$/.test(path)) {
      document.title = "Visa Result";
    } else {
      document.title = "Visa Status";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/check-visa-status"
        element={<CheckVisa records={records} />}
      />

      <Route
        path="/result/:id"
        element={<VisaResult records={records} />}
      />

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedAdmin
            records={records}
            setRecords={setRecords}
          />
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
