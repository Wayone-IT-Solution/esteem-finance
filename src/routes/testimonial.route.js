import express from "express";
import asyncHandler from "#utils/asyncHandler";
import TestimonialController from "#controllers/testimonial";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(TestimonialController.get.bind(TestimonialController)))
  .post(asyncHandler(TestimonialController.create.bind(TestimonialController)))
  .put(asyncHandler(TestimonialController.update.bind(TestimonialController)))
  .delete(
    asyncHandler(TestimonialController.deleteDoc.bind(TestimonialController)),
  );

export default router;
