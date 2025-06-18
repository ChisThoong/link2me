import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/model/user';
import { addMonths } from 'date-fns';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== 'thongntc@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const _id = body._id;
    const months = parseInt(body.months);
    if (!_id || ![1, 3, 6, 12].includes(months)) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(_id);
    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy user' }, { status: 404 });
    }

    const now = new Date();
    const currentExpired = user.expiredAt ? new Date(user.expiredAt) : null;
    const baseDate = currentExpired && currentExpired > now ? currentExpired : now;
    const newExpiredAt = addMonths(baseDate, months);

    user.isPro = true;
    user.expiredAt = newExpiredAt;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lỗi nâng cấp:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
