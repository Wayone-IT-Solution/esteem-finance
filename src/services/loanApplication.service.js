import LoanApplication from "#models/loanApplication";
import api from "../utils/sms.util.cjs";
import httpStatus from "http-status";
import { sendEmail } from "#configs/nodeMailer";
import env from "#configs/env";
import Service from "#services/base";
import LoanQueryService from "#services/loanQuery";
import fs from "fs";

const base64Logo = "";
class LoanApplicationService extends Service {
  static Model = LoanApplication;

  static async create(data) {
    const code = Math.floor(100000 + Math.random() * 900000);
    data.otp = code;
    let doc = await this.Model.create(data);
    const APP_NAME = "Esteem Finance";

    // var smsMessage = new api.SmsMessage();
    //
    // var smsApi = new api.SMSApi(env.CLICKSEND_USER, env.CLICKSEND_API);
    //
    // smsMessage.to = doc.countryCode + doc.mobile;
    // smsMessage.body = `Your One-Time Password (OTP) for verification is: ${doc.otp} This code is valid for the next 10 minutes. For your security, please do not share this code with anyone.`;
    //
    // //TODO: ADD A CRON TO DELETE OTP
    //
    // var smsCollection = new api.SmsMessageCollection();
    //
    // smsCollection.messages = [smsMessage];
    //
    // smsApi
    //   .smsSendPost(smsCollection)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.body));
    //   })
    //   .catch(function (err) {
    //     console.error(err.body);
    //   });
    //

    const logoUrl = env.LOGO;

    const emailContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${APP_NAME} OTP Verification</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: Arial, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
      <tr>
        <td align="center" style="padding-bottom: 20px;">
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; color: #333333;">
          <h2 style="margin-top: 0; text-align: center;">Your OTP Code</h2>
          <p style="text-align: center; font-size: 16px;">Use the following OTP to verify your email address:</p>
          <p style="text-align: center; font-size: 32px; letter-spacing: 5px; font-weight: bold; color: #2e7d32;">
            ${doc.otp}
          </p>
          <p style="text-align: center; font-size: 14px; color: #888888;">This code is valid for the next 10 minutes.</p>
          <p style="text-align: center; font-size: 14px; color: #888888;">If you did not request this, please ignore this email.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-top: 30px; font-size: 12px; color: #aaaaaa;">
          &copy; Esteem Finance ${new Date().getFullYear()}. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    const mailOptions = {
      from: '"Esteem Finance" <esteemcars77@gmail.com>', // Sender's email
      to: doc.email, // Receiver's email
      subject: "OTP Verification", // Email subject
      html: emailContent,
    };
    sendEmail(mailOptions);

    doc = doc.toJSON();

    delete doc.otp;
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

  static async update(id, updates) {
    const doc = await this.Model.findById(id);

    if (updates.status === "Not Eligible") {
      if (!updates.disapprovalReason) {
        throw {
          status: false,
          message: "Disapproval reason is required",
          httpStatus: 400,
        };
      }
    } else {
      updates.disapprovalReason = "";
    }
    doc.update(updates);
    await doc.save();
    return doc;
  }
}

export default LoanApplicationService;
