import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createHall,
  getHalls
} from "../services/hall.service.js";

const router = Router();

router.post("/", auth, createHall);
router.get("/", auth, getHalls);

export default router;
