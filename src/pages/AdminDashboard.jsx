import React, { useState, useEffect } from "react";
import api from "../api/api";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/admin/getAllEmployee");
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get("/TaskManagement/GetAllTask");
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.post(`/api/admin/deleteUser/${id}`);
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab("users")}>User Management</button>
        <button onClick={() => setActiveTab("tasks")}>Task Management</button>
      </div>

      {activeTab === "users" && (
        <div className="content">
          <h3>User Management</h3>
          {/* Implement Add/Update user forms here */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => {
                        /* navigate to update page */
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="content">
          <h3>Task Management</h3>
          {/* Implement Create/Update task forms here */}
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedToId}</td>
                  <td>
                    <button>Update Status</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
