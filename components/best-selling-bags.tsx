import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BestSellingBags() {
  const bestSellers = [
    {
      id: 1,
      name: "Túi Len Thêu Hoa Lavender",
      price: 680000,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300&text=Túi+Len+Lavender",
    },
    {
      id: 2,
      name: "Túi Len Vintage Kem",
      price: 590000,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300&text=Túi+Len+Vintage",
    },
    {
      id: 3,
      name: "Túi Len Boho Xanh Olive",
      price: 720000,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300&text=Túi+Len+Boho",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Túi Len Bán Chạy Nhất</h2>
          <Button variant="outline">Xem Tất Cả</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-2xl p-6">
              <div className="relative mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Thêm Vào Giỏ
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
