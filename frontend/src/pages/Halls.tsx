import React, { useEffect, useState } from "react";
import { getHalls, createHall, updateHall, deleteHall } from "../services/api";
import { toast } from "react-toastify";

const Halls: React.FC = () => {
  const [halls, setHalls] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    hall_number: "",
    seat_capacity: "",
    hall_order: "",
  });

  useEffect(() => {
    loadHalls();
  }, []);

  const loadHalls = async () => {
    try {
      const response = await getHalls();
      setHalls(response.data.halls);
    } catch (error) {
      toast.error("Error loading halls");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        hall_number: formData.hall_number,
        seat_capacity: parseInt(formData.seat_capacity),
        hall_order: formData.hall_order ? parseInt(formData.hall_order) : 0,
      };

      if (editingId) {
        await updateHall(editingId, data);
        toast.success("Hall updated successfully");
      } else {
        await createHall(data);
        toast.success("Hall created successfully");
      }
      setFormData({ hall_number: "", seat_capacity: "", hall_order: "" });
      setShowForm(false);
      setEditingId(null);
      loadHalls();
    } catch (error) {
      toast.error("Error saving hall");
    }
  };

  const handleEdit = (hall: any) => {
    setFormData({
      hall_number: hall.hall_number,
      seat_capacity: hall.seat_capacity.toString(),
      hall_order: hall.hall_order.toString(),
    });
    setEditingId(hall.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteHall(id);
        toast.success("Hall deleted successfully");
        loadHalls();
      } catch (error) {
        toast.error("Error deleting hall");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Hall Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ hall_number: "", seat_capacity: "", hall_order: "" });
          }}
        >
          {showForm ? "Cancel" : "Add New Hall"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <div className="form-group">
              <label>Hall Number</label>
              <input
                type="text"
                value={formData.hall_number}
                onChange={(e) =>
                  setFormData({ ...formData, hall_number: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Seat Capacity</label>
              <input
                type="number"
                value={formData.seat_capacity}
                onChange={(e) =>
                  setFormData({ ...formData, seat_capacity: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Hall Order (for allocation sequence)</label>
              <input
                type="number"
                value={formData.hall_order}
                onChange={(e) =>
                  setFormData({ ...formData, hall_order: e.target.value })
                }
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
              <th>Hall Number</th>
              <th>Seat Capacity</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.hall_number}</td>
                <td>{hall.seat_capacity}</td>
                <td>{hall.hall_order}</td>
                <td className="action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(hall)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(hall.id)}
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

export default Halls;
