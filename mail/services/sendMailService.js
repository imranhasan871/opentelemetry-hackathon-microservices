const prisma = require("../utils/prisma");
const nodemailer = require("nodemailer");

/**
 * Sends an email using Nodemailer and saves the email to the database.
 * 
 * @param {Object} options - The email options.
 * @param {string} options.to - The recipient's email address.
 * @param {string} options.from - The sender's email address.
 * @param {string} options.subject - The email subject.
 * @param {string} options.body - The email body.
 * @returns {Promise<Object>} - A promise that resolves to the saved email object.
 * @throws {Error} - If any of the required fields are missing or if there is an error sending the email.
 */
const sendMailService = async ({ to, from, subject, body }) => {
  const error = new Error();
  if (!to || !from || !subject || !body) {
    error.message = "Please provide all the required fields";
    error.status = 400;
    throw error;
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
  });

  // Create mail options
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: body,
  };

  // send mail
  const { rejected } = await transporter.sendMail(mailOptions);

  if (rejected.length > 0) {
    error.message = "Error sending email";
    error.status = 500;
    throw error;
  }

  // Save email to database
  const mail = await prisma.mail.create({
    data: {
      from,
      to,
      subject,
      body
    },
  });



  return mail;
};

module.exports = sendMailService;
