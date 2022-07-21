import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { EMAIL, PASS } from "../config";

const ConfirmMail = (email, user, link) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL,
      pass: PASS,
    },
    secure: true,
  });

  const hbsoption = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: "./views/",
      defaultLayout: false,
    },
    viewPath: "./views/",
    extName: ".hbs",
  };

  transporter.use("compile", hbs(hbsoption));

  const mailData = {
    from: "TyStore", // sender address
    to: email, // list of receivers
    subject: "activate account",
    template: "confirm",
    context: {
      user,
      link,
    },
  };
  transporter.sendMail(mailData, async function (err, info) {
    if (err) console.log(err);
    console.log(info.messageId);
  });
};

export default ConfirmMail;
