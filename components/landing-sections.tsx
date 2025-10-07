"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
    return (
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white pt-24 pb-20">
        {/* Background layer */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.12),transparent_60%)]" />
  
        {/* Main text content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-200">
            Túi Len Thủ Công – Sáng tạo cùng Yarnary
          </div>
  
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            Thiết kế túi len{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              độc đáo
            </span>
          </h1>
  
          <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Từ ý tưởng đến hiện thực. Chọn màu, họa tiết, chất liệu – chúng tôi đan tay tỉ mỉ cho riêng bạn.
          </p>
  
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/custom">
              <Button className="bg-purple-600 hover:bg-purple-700 px-6 py-6 text-base">
                Thiết kế ngay
              </Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" className="px-6 py-6 text-base">
                Xem bộ sưu tập
              </Button>
            </Link>
          </div>
        </div>
  
        {/* Bag image */}
        <div className="mt-16 relative z-0 flex justify-center">
          <div className="w-[min(90vw,750px)] h-[min(60vw,500px)] drop-shadow-2xl">
            <Image
              alt="Túi len nổi bật"
              src="/fashionable-knitted-bag-gradient-colors.jpg"
              fill
              className="object-cover rounded-3xl border border-white/50"
            />
          </div>
        </div>
      </section>
    )
  }   

export function LandingShowcase() {
  const items = [
    "/cute-knitted-bear-shaped-bag.jpg",
    "/adorable-knitted-cat-shaped-bag.jpg",
    "/knitted-clutch-bag-with-daisy-pattern.jpg",
  ]
  return (
    <section className="w-screen h-full relative flex items-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full -translate-y-4 md:-translate-y-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Nghệ thuật từ sợi len</h2>
          <p className="mt-3 text-gray-600 text-lg">Mỗi chiếc túi là một tác phẩm thủ công, đan tay tỉ mỉ bởi nghệ nhân, bền bỉ và tinh tế.</p>
          <div className="mt-6 flex gap-4">
            <Link href="/popular"><Button className="bg-purple-600 hover:bg-purple-700">Phổ biến</Button></Link>
            <Link href="/brands"><Button variant="outline">Về thương hiệu</Button></Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {items.map((src, i) => (
            <div key={src} className={`relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-black/5 ${i===1?"translate-y-6":""}`}>
              <Image alt="Showcase" src={src} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LandingFeatures() {
  const features = [
    { title: "Đan tay tỉ mỉ", desc: "Chất lượng thủ công, từng mũi đan hoàn hảo" },
    { title: "Tùy chỉnh màu sắc", desc: "Hàng chục bảng màu len để phối" },
    { title: "Bảo hành 12 tháng", desc: "Bền bỉ cho sử dụng hàng ngày" },
  ]
  return (
    <section className="w-screen h-full relative flex items-center justify-center bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center -translate-y-4 md:-translate-y-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Vì sao chọn Yarnary?</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">Sản phẩm đẳng cấp, trải nghiệm mượt mà từ thiết kế đến giao hàng.</p>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-6 border border-gray-200 bg-gray-50 text-left">
              <div className="text-xl font-semibold text-gray-900">{f.title}</div>
              <div className="mt-2 text-gray-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LandingCTA() {
  return (
    <section className="w-screen h-full relative flex items-center justify-center bg-gradient-to-tr from-purple-600 to-pink-600 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold">Sẵn sàng tạo chiếc túi mơ ước?</h2>
        <p className="mt-4 text-white/90 text-lg">Bắt đầu thiết kế chỉ trong vài phút. Chúng tôi sẽ liên hệ tư vấn ngay.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/custom"><Button size="lg" className="bg-white text-purple-700 hover:bg-white/90">Thiết kế ngay</Button></Link>
          <Link href="/collections"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Khám phá bộ sưu tập</Button></Link>
        </div>
      </div>
    </section>
  )
}


