import { NextResponse } from 'next/server';
import { Otp } from '@/models/Otp';
import bcrypt from 'bcryptjs';
import { sendOtpMail } from '@/lib/mailer';
import { connectToDB } from '@/models/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  // Create 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.create({
    email,
    code: otpCode,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  await sendOtpMail(email, otpCode);

  return NextResponse.json({ message: 'OTP sent to email' });
}