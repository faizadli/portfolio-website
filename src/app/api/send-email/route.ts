import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message, to } = await request.json();

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Konfigurasi transporter - GANTI DENGAN KREDENSIAL EMAIL ANDA
    const transporter = nodemailer.createTransport({
      service: 'gmail', // atau smtp.gmail.com
      auth: {
        user: process.env.EMAIL_USER, // Email Anda
        pass: process.env.EMAIL_PASS, // App password Gmail Anda
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || 'faizadli9912@gmail.com',
      subject: `Pesan Portfolio dari ${name}`,
      html: `
        <h2>Pesan Baru dari Portfolio</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email berhasil dikirim' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim email' },
      { status: 500 }
    );
  }
}


// **3. Setup Gmail App Password:**

// Untuk mengirim email via Gmail, Anda perlu:
// 1. Aktifkan **2-Factor Authentication** di akun Gmail
// 2. Buat **App Password** di https://myaccount.google.com/apppasswords
// 3. Simpan credentials di file `.env.local`:

// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-app-password-here