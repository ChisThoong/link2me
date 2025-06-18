// src/app/admin/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminPageClient from './_client';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login'); // Chưa đăng nhập
  }

  if (session.user.role !== 'admin') {
    redirect('/'); // Không phải admin
  }

  return <AdminPageClient />;
}
