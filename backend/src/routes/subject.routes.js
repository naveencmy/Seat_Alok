import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createSubject,
  getSubjects
} from "../services/subject.service.js";

const router = Router();

router.post("/", auth, createSubject);
router.get("/", auth, getSubjects);

export default router;
