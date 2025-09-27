import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Leaf, Users, Award } from "lucide-react"

export default function ValuesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Giá Trị Cốt Lõi</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yarnary được xây dựng trên những giá trị bền vững và cam kết mang đến sản phẩm tốt nhất cho khách hàng.
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Tình Yêu Thủ Công</h3>
                  <p className="text-gray-600">
                    Mỗi sản phẩm được tạo ra với tình yêu và sự tỉ mỉ. Chúng tôi tin rằng những món đồ làm bằng tay mang
                    trong mình năng lượng tích cực và sự ấm áp đặc biệt.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Thân Thiện Môi Trường</h3>
                  <p className="text-gray-600">
                    Chúng tôi cam kết sử dụng nguyên liệu thân thiện với môi trường, quy trình sản xuất bền vững và đóng
                    góp vào việc bảo vệ hành tinh xanh.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cộng Đồng</h3>
                  <p className="text-gray-600">
                    Yarnary không chỉ là thương hiệu mà còn là cộng đồng những người yêu thích đồ thủ công. Chúng tôi
                    kết nối và hỗ trợ lẫn nhau trong hành trình sáng tạo.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Chất Lượng Vượt Trội</h3>
                  <p className="text-gray-600">
                    Chúng tôi không ngừng nâng cao chất lượng sản phẩm, từ việc chọn lựa nguyên liệu đến từng đường kim
                    mũi chỉ, đảm bảo khách hàng luôn hài lòng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
