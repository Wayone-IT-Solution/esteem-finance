import LoanApplication from "#models/loanApplication";
import httpStatus from "http-status";
import Service from "#services/base";

class LoanApplicationService extends Service {
  static Model = LoanApplication;

  static async verifyOtp(id, otp) {
    const doc = await this.Model.findById(id);

    if (doc.otp !== otp) {
      throw {
        status: false,
        message: "Invalid OTP",
        httpStatus: 400,
      };
    }
    doc.otpVerified = true;
    await doc.save();
  }
}

export default LoanApplicationService;
