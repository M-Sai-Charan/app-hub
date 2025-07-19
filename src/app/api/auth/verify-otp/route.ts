import { NextResponse } from 'next/server';
import { Otp } from '@/models/Otp';
import { connectToDB } from '@/models/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { email, code } = await req.json();

  await connectToDB();

  const validOtp = await Otp.findOne({ email, code });
  if (!validOtp || validOtp.expiresAt < new Date()) {
    return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
  }

  await User.updateOne({ email }, { $set: { isVerified: true } });
  await Otp.deleteMany({ email }); // cleanup

  return NextResponse.json({ message: 'Email verified successfully' });
}
