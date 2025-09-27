import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bộ Sưu Tập Túi Len</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập túi len thủ công độc đáo, được làm từ những sợi len cao cấp với tình yêu và sự tỉ mỉ.
            </p>
          </div>
        </div>
        <ProductGrid />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
