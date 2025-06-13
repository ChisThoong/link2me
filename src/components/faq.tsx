const faqs = [
    { q: 'Tạo link bio có mất phí không?', a: 'Bạn có thể dùng miễn phí hoặc nâng cấp lên bản Pro nếu cần nhiều tính năng hơn.' },
    { q: 'Có thể thay đổi giao diện sau khi tạo không?', a: 'Hoàn toàn có thể! Bạn có thể đổi theme bất cứ lúc nào.' },
    { q: 'Có thể gắn link TikTok, Shopee không?', a: 'Có, bạn có thể thêm bất kỳ liên kết nào bạn muốn.' }
  ];
  
  export default function FAQ() {
    return (
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary dark:text-white">Câu hỏi thường gặp</h2>
        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h4 className="font-semibold mb-2 text-lg text-primary dark:text-white">{item.q}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  