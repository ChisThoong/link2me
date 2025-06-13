'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-20 px-4 bg-primary text-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="text-center lg:text-left flex-1">
          <p className="uppercase text-sm font-semibold mb-2 tracking-wider">HÃY BẮT ĐẦU!</p>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Tạo trang <span className="text-white underline-offset-4">bio chuyên nghiệp</span><br />
            chỉ trong 1 phút
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0">
            Kết nối mọi mạng xã hội, sản phẩm, nội dung sáng tạo và dịch vụ của bạn chỉ bằng một liên kết duy nhất.
            Phù hợp cho người sáng tạo nội dung, kinh doanh online, freelancer, và bất kỳ ai muốn xây dựng sự hiện diện số.
          </p>

          <div className="flex flex-col sm:flex-row lg:justify-start justify-center gap-4 mt-8">
            <a
              href="/login"
              className="inline-block bg-white text-[#3b2dbf] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
            >
              Bắt đầu miễn phí
            </a>
            <a
              href="#pricing"
              className="inline-block border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#3b2dbf] transition"
            >
              Xem gói dịch vụ
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center items-center relative">
          <Image
            src="/images/en_US.webp"
            alt="Hero preview"
            width={1000}
            height={1000}
            className="relative"
            priority
          />
        </div>
      </div>
    </section>
  );
}
