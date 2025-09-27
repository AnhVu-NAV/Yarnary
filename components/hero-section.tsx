"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { PurchaseForm } from "./purchase-form"
import Link from "next/link"

export function HeroSection() {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)

  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Túi Len Thủ Công
                <br />
                <span className="text-purple-600">Độc Đáo & Tinh Tế</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Khám phá bộ sưu tập túi len thủ công được đan tỉ mỉ với tình yêu và sự sáng tạo không giới hạn.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                onClick={() => setShowPurchaseForm(true)}
              >
                Mua Ngay
              </Button>
              <Link href="/collections">
                <Button variant="outline" size="lg" className="border-gray-300 bg-transparent">
                  Xem Bộ Sưu Tập
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/handmade-knitted-bag-colorful-yarn.jpg"
                alt="Túi Len Thủ Công"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2024</div>
                <div className="text-sm text-gray-600">BỘ SƯU TẬP</div>
                <div className="text-sm text-gray-600">MỚI NHẤT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPurchaseForm && (
        <PurchaseForm
          isOpen={showPurchaseForm}
          onClose={() => setShowPurchaseForm(false)}
          product={{
            id: "hero-special",
            name: "Túi Len Thủ Công Đặc Biệt",
            price: "299.000đ",
            image: "/handmade-knitted-bag-colorful-yarn.jpg",
          }}
        />
      )}
    </section>
  )
}
