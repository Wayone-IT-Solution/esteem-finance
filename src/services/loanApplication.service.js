import LoanApplication from "#models/loanApplication";
import api from "../utils/sms.util.cjs";
import httpStatus from "http-status";
import env from "#configs/env";
import Service from "#services/base";
import LoanQueryService from "#services/loanQuery";

class LoanApplicationService extends Service {
  static Model = LoanApplication;

  static async create(data) {
    // const code = Math.floor(100000 + Math.random() * 900000);
    // data.otp = code;
    const doc = await this.Model.create(data);

    var smsMessage = new api.SmsMessage();

    var smsApi = new api.SMSApi(env.CLICKSEND_USER, env.CLICKSEND_API);

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
