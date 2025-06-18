import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/model/user';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { username, name, bio, avatarUrl, bgColor, bgImage, links = [], customLinks = [],products = [] } = body;

  try {
    await connectDB();
    // Lấy thông tin user hiện tại
    const userInDb = await User.findOne({ email: session.user.email });
    const isPro = userInDb?.isPro;

    // Kiểm tra vượt giới hạn nếu không phải Pro
    if (!isPro) {
      if (links.length > 3 || customLinks.length > 3) {
        return NextResponse.json(
          {
            error: 'Tài khoản miễn phí chỉ được lưu tối đa 3 liên kết mạng xã hội và 3 liên kết tùy chỉnh.',
          },
          { status: 400 }
        );
      }
    }

    await User.findOneAndUpdate(
      { email: session.user.email },
      { username, name, bio, avatarUrl, bgColor, bgImage, links, customLinks, products },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi lưu user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
