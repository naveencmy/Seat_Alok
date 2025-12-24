import React, { useEffect, useState } from "react";
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getExams,
} from "../services/api";
import { toast } from "react-toastify";

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    subject_code: "",
    subject_name: "",
    credits: "",
    exam_id: "",
  });

  useEffect(() => {
    loadSubjects();
    loadExams();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data.subjects);
    } catch (error) {
      toast.error("Error loading subjects");
    }
  };

  const loadExams = async () => {
    try {
      const response = await getExams();
      setExams(response.data.exams);
    } catch (error) {
      console.error("Error loading exams");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        credits: formData.credits ? parseInt(formData.credits) : null,
        exam_id: formData.exam_id ? parseInt(formData.exam_id) : null,
      };

      if (editingId) {
        await updateSubject(editingId, data);
        toast.success("Subject updated successfully");
      } else {
        await createSubject(data);
        toast.success("Subject created successfully");
      }
      setFormData({
        subject_code: "",
        subject_name: "",
        credits: "",
        exam_id: "",
      });
      setShowForm(false);
      setEditingId(null);
      loadSubjects();
    } catch (error) {
      toast.error("Error saving subject");
    }
  };

  const handleEdit = (subject: any) => {
    setFormData({
      subject_code: subject.subject_code,
      subject_name: subject.subject_name,
      credits: subject.credits || "",
      exam_id: subject.exam_id || "",
    });
    setEditingId(subject.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteSubject(id);
        toast.success("Subject deleted successfully");
        loadSubjects();
      } catch (error) {
        toast.error("Error deleting subject");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Subject Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              subject_code: "",
              subject_name: "",
              credits: "",
              exam_id: "",
            });
          }}
        >
          {showForm ? "Cancel" : "Add New Subject"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <div className="form-group">
              <label>Subject Code</label>
              <input
                type="text"
                value={formData.subject_code}
                onChange={(e) =>
                  setFormData({ ...formData, subject_code: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                value={formData.subject_name}
                onChange={(e) =>
                  setFormData({ ...formData, subject_name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input
                type="number"
                value={formData.credits}
                onChange={(e) =>
                  setFormData({ ...formData, credits: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Exam</label>
              <select
                value={formData.exam_id}
                onChange={(e) =>
                  setFormData({ ...formData, exam_id: e.target.value })
                }
              >
                <option value="">-- Optional --</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Credits</th>
              <th>Exam</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.subject_code}</td>
                <td>{subject.subject_name}</td>
                <td>{subject.credits || "N/A"}</td>
                <td>{subject.exam_name || "N/A"}</td>
                <td className="action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(subject)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(subject.id)}
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

export default Subjects;
