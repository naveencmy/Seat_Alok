import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  generateAllocation,
  clearAllocation,
  getStatus
} from "../services/allocation.service.js";

const router = Router();

router.post("/generate", auth, generateAllocation);
router.get("/status/:examId", auth, getStatus);
router.delete("/clear/:examId", auth, clearAllocation);

export default router;
