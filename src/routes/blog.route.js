import express from "express";
import asyncHandler from "#utils/asyncHandler";
import BlogController from "#controllers/blog";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BlogController.get.bind(BlogController)))
  .post(asyncHandler(BlogController.create.bind(BlogController)))
  .put(BlogController.update.bind(BlogController))
  .delete(BlogController.deleteDoc.bind(BlogController));

export default router;
