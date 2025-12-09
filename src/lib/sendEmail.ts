"use server";
import nodemailer from "nodemailer";

export type SendEmailPayload = {
  name: string;
  email: string;
  message: string;
  to?: string;
};

export async function sendEmail({
  name,
  email,
  message,
  to,
}: SendEmailPayload): Promise<void> {
  if (!name || !email || !message) {
    throw new Error("All fields are required");
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration not found (EMAIL_USER/EMAIL_PASS)");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to || "faizadli9912@gmail.com",
    subject: `Portfolio Message from ${name}`,
    html: `
      <h2>New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Catatan: gunakan Gmail App Password.
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-app-password-here

// Server Action yang bisa dipanggil dari Client Component
export async function sendEmailAction(
  payload: SendEmailPayload,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await sendEmail(payload);
    return { ok: true };
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "An error occurred while sending email";
    return { ok: false, error: message };
  }
}
