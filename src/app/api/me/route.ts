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

  // Kiểm tra nếu hết hạn thì cập nhật isPro = false
  const now = new Date();
  if (user.expiredAt && new Date(user.expiredAt) < now) {
    user.isPro = false;
    await user.save();
  }
  return NextResponse.json({ user });
}
