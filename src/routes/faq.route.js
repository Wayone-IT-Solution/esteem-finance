import express from "express";
import asyncHandler from "#utils/asyncHandler";
import FaqController from "#controllers/faq";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(FaqController.get.bind(FaqController)))
  .post(asyncHandler(FaqController.create.bind(FaqController)))
  .put(asyncHandler(FaqController.update.bind(FaqController)))
  .delete(asyncHandler(FaqController.deleteDoc.bind(FaqController)));

export default router;
