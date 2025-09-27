"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PurchaseForm } from "@/components/purchase-form"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { notFound } from "next/navigation"

// Mock product data - in real app this would come from database
const products = [
  {
    id: "1",
    name: "Túi Clutch Len Hoa Cúc",
    price: 450000,
    originalPrice: 600000,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/knitted-clutch-bag-with-daisy-pattern.jpg",
      "/knitted-clutch-bag-detail-view.jpg",
      "/knitted-clutch-bag-interior.jpg",
    ],
    category: "Clutch",
    description:
      "Túi clutch len thủ công với họa tiết hoa cúc tinh tế, hoàn hảo cho những buổi tiệc tối hoặc dạo phố. Được đan bằng sợi len cao cấp với kỹ thuật đan chặt chẽ, đảm bảo độ bền và giữ form dáng tốt.",
    features: [
      "Chất liệu: Len cotton cao cấp",
      "Kích thước: 25cm x 15cm x 5cm",
      "Trọng lượng: 200g",
      "Màu sắc: Hồng pastel với họa tiết hoa cúc trắng",
      "Lót trong: Vải cotton mềm mại",
      "Khóa: Khóa nam châm ẩn",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    name: "Túi Thời Trang Len Gradient",
    price: 650000,
    rating: 4.9,
    reviewCount: 89,
    images: [
      "/fashionable-knitted-bag-gradient-colors.jpg",
      "/gradient-knitted-bag-side-view.jpg",
      "/gradient-knitted-bag-handle-detail.jpg",
    ],
    category: "Thời Trang",
    description:
      "Túi thời trang với hiệu ứng gradient màu độc đáo, thể hiện phong cách hiện đại và năng động. Thiết kế đa năng, phù hợp cho cả công việc và giải trí.",
    features: [
      "Chất liệu: Len merino cao cấp",
      "Kích thước: 35cm x 25cm x 12cm",
      "Trọng lượng: 350g",
      "Màu sắc: Gradient từ tím đến hồng",
      "Quai xách: Dây len bện chắc chắn",
      "Ngăn phụ: 2 ngăn nhỏ bên trong",
    ],
    inStock: true,
    stockCount: 8,
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isPurchaseFormOpen, setIsPurchaseFormOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handlePurchaseClick = () => {
    setIsPurchaseFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 ${
                      selectedImage === index ? "ring-2 ring-purple-600" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-purple-100 text-purple-800 mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.rating}) • {product.reviewCount} đánh giá
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông Số Kỹ Thuật</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm text-gray-600">
                  {product.inStock ? `Còn ${product.stockCount} sản phẩm` : "Hết hàng"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3"
                    disabled={!product.inStock}
                    onClick={handlePurchaseClick}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Mua Ngay
                  </Button>
                  <Button variant="outline" size="icon" className="p-3 bg-transparent">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Thêm Vào Giỏ Hàng
                </Button>
              </div>

              {/* Service Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Miễn phí vận chuyển cho đơn hàng trên 1.000.000₫</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Bảo hành chất lượng 6 tháng</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Đổi trả trong 7 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Purchase Form Modal */}
      <PurchaseForm
        isOpen={isPurchaseFormOpen}
        onClose={() => setIsPurchaseFormOpen(false)}
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        }}
      />

      {/* <Footer /> */}
    </div>
  )
}
