import React, { useEffect, useState } from "react";
import {
  getExams,
  getHallsWithAllocations,
  getHallSeating,
  getStudentSeat,
  exportToExcel,
  exportToPDF,
} from "../services/api";
import { toast } from "react-toastify";

interface Exam {
  id: number;
  name: string;
  exam_date: string;
}

interface Hall {
  id: number;
  hall_number: string;
  seat_capacity: number;
  allocated_seats: number;
}

const Seating: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedHall, setSelectedHall] = useState<number | null>(null);
  const [hallSeating, setHallSeating] = useState<any>(null);
  const [searchRollNo, setSearchRollNo] = useState("");
  const [studentSeat, setStudentSeat] = useState<any>(null);

  useEffect(() => {
    loadExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      loadHalls();
    }
  }, [selectedExam]);

  useEffect(() => {
    if (selectedHall && selectedExam) {
      loadHallSeating();
    }
  }, [selectedHall, selectedExam]);

  const loadExams = async () => {
    try {
      const response = await getExams();
      setExams(response.data.exams);
    } catch (error) {
      toast.error("Error loading exams");
    }
  };

  const loadHalls = async () => {
    if (!selectedExam) return;
    try {
      const response = await getHallsWithAllocations(selectedExam);
      setHalls(response.data.halls);
    } catch (error) {
      toast.error("Error loading halls");
    }
  };

  const loadHallSeating = async () => {
    if (!selectedHall || !selectedExam) return;
    try {
      const response = await getHallSeating(selectedHall, selectedExam);
      setHallSeating(response.data);
    } catch (error) {
      toast.error("Error loading hall seating");
    }
  };

  const handleSearch = async () => {
    if (!searchRollNo || !selectedExam) {
      toast.error("Please enter roll number and select exam");
      return;
    }

    try {
      const response = await getStudentSeat(searchRollNo, selectedExam);
      setStudentSeat(response.data.allocation);
      toast.success("Student seat found");
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("Student seat not found");
      } else {
        toast.error("Error searching student");
      }
      setStudentSeat(null);
    }
  };

  const handleExport = (type: "excel" | "pdf") => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    const url =
      type === "excel"
        ? exportToExcel(selectedExam)
        : exportToPDF(selectedExam);
    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `seating-plan-${selectedExam}.${
          type === "excel" ? "xlsx" : "pdf"
        }`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success(`Exported to ${type.toUpperCase()}`);
      })
      .catch(() => toast.error("Export failed"));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Seating View</h2>

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

        {selectedExam && (
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button
              className="btn btn-success"
              onClick={() => handleExport("excel")}
            >
              Export to Excel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleExport("pdf")}
            >
              Export to PDF
            </button>
          </div>
        )}
      </div>

      {selectedExam && (
        <div className="card">
          <h2>Student Seat Lookup</h2>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Roll Number</label>
              <input
                type="text"
                value={searchRollNo}
                onChange={(e) => setSearchRollNo(e.target.value)}
                placeholder="Enter roll number"
              />
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {studentSeat && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#e8f5e9",
                borderRadius: "4px",
              }}
            >
              <h3>Student Details:</h3>
              <p>
                <strong>Roll Number:</strong> {studentSeat.roll_no}
              </p>
              <p>
                <strong>Name:</strong> {studentSeat.student_name}
              </p>
              <p>
                <strong>Hall Number:</strong> {studentSeat.hall_number}
              </p>
              <p>
                <strong>Seat Number:</strong> {studentSeat.seat_number}
              </p>
              <p>
                <strong>Subject:</strong>{" "}
                {studentSeat.subject_name || studentSeat.subject_code || "N/A"}
              </p>
            </div>
          )}
        </div>
      )}

      {selectedExam && halls.length > 0 && (
        <div className="card">
          <h2>Hall-wise Seating</h2>
          <div className="form-group">
            <label>Select Hall</label>
            <select
              value={selectedHall || ""}
              onChange={(e) => setSelectedHall(Number(e.target.value))}
            >
              <option value="">-- Select Hall --</option>
              {halls.map((hall) => (
                <option key={hall.id} value={hall.id}>
                  {hall.hall_number} - {hall.allocated_seats}/
                  {hall.seat_capacity} seats
                </option>
              ))}
            </select>
          </div>

          {hallSeating && (
            <div style={{ marginTop: "1rem" }}>
              <h3>Hall: {hallSeating.hall.hall_number}</h3>
              <p>
                Capacity: {hallSeating.hall.seat_capacity} | Allocated:{" "}
                {hallSeating.total_allocated}
              </p>

              <table style={{ marginTop: "1rem" }}>
                <thead>
                  <tr>
                    <th>Seat</th>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {hallSeating.seats.map((seat: any) => (
                    <tr key={seat.seat_number}>
                      <td>{seat.seat_number}</td>
                      <td>{seat.roll_no}</td>
                      <td>{seat.student_name}</td>
                      <td>{seat.department_name || "N/A"}</td>
                      <td>{seat.subject_name || seat.subject_code || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Seating;
