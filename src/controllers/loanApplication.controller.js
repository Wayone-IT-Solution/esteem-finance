import LoanApplicationService from "#services/loanApplication";
import Controller from "#controllers/base";
import httpStatus from "http-status";
import { sendResponse } from "#utils/response";

class LoanApplicationController extends Controller {
  static Service = LoanApplicationService;

  static async verifyOtp(req, res, next) {
    const verification = await this.Service.verifyOtp(
      req.params.id,
      req.body.otp,
    );
    sendResponse(httpStatus.OK, res, null, "Otp verified successfully");
  }
}

export default LoanApplicationController;
