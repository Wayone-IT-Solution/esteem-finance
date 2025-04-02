import express from "express";
import asyncHandler from "#utils/asyncHandler";
import LoanApplicationController from "#controllers/loanApplication";

const router = express.Router();

router
  .route("/verify-otp/:id")
  .put(
    asyncHandler(
      LoanApplicationController.verifyOtp.bind(LoanApplicationController),
    ),
  );

router
  .route("/:id?")
  .get(
    asyncHandler(LoanApplicationController.get.bind(LoanApplicationController)),
  )
  .post(
    asyncHandler(
      LoanApplicationController.create.bind(LoanApplicationController),
    ),
  )
  .put(
    asyncHandler(
      LoanApplicationController.update.bind(LoanApplicationController),
    ),
  )
  .delete(
    asyncHandler(
      LoanApplicationController.deleteDoc.bind(LoanApplicationController),
    ),
  );

export default router;
