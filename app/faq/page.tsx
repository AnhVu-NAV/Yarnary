import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Câu Hỏi Thường Gặp</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc phổ biến về sản phẩm và dịch vụ của Yarnary.
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Túi len có bền không? Có bị giãn không?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Túi len của Yarnary được làm từ sợi len cao cấp với kỹ thuật đan chặt chẽ, đảm bảo độ bền cao. Chúng
                  tôi sử dụng lót trong để giữ form dáng và tránh giãn. Với cách sử dụng đúng, túi có thể sử dụng trong
                  nhiều năm mà vẫn giữ được form dáng ban đầu.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Làm thế nào để vệ sinh túi len?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Túi len nên được giặt tay bằng nước lạnh với xà phòng chuyên dụng cho len. Tránh vắt mạnh, thay vào đó
                  hãy ép nhẹ để loại bỏ nước thừa. Phơi ngang trong bóng râm và tránh ánh nắng trực tiếp.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Thời gian giao hàng là bao lâu?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Đối với sản phẩm có sẵn: 2-3 ngày làm việc trong nội thành, 3-5 ngày cho các tỉnh khác. Đối với sản
                  phẩm custom: 7-14 ngày tùy theo độ phức tạp của thiết kế.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Có thể đổi trả sản phẩm không?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên tem mác,
                  chưa sử dụng và không có mùi lạ. Sản phẩm custom không áp dụng chính sách đổi trả.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Có thể yêu cầu thiết kế riêng không?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Có, chúng tôi nhận đặt hàng custom theo yêu cầu. Bạn có thể gửi ý tưởng, hình ảnh tham khảo hoặc mô tả
                  chi tiết. Đội ngũ thiết kế sẽ tư vấn và báo giá cụ thể cho từng dự án.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Giá cả có bao gồm phí vận chuyển không?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Giá sản phẩm chưa bao gồm phí vận chuyển. Phí ship sẽ được tính dựa trên khu vực giao hàng. Miễn phí
                  ship cho đơn hàng từ 1.000.000₫ trong nội thành và từ 1.500.000₫ cho các tỉnh khác.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
