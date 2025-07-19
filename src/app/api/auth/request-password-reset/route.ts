// Sends OTP to email
import { sendEmail } from '@/lib/mailer';
import { connectToDB } from '@/models/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = expiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: 'Reset Your Password - OTP Code',
      html: `
        <div style="font-family: sans-serif; background: #f9f9f9; padding: 20px;">
          <h2 style="color: #333;">Reset Password Request</h2>
          <p>Your OTP code is:</p>
          <h1 style="background: #007bff; color: white; padding: 10px 20px; border-radius: 6px; display: inline-block;">${otp}</h1>
          <p>This code will expire in 5 minutes. If you did not request a password reset, you can ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
