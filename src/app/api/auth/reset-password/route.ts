import { connectToDB } from '@/models/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    if (
      user.resetPasswordOtp !== otp ||
      !user.resetPasswordOtpExpiry ||
      user.resetPasswordOtpExpiry < new Date()
    ) {
      console.log('🛑 OTP Mismatch or Expired');
      console.log('Provided OTP:', otp);
      console.log('Stored OTP:', user.resetPasswordOtp);
      console.log('Stored Expiry:', user.resetPasswordOtpExpiry);
      console.log('Now:', new Date());
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
