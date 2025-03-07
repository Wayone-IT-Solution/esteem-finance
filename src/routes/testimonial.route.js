import express from "express";
import asyncHandler from "#utils/asyncHandler";
import testimonialController from "#controllers/testimonial";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(testimonialController.get.bind(testimonialController)))
  .post(asyncHandler(testimonialController.create.bind(testimonialController)))
  .put(testimonialController.update.bind(testimonialController))
  .delete(testimonialController.deleteDoc.bind(testimonialController));

export default router;
