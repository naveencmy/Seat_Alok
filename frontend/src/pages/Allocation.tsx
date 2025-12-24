import React, { useEffect, useState } from "react";
import {
  getExams,
  generateAllocation,
  getAllocationStatus,
  clearAllocations,
} from "../services/api";
import { toast } from "react-toastify";

interface Exam {
  id: number;
  name: string;
  exam_date: string;
}

const Allocation: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [allocating, setAllocating] = useState(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    loadExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      loadStatus();
    }
  }, [selectedExam]);

  const loadExams = async () => {
    try {
      const response = await getExams();
      setExams(response.data.exams);
    } catch (error) {
      toast.error("Error loading exams");
    }
  };

  const loadStatus = async () => {
    if (!selectedExam) return;
    try {
      const response = await getAllocationStatus(selectedExam);
      setStatus(response.data);
    } catch (error) {
      console.error("Error loading status");
    }
  };

  const handleGenerate = async () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    setAllocating(true);
    try {
      const response = await generateAllocation(selectedExam);
      toast.success(
        `Allocation completed: ${response.data.allocatedCount} students allocated`
      );
      if (response.data.unallocatedCount > 0) {
        toast.warning(
          `${response.data.unallocatedCount} students could not be allocated`
        );
      }
      loadStatus();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error generating allocation"
      );
    } finally {
      setAllocating(false);
    }
  };

  const handleClear = async () => {
    if (!selectedExam) return;

    if (
      window.confirm(
        "Are you sure you want to clear all allocations for this exam?"
      )
    ) {
      try {
        await clearAllocations(selectedExam);
        toast.success("Allocations cleared successfully");
        loadStatus();
      } catch (error) {
        toast.error("Error clearing allocations");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Automatic Seat Allocation</h2>

        <div className="form-group">
          <label>Select Exam</label>
          <select
            value={selectedExam || ""}
            onChange={(e) => setSelectedExam(Number(e.target.value))}
          >
            <option value="">-- Select Exam --</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name} - {new Date(exam.exam_date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {status && (
          <div className="dashboard-grid" style={{ marginTop: "1rem" }}>
            <div className="dashboard-card">
              <h3>Total Students</h3>
              <p>{status.total_students}</p>
            </div>
            <div className="dashboard-card">
              <h3>Allocated Students</h3>
              <p>{status.allocated}</p>
            </div>
            <div className="dashboard-card">
              <h3>Unallocated Students</h3>
              <p>{status.total_students - status.allocated}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <button
            className="btn btn-success"
            onClick={handleGenerate}
            disabled={!selectedExam || allocating}
          >
            {allocating ? "Generating..." : "Generate Allocation"}
          </button>
          <button
            className="btn btn-danger"
            onClick={handleClear}
            disabled={!selectedExam || !status?.allocated}
          >
            Clear Allocations
          </button>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
          }}
        >
          <h3>Allocation Rules:</h3>
          <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>Fill halls hall-by-hall, seat-by-seat</li>
            <li>Seat numbering starts from 1 to capacity</li>
            <li>Enforce unique seat assignment per student</li>
            <li>Enforce sequential hall allocation based on hall order</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Allocation;
