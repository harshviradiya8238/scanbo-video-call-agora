import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DoctorList from "./DoctorList";
import PateintList from "./PateintList";
import PatientDetail from "./PatientDetail";
import Redirector from "./components/Redirector";

const App = () => {

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        flexGrow: 1, padding: '20px', marginTop: "60px", background: "#e5edf5", height: "100vh",
      }}>
        <Routes>
          <Route path="/:id" element={<Redirector />} /> {/* Use Redirector here */}
          <Route path="/doctor/:id" element={<DoctorList />} />
          <Route path="/patient/:id" element={<PateintList />} />
          <Route path="/patientDetail/:id" element={<PatientDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
