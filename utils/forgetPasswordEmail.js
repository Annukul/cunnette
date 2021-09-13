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

export const forgetPasswordEmail = (name, email, link) => {
  // console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Cunnette Reset Password",
      html: `<h1>Cunnette Reset Password</h1>
          <h2>Hello ${name}</h2>
          <p>Click the following link to reset your Password.</p>
          <h3>Delete this email if you haven't requested for password reset.</h3>
          <a href=${link}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
