import express from "express";
import asyncHandler from "#utils/asyncHandler";
import NewsLetterEmailController from "#controllers/newsLetterEmail";

const router = express.Router();

router
  .route("/:id?")
  .get(
    asyncHandler(NewsLetterEmailController.get.bind(NewsLetterEmailController)),
  )
  .post(
    asyncHandler(
      NewsLetterEmailController.create.bind(NewsLetterEmailController),
    ),
  )
  .put(
    asyncHandler(
      NewsLetterEmailController.update.bind(NewsLetterEmailController),
    ),
  )
  .delete(
    asyncHandler(
      NewsLetterEmailController.deleteDoc.bind(NewsLetterEmailController),
    ),
  );

export default router;
