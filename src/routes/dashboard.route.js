import express from "express";
import asyncHandler from "#utils/asyncHandler";
import DashboardController from "#controllers/dashboard";

const router = express.Router();

router
  .route("/")
  .get(asyncHandler(DashboardController.get.bind(DashboardController)));

export default router;
