import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/models/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    const user = await User.findOne({
      $or: [{ email }, { username: email }],
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email first' }, { status: 403 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Login successful', user: { id: user._id, email: user.email, name: user.name || '' } });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
