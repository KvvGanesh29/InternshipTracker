import React, { useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import "../styles/ApplicationForm.css";

function ApplicationForm({ refresh }) {
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.studentName || !form.company || !form.role || !form.status) {
      setToast({ message: "Please fill all fields", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/applications", form);
      setForm({ studentName: "", company: "", role: "", status: "" });
      setToast({ message: "Application added successfully!", type: "success" });
      refresh();
    } catch (error) {
      console.error("Error adding application:", error);
      setToast({ message: "Failed to add application", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <input
            placeholder="Student Name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
            className="form-select"
          >
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          className="submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "✓ Add Application"}
        </button>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default ApplicationForm;