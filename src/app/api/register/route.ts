
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/model/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();
    if (!email || !username || !password) {
      return NextResponse.json({ message: 'Thiếu thông tin' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email đã được sử dụng' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, username, password: hashedPassword });

    return NextResponse.json({ message: 'Tạo tài khoản thành công', userId: newUser._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}
