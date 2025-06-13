'use client';
import { useState } from 'react';

const plans = [
  { label: '1 tháng', price: '19.000đ' },
  { label: '3 tháng', price: '29.000đ' },
  { label: '6 tháng', price: '59.000đ' },
  { label: '1 năm', price: '99.000đ' },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">Bảng giá</h2>
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

            <button className="mt-8 w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primary/90 transition">
              Nâng cấp ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
