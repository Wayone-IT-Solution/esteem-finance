import express from "express";
import asyncHandler from "#utils/asyncHandler";
import authMiddleware from "#middlewares/auth";
import LoanQueryController from "#controllers/loanQuery";

const router = express.Router();

router.use(authMiddleware);

router
  .route("/:id?")
  .get(asyncHandler(LoanQueryController.get.bind(LoanQueryController)))
  .post(asyncHandler(LoanQueryController.create.bind(LoanQueryController)))
  .put(asyncHandler(LoanQueryController.update.bind(LoanQueryController)))
  .delete(
    asyncHandler(LoanQueryController.deleteDoc.bind(LoanQueryController)),
  );

export default router;
