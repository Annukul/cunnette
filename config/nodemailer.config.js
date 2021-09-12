import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.VERIFY_EMAIL;
const pass = process.env.VERIFY_PASSWORD;
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  // console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for Regestring. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:5000/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
