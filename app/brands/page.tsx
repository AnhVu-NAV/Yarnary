import { Header } from "@/components/header"
import { BrandLogos } from "@/components/brand-logos"
import { Footer } from "@/components/footer"

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thương Hiệu Đối Tác</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yarnary tự hào hợp tác với các thương hiệu uy tín để mang đến những sản phẩm chất lượng cao nhất.
            </p>
          </div>
        </div>
        {/* <BrandLogos /> */}

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Chất Lượng Cao</h3>
                <p className="text-gray-600">
                  Chúng tôi chỉ sử dụng những sợi len cao cấp nhất từ các nhà cung cấp uy tín.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Thủ Công Tinh Xảo</h3>
                <p className="text-gray-600">
                  Mỗi sản phẩm được làm thủ công bởi những nghệ nhân có kinh nghiệm lâu năm.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Thiết Kế Độc Đáo</h3>
                <p className="text-gray-600">
                  Các mẫu thiết kế độc quyền, không trùng lặp với bất kỳ sản phẩm nào khác.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
