// utils/sendEmail.js
import nodemailer from "nodemailer";

/**
 * Sends an email using configured SMTP or service credentials.
 * Configure .env with:
 *  EMAIL_HOST=smtp.gmail.com
 *  EMAIL_PORT=587
 *  EMAIL_USER=youraddress@gmail.com
 *  EMAIL_PASS=yourpassword_or_app_specific_token
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"LMS Notifications" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw err;
  }
};

/**
 * Helper: send grade notification
 */
export const sendGradeNotification = async (studentEmail, courseName, grade, feedback) => {
  const html = `
    <h3>Your assignment has been graded!</h3>
    <p>Course: <b>${courseName}</b></p>
    <p>Grade: <b>${grade}</b></p>
    <p>Feedback: ${feedback || "No feedback provided"}</p>
    <br/>
    <p>– LMS Auto Notification</p>
  `;
  await sendEmail(studentEmail, `Grade Received for ${courseName}`, html);
};

/**
 * Helper: plagiarism alert
 */
export const sendPlagiarismAlert = async (teacherEmail, assignmentTitle, details) => {
  const html = `
    <h3>Plagiarism Check Completed</h3>
    <p>Assignment: <b>${assignmentTitle}</b></p>
    <p>Potential matches detected:</p>
    <pre>${JSON.stringify(details, null, 2)}</pre>
    <p>Please review the report in your LMS dashboard.</p>
  `;
  await sendEmail(teacherEmail, `Plagiarism Report for ${assignmentTitle}`, html);
};
