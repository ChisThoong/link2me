'use client';
import { Sparkle, ShoppingCart, Utensils, Link } from 'lucide-react';

const features = [
  {
    icon: <Link className="w-8 h-8 text-primary" />,
    title: 'Tạo Link Bio',
    description: 'Tạo một trang liên kết duy nhất chứa toàn bộ mạng xã hội, dịch vụ và nội dung của bạn.',
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    title: 'Link sản phẩm ',
    description: 'Giới thiệu các sản phẩm của bạn với link đẹp, dễ chia sẻ, tối ưu chuyển đổi.',
  },
  {
    icon: <Utensils className="w-8 h-8 text-primary" />,
    title: 'Menu món ăn',
    description: 'Tạo menu món ăn chuyên nghiệp cho nhà hàng, quán cafe, dễ chia sẻ qua mã QR.',
  },
  {
    icon: <Sparkle className="w-8 h-8 text-primary" />,
    title: 'Tùy chỉnh linh hoạt',
    description: 'Hỗ trợ giao diện cá nhân hóa, tùy chỉnh màu sắc, logo, và nhiều hơn nữa.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Dịch vụ bạn có thể sử dụng</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Dễ dàng tạo các trang chuyên nghiệp, giúp bạn kết nối và bán hàng hiệu quả hơn.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 dark:bg-neutral-900 rounded-xl shadow hover:shadow-lg transition">
            <div className="mb-4 flex mx-auto items-center justify-center w-12 h-12">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
