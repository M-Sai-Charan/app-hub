// app/api/user/update/route.ts
import { connectToDB } from '@/models/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, ...updateFields } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const updated = await User.findOneAndUpdate({ email }, updateFields, { new: true });
    return NextResponse.json({ message: 'Profile updated', user: updated });
  } catch (error) {
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}
