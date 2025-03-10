import UserService from "#services/user";
import Controller from "#controllers/base";
import httpStatus from "http-status";
import { sendResponse } from "#utils/response";

class UserController extends Controller {
  static Service = UserService;

  static async login(req, res, next) {
    const loggedInData = await this.Service.login(req.body);
    sendResponse(httpStatus.OK, res, loggedInData, "Logged in successfully");
  }
}

export default UserController;
