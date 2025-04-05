import env from "#configs/env";
import nodemailer from "nodemailer";

export const sendEmail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.SMTP_USER, // your Gmail address
        pass: env.SMTP_PASS, // your App Password
      },
    });

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
