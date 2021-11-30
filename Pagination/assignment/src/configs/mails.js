const nodemailer = require("nodemailer")



module.exports =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "a293a9987b7947",
      pass: "d1be38e05e4e9d",
    },
  });