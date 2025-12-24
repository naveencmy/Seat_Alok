import React, { useEffect, useState } from "react";
import { getExams, getStudents, getHalls } from "../services/api";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalExams: 0,
    totalStudents: 0,
    totalHalls: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [examsRes, studentsRes, hallsRes] = await Promise.all([
        getExams(),
        getStudents(),
        getHalls(),
      ]);

      setStats({
        totalExams: examsRes.data.exams.length,
        totalStudents: studentsRes.data.students.length,
        totalHalls: hallsRes.data.halls.length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1.5rem" }}>Admin Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Exams</h3>
          <p>{stats.totalExams}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Halls</h3>
          <p>{stats.totalHalls}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: "2rem" }}>
        <h2>Quick Actions</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a href="/exams">
            <button className="btn btn-primary">Manage Exams</button>
          </a>
          <a href="/subjects">
            <button className="btn btn-primary">Manage Subjects</button>
          </a>
          <a href="/halls">
            <button className="btn btn-primary">Manage Halls</button>
          </a>
          <a href="/departments">
            <button className="btn btn-primary">Manage Departments</button>
          </a>
          <a href="/students">
            <button className="btn btn-primary">Manage Students</button>
          </a>
          <a href="/allocation">
            <button className="btn btn-success">Generate Allocation</button>
          </a>
          <a href="/seating">
            <button className="btn btn-secondary">View Seating</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
