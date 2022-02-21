import React from "react";
import Header from "./base-components/header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoanManager from "./loan-manager";
import Dashboard from "./dashboard";

const App: React.FC = () => {
  const centerLinks = [
    { text: "Dashboard", location: "dashboard" },
    { text: "Loan Manager", location: "loan-manager" },
  ];

  return (
    <BrowserRouter>
      <Header name="Loan Manager" centerLinks={centerLinks} rightLinks={[]} />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="loan-manager" element={<LoanManager />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
