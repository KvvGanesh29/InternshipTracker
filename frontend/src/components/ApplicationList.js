import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";
import SearchBar from "./SearchBar";
import "../styles/ApplicationList.css";

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("studentName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const statusColors = {
    Applied: "#3498db",
    Interview: "#f39c12",
    Selected: "#2ecc71",
    Rejected: "#e74c3c",
  };

  const fetchApplications = async (pageNum = 0, sortField = sortBy) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/applications?page=${pageNum}&size=5&sortBy=${sortField}`
      );
      setApplications(response.data.content);
      setTotalPages(response.data.totalPages);
      setSearchResults(null);
    } catch (error) {
      console.error("Error fetching applications:", error);
      showToast("Failed to fetch applications", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchApplications(0, sortBy);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/applications/search?keyword=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      showToast("Search failed", "error");
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const openDetails = (app) => {
    // Open details in modal
    setEditForm({ ...app });
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/applications/${editForm.id}`,
        editForm
      );
      showToast("Application updated successfully", "success");
      setModalOpen(false);
      fetchApplications(page, sortBy);
    } catch (error) {
      console.error("Error updating:", error);
      showToast("Failed to update application", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`http://localhost:8080/api/applications/${id}`);
        showToast("Application deleted successfully", "success");
        fetchApplications(page, sortBy);
      } catch (error) {
        console.error("Error deleting:", error);
        showToast("Failed to delete application", "error");
      }
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchApplications(0, sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder]);

  const displayedApplications = searchResults !== null ? searchResults : applications;
  const isEmpty = displayedApplications.length === 0;

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h2>📋 Applications</h2>
        <span className="app-count">{displayedApplications.length} total</span>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <LoadingSpinner />
      ) : isEmpty ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No applications yet</h3>
          <p>Create your first application to get started</p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="application-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")}>
                    ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("studentName")}>
                    Student {sortBy === "studentName" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("company")}>
                    Company {sortBy === "company" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("role")}>
                    Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedApplications.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td>{app.id}</td>
                    <td className="student-name">{app.studentName}</td>
                    <td>{app.company}</td>
                    <td>{app.role}</td>
                    <td>
                      <span
                        className="badge"
                        style={{ backgroundColor: statusColors[app.status] || "#95a5a6" }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-view"
                        onClick={() => openDetails(app)}
                      >
                        👁️ View
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(app.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {searchResults === null && (
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          )}
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit Application"
        onSave={handleSaveEdit}
      >
        {editForm && (
          <div className="edit-form">
            <input
              placeholder="Student Name"
              value={editForm.studentName}
              onChange={(e) => setEditForm({ ...editForm, studentName: e.target.value })}
            />
            <input
              placeholder="Company"
              value={editForm.company}
              onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
            />
            <input
              placeholder="Role"
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
            />
            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        )}
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default ApplicationList;