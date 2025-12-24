import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getSeatingByExam,
  getSeatingByHall,
  getStudentSeat
} from "../services/seating.service.js";

const router = Router();

router.get("/exam/:examId", auth, getSeatingByExam);
router.get("/hall/:hallId/:examId", auth, getSeatingByHall);
router.get("/student/:rollNo/:examId", auth, getStudentSeat);

export default router;
