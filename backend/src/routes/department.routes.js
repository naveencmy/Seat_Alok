import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createDepartment,
  getDepartments
} from "../services/department.service.js";

const router = Router();

router.post("/", auth, createDepartment);
router.get("/", auth, getDepartments);

export default router;
