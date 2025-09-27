"use client"

import { useState } from "react"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all")

  const products = [
    {
      id: 1,
      name: "Túi Clutch Len Hoa Cúc",
      price: 450000,
      originalPrice: 600000,
      rating: 4.8,
      image: "/knitted-clutch-bag-with-daisy-pattern.jpg",
      isNew: true,
      category: "clutch",
      categoryName: "Clutch",
    },
    {
      id: 2,
      name: "Túi Thời Trang Len Gradient",
      price: 650000,
      rating: 4.9,
      image: "/fashionable-knitted-bag-gradient-colors.jpg",
      isNew: false,
      category: "fashion",
      categoryName: "Thời Trang",
    },
    {
      id: 3,
      name: "Túi Hình Gấu Len Dễ Thương",
      price: 520000,
      rating: 4.7,
      image: "/cute-knitted-bear-shaped-bag.jpg",
      isNew: true,
      category: "animal",
      categoryName: "Hình Thú",
    },
    {
      id: 4,
      name: "Túi Laptop Len Bảo Vệ",
      price: 780000,
      rating: 4.6,
      image: "/knitted-laptop-bag-protective.jpg",
      isNew: false,
      category: "laptop",
      categoryName: "Laptop",
    },
    {
      id: 5,
      name: "Túi Casual Len Đa Năng",
      price: 580000,
      rating: 4.5,
      image: "/casual-knitted-multi-purpose-bag.jpg",
      isNew: false,
      category: "casual",
      categoryName: "Casual",
    },
    {
      id: 6,
      name: "Túi Hình Mèo Len Xinh Xắn",
      price: 490000,
      rating: 4.8,
      image: "/adorable-knitted-cat-shaped-bag.jpg",
      isNew: true,
      category: "animal",
      categoryName: "Hình Thú",
    },
    {
      id: 7,
      name: "Túi Clutch Len Hoa Hồng",
      price: 420000,
      rating: 4.6,
      image: "/placeholder.svg?key=rose-clutch",
      isNew: false,
      category: "clutch",
      categoryName: "Clutch",
    },
    {
      id: 8,
      name: "Túi Thời Trang Len Sọc",
      price: 680000,
      rating: 4.7,
      image: "/placeholder.svg?key=striped-fashion",
      isNew: true,
      category: "fashion",
      categoryName: "Thời Trang",
    },
    {
      id: 9,
      name: "Charm Len Hoa Anh Đào",
      price: 120000,
      rating: 4.9,
      image: "/knitted-cherry-blossom-charm.jpg",
      isNew: true,
      category: "charm",
      categoryName: "Charm Len",
    },
    {
      id: 10,
      name: "Charm Len Trái Tim Mini",
      price: 85000,
      rating: 4.7,
      image: "/knitted-mini-heart-charm.jpg",
      isNew: false,
      category: "charm",
      categoryName: "Charm Len",
    },
    {
      id: 11,
      name: "Charm Len Hình Sao",
      price: 95000,
      rating: 4.8,
      image: "/knitted-star-shaped-charm.jpg",
      isNew: true,
      category: "charm",
      categoryName: "Charm Len",
    },
    {
      id: 12,
      name: "Charm Len Cầu Vồng",
      price: 110000,
      rating: 4.6,
      image: "/knitted-rainbow-charm.jpg",
      isNew: false,
      category: "charm",
      categoryName: "Charm Len",
    },
  ]

  const categories = [
    { id: "all", name: "Tất Cả", count: products.length },
    { id: "clutch", name: "Túi Clutch", count: products.filter((p) => p.category === "clutch").length },
    { id: "fashion", name: "Túi Thời Trang", count: products.filter((p) => p.category === "fashion").length },
    { id: "animal", name: "Túi Hình Thú", count: products.filter((p) => p.category === "animal").length },
    { id: "laptop", name: "Túi Laptop", count: products.filter((p) => p.category === "laptop").length },
    { id: "casual", name: "Túi Casual", count: products.filter((p) => p.category === "casual").length },
    { id: "charm", name: "Charm Len", count: products.filter((p) => p.category === "charm").length },
  ]

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-2 pb-2 transition-colors ${
                  activeCategory === category.id
                    ? "text-gray-900 font-medium border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${activeCategory === category.id ? "bg-purple-600" : "bg-gray-300"}`}
                ></div>
                <span>{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Hiển thị {filteredProducts.length} sản phẩm
            {activeCategory !== "all" && (
              <span> trong danh mục "{categories.find((c) => c.id === activeCategory)?.name}"</span>
            )}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </Link>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
                {product.isNew && <Badge className="absolute top-4 left-4 bg-purple-600 text-white">Mới</Badge>}
                <Badge className="absolute bottom-4 left-4 bg-white/90 text-gray-700 text-xs">
                  {product.categoryName}
                </Badge>
              </div>

              <div className="space-y-3">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-purple-600 cursor-pointer">{product.name}</h3>
                </Link>

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
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Thêm Vào Giỏ
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-600 mb-4">Hiện tại chưa có sản phẩm nào trong danh mục này.</p>
            <Button onClick={() => handleCategoryChange("all")} variant="outline">
              Xem Tất Cả Sản Phẩm
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
