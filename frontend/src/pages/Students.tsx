import React, { useEffect, useState } from "react";
import { uploadStudents, getStudents, deleteStudent } from "../services/api";
import { toast } from "react-toastify";

interface Student {
  id: number;
  roll_no: string;
  student_name: string;
  department_name: string;
  subject_code: string;
  subject_name: string;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data.students);
    } catch (error) {
      toast.error("Error loading students");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setUploading(true);
    try {
      const response = await uploadStudents(file);
      toast.success(
        `Upload completed: ${response.data.successCount} students uploaded`
      );
      if (response.data.errorCount > 0) {
        toast.warning(`${response.data.errorCount} errors occurred`);
      }
      setFile(null);
      loadStudents();
    } catch (error) {
      toast.error("Error uploading students");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        toast.success("Student deleted successfully");
        loadStudents();
      } catch (error) {
        toast.error("Error deleting student");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Student Management</h2>

        <div style={{ marginBottom: "2rem" }}>
          <h3>Upload Students (CSV/Excel)</h3>
          <p style={{ color: "#7f8c8d", marginBottom: "1rem" }}>
            Required columns: roll_no, student_name, department, subject_code
          </p>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Students"}
            </button>
          </form>
        </div>

        <h3>Students List ({students.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.roll_no}</td>
                <td>{student.student_name}</td>
                <td>{student.department_name || "N/A"}</td>
                <td>{student.subject_name || student.subject_code || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
