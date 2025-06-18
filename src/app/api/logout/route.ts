import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Đăng xuất thành công' });

  // Xóa cookie `token`
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set expired date to remove cookie
    path: '/',
  });

  return response;
}
