import express from "express";
import authMiddleware from "#middlewares/auth";
import { get, create, update, deleteDoc } from "#controllers/loanQuery";

const router = express.Router();

router.use(authMiddleware);

router.route("/:id?").get(get).post(create).put(update).delete(deleteDoc);

export default router;
