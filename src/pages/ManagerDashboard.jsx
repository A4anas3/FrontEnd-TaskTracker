import React, { useState, useEffect } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import "./Dashboard.css";

const ManagerDashboard = () => {
  const [tasksAssignedByMe, setTasksAssignedByMe] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("assignedByMe");
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
      fetchTasksAssignedByMe();
      fetchAllTasks();
    }
  }, [userId]);

  const fetchTasksAssignedByMe = async () => {
    try {
      const response = await api.get("/TaskManagement/AssignedTaskByMe");
      setTasksAssignedByMe(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks assigned by me", err);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await api.get("/TaskManagement/GetAllTask");
      setAllTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch all tasks", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Manager Dashboard</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab("assignedByMe")}>
          Tasks I Assigned
        </button>
        <button onClick={() => setActiveTab("allTasks")}>All Tasks</button>
        {/* Add more buttons for create/update tasks */}
      </div>

      {activeTab === "assignedByMe" && (
        <div className="content">
          <h3>Tasks Assigned by Me</h3>
          {/* Display tasks assigned by the current manager */}
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasksAssignedByMe.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "allTasks" && (
        <div className="content">
          <h3>All Tasks</h3>
          {/* Display all tasks */}
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedToId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
