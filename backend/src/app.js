import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import examRoutes from "./routes/exam.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import studentRoutes from "./routes/student.routes.js";
import hallRoutes from "./routes/hall.routes.js";
import allocationRoutes from "./routes/allocation.routes.js";
import seatingRoutes from "./routes/seating.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/departments", departmentRoutes);
app.use("/exams", examRoutes);
app.use("/subjects", subjectRoutes);
app.use("/students", studentRoutes);
app.use("/halls", hallRoutes);
app.use("/allocation", allocationRoutes);
app.use("/seating", seatingRoutes);

export default app;
