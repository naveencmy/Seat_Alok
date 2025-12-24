import express from "express";
import { create, getAll } from "../services/exam.service.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, getAll);

export default router;
