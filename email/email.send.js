const nodemailer = require('nodemailer');

const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, content) => {

  const contacts = {
    from: process.env.MAIL_USER,
    to: "anurao96@gmail.com"  //dineshkumar.veloo@gmail.com
  }

  
  const email = Object.assign({}, to, content, contacts)

  //  sendEmail()
  //   .then(() => doSomethingElse())

  await transporter.sendMail(email)

}
