// src/app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import nodemailer from 'nodemailer';
import { connectToDB } from '@/models/mongodb';

export async function POST(req: NextRequest) {
  await connectToDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  const token = Math.random().toString(36).substring(2, 10);
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL!,
      pass: process.env.SMTP_PASS!,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${email}`;

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
  });

  return NextResponse.json({ message: 'Reset email sent' });
}
