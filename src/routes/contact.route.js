import express from "express";
import asyncHandler from "#utils/asyncHandler";
import ContactController from "#controllers/contact";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(ContactController.get.bind(ContactController)))
  .post(asyncHandler(ContactController.create.bind(ContactController)))
  .put(asyncHandler(ContactController.update.bind(ContactController)))
  .delete(asyncHandler(ContactController.deleteDoc.bind(ContactController)));

export default router;
