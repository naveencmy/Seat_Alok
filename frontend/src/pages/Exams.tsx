import React, { useEffect, useState } from "react";
import { getExams, createExam, updateExam, deleteExam } from "../services/api";
import { toast } from "react-toastify";

interface Exam {
  id: number;
  name: string;
  exam_date: string;
}

const Exams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", exam_date: "" });

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const response = await getExams();
      setExams(response.data.exams);
    } catch (error) {
      toast.error("Error loading exams");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExam(editingId, formData);
        toast.success("Exam updated successfully");
      } else {
        await createExam(formData);
        toast.success("Exam created successfully");
      }
      setFormData({ name: "", exam_date: "" });
      setShowForm(false);
      setEditingId(null);
      loadExams();
    } catch (error) {
      toast.error("Error saving exam");
    }
  };

  const handleEdit = (exam: Exam) => {
    setFormData({ name: exam.name, exam_date: exam.exam_date.split("T")[0] });
    setEditingId(exam.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await deleteExam(id);
        toast.success("Exam deleted successfully");
        loadExams();
      } catch (error) {
        toast.error("Error deleting exam");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Exam Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: "", exam_date: "" });
          }}
        >
          {showForm ? "Cancel" : "Add New Exam"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <div className="form-group">
              <label>Exam Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Exam Date</label>
              <input
                type="date"
                value={formData.exam_date}
                onChange={(e) =>
                  setFormData({ ...formData, exam_date: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.name}</td>
                <td>{new Date(exam.exam_date).toLocaleDateString()}</td>
                <td className="action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(exam)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(exam.id)}
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

export default Exams;
