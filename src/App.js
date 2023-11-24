import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import DoctorList from "./DoctorList";
import PateintList from "./PateintList";
import PatientDetail from "./PatientDetail";
// ... import other components

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        flexGrow: 1, padding: '20px', marginTop: "60px", background: "#e5edf5", height: "100vh",
        // boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset"
      }}>
        <Routes>
          <Route path="/doctor" element={<DoctorList />} />
          <Route path="/pateint" element={<PateintList />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
          {/* Add more Route components here for other paths */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
