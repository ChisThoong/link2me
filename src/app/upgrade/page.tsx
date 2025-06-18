'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const plans = [
  { label: '1 tháng', price: '19.000đ', code: 'pro01' },
  { label: '3 tháng', price: '29.000đ', code: 'pro03' },
  { label: '6 tháng', price: '59.000đ', code: 'pro06' },
  { label: '1 năm', price: '99.000đ', code: 'pro12' },
];

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [step, setStep] = useState<'selectPlan' | 'confirmPayment'>('selectPlan');
  const { data: session } = useSession();
  const username = session?.user?.username || 'guest';
  const transferContent = `${username}+${selectedPlan.code}`;

  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">Nâng cấp Pro</h2>

        {step === 'selectPlan' && (
          <>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Lựa chọn gói phù hợp với nhu cầu của bạn — bắt đầu miễn phí, nâng cấp khi cần.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Miễn phí */}
              <div className="flex flex-col justify-between border rounded-xl shadow-sm p-8 bg-gray-50 dark:bg-neutral-900">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Miễn phí</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Dành cho người mới bắt đầu. Tạo link bio cơ bản, chia sẻ dễ dàng.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>✓ Tạo trang bio cơ bản</li>
                    <li>✓ Tùy chỉnh ảnh đại diện, màu sắc</li>
                    <li>✓ Chèn tối đa 5 liên kết</li>
                  </ul>
                </div>
                <button className="mt-8 w-full bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-white py-3 rounded font-semibold hover:bg-gray-300 dark:hover:bg-neutral-700 transition">
                  Sử dụng miễn phí
                </button>
              </div>

              {/* Pro */}
              <div className="flex flex-col justify-between border-2 border-primary rounded-xl shadow-sm p-8 bg-white dark:bg-neutral-900">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                      Phổ biến nhất
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Mở khóa toàn bộ tính năng nâng cao để tăng hiệu quả kinh doanh.
                  </p>

                  {/* Gói chọn */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {plans.map((plan) => (
                      <button
                        key={plan.label}
                        onClick={() => setSelectedPlan(plan)}
                        className={`py-2 px-3 rounded border font-medium text-sm transition ${
                          selectedPlan.label === plan.label
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {plan.label}
                      </button>
                    ))}
                  </div>

                  <p className="text-3xl font-extrabold text-primary mb-4">{selectedPlan.price}</p>

                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>✓ Không giới hạn số link</li>
                    <li>✓ Thống kê lượt click</li>
                    <li>✓ Tùy chỉnh icon, giao diện nâng cao</li>
                    <li>✓ Hỗ trợ ưu tiên</li>
                  </ul>
                </div>

                <button
                  className="mt-8 w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primary/90 transition"
                  onClick={() => setStep('confirmPayment')}
                >
                  Nâng cấp ngay
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'confirmPayment' && (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg bg-white dark:bg-neutral-900 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Xác nhận đã thanh toán</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
            Vui lòng chuyển khoản theo thông tin bên dưới. Sau khi đã thanh toán, nhấn nút xác nhận.
            </p>

            {/* Thông tin chuyển khoản */}
            <div className="mb-6 space-y-4">
            {/* Số điện thoại */}
            <div>
                <label className="text-sm font-medium">Số điện thoại Momo:</label>
                <div className="relative mt-1">
                <div className="bg-white dark:bg-neutral-800 border rounded px-4 py-2 text-sm font-mono pr-10 truncate">
                    0328727780
                </div>
                <button
                    onClick={() => {
                    navigator.clipboard.writeText("0328727780");
                    toast.success('Đã sao chép số điện thoại');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                >
                    Sao chép
                </button>
                </div>
            </div>

            {/* Chủ tài khoản */}
            <div>
                <label className="text-sm font-medium">Chủ tài khoản:</label>
                <div className="bg-white dark:bg-neutral-800 border rounded px-4 py-2 text-sm">
                Nguyễn Thanh Chí Thông
                </div>
            </div>

            {/* Số tiền */}
            <div>
                <label className="text-sm font-medium">Số tiền:</label>
                <div className="bg-white dark:bg-neutral-800 border rounded px-4 py-2 text-sm">
                {selectedPlan.price}
                </div>
            </div>

            {/* Nội dung chuyển khoản */}
            <div>
                <label className="text-sm font-medium">Nội dung chuyển khoản:</label>
                <div className="relative mt-1">
                <div className="bg-white dark:bg-neutral-800 border rounded px-4 py-2 text-sm font-mono pr-10 truncate">
                    {transferContent}
                </div>
                <button
                    onClick={() => {
                    navigator.clipboard.writeText(transferContent);
                    toast.success('Đã sao chép nội dung chuyển khoản');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                >
                    Sao chép
                </button>
                </div>
            </div>
            </div>

            {/* Nút xác nhận */}
            <button
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
            onClick={() => toast.success('Vui lòng liên hệ Zalo để được hỗ trợ nhanh nhất')}
            >
            Tôi đã thanh toán
            </button>

            {/* Zalo hỗ trợ */}
            <div className="mt-6 text-center">
            <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
                📢 Để được xử lý nhanh hơn, vui lòng gửi ảnh chụp màn hình chuyển khoản đến Zalo <span className = "font-bold">0328727780 </span>:
            </p>
            <img
                src="/images/qr_zalo.jpg"
                alt="QR Zalo hỗ trợ"
                className="mx-auto w-40 h-40 rounded-lg border"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Zalo hỗ trợ khách hàng</p>
            </div>
            {/* Nút quay về trang chủ */}
            <div className="mt-6 text-center">
            <button
                onClick={() => window.location.href = '/home'}
                className="text-sm text-indigo-600 hover:underline mt-4"
            >
                ← Quay về trang chủ
            </button>
            </div>
        </div>
        
        )}

      </div>
    </section>
  );
}
