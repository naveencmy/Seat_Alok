import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (username: string, password: string) =>
  api.post("/auth/login", { username, password });

export const register = (username: string, password: string) =>
  api.post("/auth/register", { username, password });

// Exam APIs
export const getExams = () => api.get("/exams");
export const getExam = (id: number) => api.get(`/exams/${id}`);
export const createExam = (data: any) => api.post("/exams", data);
export const updateExam = (id: number, data: any) =>
  api.put(`/exams/${id}`, data);
export const deleteExam = (id: number) => api.delete(`/exams/${id}`);

// Subject APIs
export const getSubjects = () => api.get("/subjects");
export const getSubject = (id: number) => api.get(`/subjects/${id}`);
export const createSubject = (data: any) => api.post("/subjects", data);
export const updateSubject = (id: number, data: any) =>
  api.put(`/subjects/${id}`, data);
export const deleteSubject = (id: number) => api.delete(`/subjects/${id}`);

// Hall APIs
export const getHalls = () => api.get("/halls");
export const getHall = (id: number) => api.get(`/halls/${id}`);
export const createHall = (data: any) => api.post("/halls", data);
export const updateHall = (id: number, data: any) =>
  api.put(`/halls/${id}`, data);
export const deleteHall = (id: number) => api.delete(`/halls/${id}`);

// Department APIs
export const getDepartments = () => api.get("/departments");
export const getDepartment = (id: number) => api.get(`/departments/${id}`);
export const createDepartment = (data: any) => api.post("/departments", data);
export const updateDepartment = (id: number, data: any) =>
  api.put(`/departments/${id}`, data);
export const deleteDepartment = (id: number) =>
  api.delete(`/departments/${id}`);

// Student APIs
export const getStudents = () => api.get("/students");
export const uploadStudents = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/students/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteStudent = (id: number) => api.delete(`/students/${id}`);

// Allocation APIs
export const generateAllocation = (exam_id: number) =>
  api.post("/allocation/generate", { exam_id });
export const getAllocationStatus = (exam_id: number) =>
  api.get(`/allocation/status/${exam_id}`);
export const clearAllocations = (exam_id: number) =>
  api.delete(`/allocation/clear/${exam_id}`);

// Seating APIs
export const getHallSeating = (hall_id: number, exam_id: number) =>
  api.get(`/seating/hall/${hall_id}/${exam_id}`);
export const getStudentSeat = (roll_no: string, exam_id: number) =>
  api.get(`/seating/student/${roll_no}/${exam_id}`);
export const getExamAllocations = (exam_id: number) =>
  api.get(`/seating/exam/${exam_id}`);
export const getHallsWithAllocations = (exam_id: number) =>
  api.get(`/seating/halls/${exam_id}`);

// Export APIs
export const exportToExcel = (exam_id: number) => {
  return `${API_BASE_URL}/export/excel/${exam_id}`;
};
export const exportToPDF = (exam_id: number) => {
  return `${API_BASE_URL}/export/pdf/${exam_id}`;
};

export default api;
