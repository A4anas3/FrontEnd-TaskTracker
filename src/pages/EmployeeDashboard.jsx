import React, { useState, useEffect } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import "./Dashboard.css";

const EmployeeDashboard = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchMyTasks();
    }
  }, [userId]);

  const fetchMyTasks = async () => {
    try {
      const response = await api.get("/TaskManagement/myTaskAssigned");
      setMyTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch assigned tasks", err);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/TaskManagement/UpdateStatus/${taskId}/${newStatus}`);
      fetchMyTasks(); // Refresh the list
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>
      <div className="content">
        <h3>My Assigned Tasks</h3>
        {myTasks.length === 0 ? (
          <p>No tasks assigned to you.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.status !== "COMPLETED" && (
                      <button
                        onClick={() => updateStatus(task.taskId, "COMPLETED")}
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
