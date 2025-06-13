import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth'; 
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/model/user';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(session.user.id).select('-password');

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}
