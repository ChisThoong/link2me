'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function AuthForm() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
    setEmail('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password || (isRegister && !username)) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    if (isRegister) {
      // Đăng ký
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại');
        toast.success('Đăng ký thành công! Vui lòng đăng nhập');
        setIsRegister(false);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
  
        if (res?.error) {
          throw new Error(res.error);
        }
  
        toast.success('Đăng nhập thành công');
        router.push('/home');
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          {isRegister ? 'Bắt đầu miễn phí' : 'Đăng nhập tài khoản'}
        </h2>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          {isRegister ? (
            <>
              Đã có tài khoản?{' '}
              <button
                onClick={handleToggleMode}
                className="text-primary hover:underline font-medium"
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <>
              Chưa có tài khoản?{' '}
              <button
                onClick={handleToggleMode}
                className="text-primary hover:underline font-medium"
              >
                Đăng ký
              </button>
            </>
          )}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md bg-gray-100 dark:bg-neutral-700 dark:text-white placeholder-gray-400"
          />
          {isRegister && (
            <input
              type="text"
              placeholder="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md bg-gray-100 dark:bg-neutral-700 dark:text-white placeholder-gray-400"
            />
          )}
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md bg-gray-100 dark:bg-neutral-700 dark:text-white placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition"
          >
            {loading
              ? 'Đang xử lý...'
              : isRegister
              ? 'Đăng ký'
              : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
