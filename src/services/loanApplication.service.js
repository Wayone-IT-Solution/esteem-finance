import LoanApplication from "#models/loanApplication";
import api from "../utils/sms.util.cjs";
import httpStatus from "http-status";
import Service from "#services/base";

class LoanApplicationService extends Service {
  static Model = LoanApplication;

  static async create(data) {
    const doc = await this.Model.create(data);

    var smsMessage = new api.SmsMessage();

    var smsApi = new api.SMSApi("", "7B6586BD-AB79-CC69-2DA3-69B8600BF66A");

    smsMessage.to = doc.countryCode + doc.mobile;
    smsMessage.body = `Your One-Time Password (OTP) for verification is: ${doc.otp} This code is valid for the next 10 minutes. For your security, please do not share this code with anyone.`;

    //TODO: ADD A CRON TO DELETE OTP

    var smsCollection = new api.SmsMessageCollection();

    smsCollection.messages = [smsMessage];

    smsApi
      .smsSendPost(smsCollection)
      .then(function (response) {
        console.log(response.body);
      })
      .catch(function (err) {
        console.error(err.body);
      });

    return doc;
  }

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
