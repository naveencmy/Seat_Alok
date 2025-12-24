import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createStudent,
  getStudents,
  uploadStudents
} from "../services/student.service.js";

const router = Router();

router.post("/", auth, createStudent);
router.get("/", auth, getStudents);
router.post("/upload", auth, uploadStudents);

export default router;
