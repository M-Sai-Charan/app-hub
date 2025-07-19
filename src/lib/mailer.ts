import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Reusable function to send an email
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  await transporter.sendMail({
    from: `"App-Hub Support" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
    text,
  });
}

/**
 * Send a styled OTP email
 */
export async function sendOtpMail(to: string, otp: string) {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <h2 style="color: #4CAF50;">App-Hub Verification</h2>
      <p>Hello,</p>
      <p>Use the OTP below to verify your email address:</p>
      <div style="margin: 20px 0; font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</div>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
      <p>If you did not request this, please ignore this email.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #777;">Thank you, <br/>The App-Hub Team</p>
    </div>
  `;

  await sendEmail({
    to,
    subject: 'Your App-Hub OTP Code',
    html,
  });
}
