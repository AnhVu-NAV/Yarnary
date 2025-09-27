import { Header } from "@/components/header"
import { BestSellingBags } from "@/components/best-selling-bags"
import { Footer } from "@/components/footer"

export default function PopularPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Phổ Biến</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những mẫu túi len được yêu thích nhất, được khách hàng lựa chọn và đánh giá cao.
            </p>
          </div>
        </div>
        <BestSellingBags />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
