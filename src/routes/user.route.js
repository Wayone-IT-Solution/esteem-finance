import express from "express";
import UserController from "#controllers/user";
import asyncHandler from "#utils/asyncHandler";

const router = express.Router();

router
  .route("/login")
  .post(asyncHandler(UserController.login.bind(UserController)));
router
  .route("/:id?")
  .get(asyncHandler(UserController.get.bind(UserController)))
  .post(asyncHandler(UserController.create.bind(UserController)))
  .put(asyncHandler(UserController.update.bind(UserController)))
  .delete(asyncHandler(UserController.deleteDoc.bind(UserController)));

export default router;
