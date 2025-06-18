'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface User {
  _id: string;
  username: string;
  email: string;
  isPro: boolean;
  createdAt: string;
  expiredAt?: string;
}

export default function AdminPageClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedMonths, setSelectedMonths] = useState<{ [key: string]: number }>({});

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const confirmUpgrade = async (userId: string) => {
    const months = selectedMonths[userId] || 1;

    try {
      const res = await fetch('/api/admin/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  _id: userId, months }),
      });

      if (res.ok) {
        toast.success('Đã nâng cấp Pro');
        setEditingUserId(null);
        fetchUsers();
      } else {
        const { error } = await res.json();
        toast.error(error || 'Có lỗi xảy ra');
      }
    } catch (error) {
      toast.error('Lỗi khi nâng cấp người dùng');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full text-sm border rounded shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <th className="text-left p-3">Username</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Ngày tạo</th>
              <th className="text-left p-3">Trạng thái</th>
              <th className="text-left p-3">Hết hạn</th>
              <th className="text-left p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-3">
                  {user.isPro ? (
                    <span className="text-green-600 font-medium">Pro</span>
                  ) : (
                    <span className="text-gray-500">Free</span>
                  )}
                </td>
                <td className="p-3">
                  {user.expiredAt ? new Date(user.expiredAt).toLocaleDateString() : '-'}
                </td>
                <td className="p-3">
                  {!user.isPro && (
                    <div className="flex flex-col items-start gap-2">
                      {editingUserId === user._id ? (
                        <>
                          <select
                            onChange={(e) =>
                              setSelectedMonths((prev) => ({
                                ...prev,
                                [user._id]: parseInt(e.target.value),
                              }))
                            }
                            value={selectedMonths[user._id] || 1}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            {[1, 3, 6, 12].map((m) => (
                              <option key={m} value={m}>
                                {m} tháng
                              </option>
                            ))}
                          </select>
                          <Button onClick={() => confirmUpgrade(user._id)} size="sm">
                            Xác nhận
                          </Button>
                          <button
                            onClick={() => setEditingUserId(null)}
                            className="text-xs text-gray-500 hover:underline mt-1"
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <Button onClick={() => setEditingUserId(user._id)} size="sm">
                          Nâng cấp
                        </Button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
