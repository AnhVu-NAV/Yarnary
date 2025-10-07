import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

// Server Action cho newsletter
async function subscribe(formData: FormData) {
  "use server"
  const email = String(formData.get("email") ?? "")
  // TODO: validate + lưu / gọi provider
}

export function Footer() {
  return (
    <section className="w-screen h-screen grid grid-rows-[minmax(0,2fr)_minmax(0,1fr)]">
      {/* =================== CTA (2/3) =================== */}
      <div className="relative flex items-center justify-center text-white">
        {/* mesh gradient nền */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-600" />
        <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-[radial-gradient(650px_300px_at_20%_20%,#ffffff66,transparent_60%),radial-gradient(700px_320px_at_80%_70%,#ffffff66,transparent_60%)]" />

        <div className="max-w-5xl mx-auto px-6 text-center py-14 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-medium ring-1 ring-white/30">
            <span className="uppercase tracking-wide">Yarnary</span>
            <span className="opacity-80">•</span>
            <span className="opacity-90">Túi len tuỳ chỉnh</span>
          </div>

          <h2 className="mt-4 text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Sẵn sàng tạo <span className="text-white/90">chiếc túi mơ ước?</span>
          </h2>

          <p className="mt-4 text-white/90 text-lg">
            Bắt đầu thiết kế chỉ trong vài phút. Chúng tôi sẽ liên hệ tư vấn ngay.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/custom">
              <Button
                size="lg"
                className="px-7 py-6 bg-white text-purple-700 hover:bg-white/90 shadow-lg shadow-black/10"
              >
                Thiết kế ngay
              </Button>
            </Link>
            <Link href="/collections">
              <Button
                size="lg"
                variant="outline"
                className="px-7 py-6 border-white/70 text-white hover:bg-white/10 backdrop-blur"
              >
                Khám phá bộ sưu tập
              </Button>
            </Link>
          </div>
        </div>

        {/* ===== DẢI SÓNG NGĂN ===== */}
        <svg
          className="absolute bottom-0 left-0 right-0"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ transform: "translateY(2px)" }} // đẩy nhẹ để liền mép
        >
          {/* màu phải trùng với footer */}
          <path
            d="M0,80 C240,140 480,20 720,60 C960,100 1200,140 1440,80 L1440,160 L0,160 Z"
            fill="#140F21"
          />
        </svg>
      </div>

      {/* =================== FOOTER (1/3) =================== */}
      <footer className="relative bg-[#0b0b12] text-gray-300 -mt-[1px] overflow-hidden">
        {/* texture nhẹ */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(168,85,247,0.08),transparent),radial-gradient(1000px_500px_at_50%_120%,rgba(236,72,153,0.06),transparent)]" />

        {/* ===== SITEMAP ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="text-xl font-bold text-white">Yarnary</Link>
              <p className="mt-3 text-sm text-gray-400">
                Túi len thủ công cao cấp và phụ kiện cho phong cách sống hiện đại.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white/90">Menu</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white/90">Trang Chủ</Link></li>
                <li><Link href="/collections" className="hover:text-white/90">Bộ Sưu Tập</Link></li>
                <li><Link href="/brand" className="hover:text-white/90">Thương Hiệu</Link></li>
                <li><Link href="/about" className="hover:text-white/90">Về Chúng Tôi</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white/90">Hỗ Trợ</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/shipping-returns" className="hover:text-white/90">Giao Hàng & Đổi Trả</Link></li>
                <li><Link href="/size-guide" className="hover:text-white/90">Hướng Dẫn Size</Link></li>
                <li><Link href="/care" className="hover:text-white/90">Bảo Quản Sản Phẩm</Link></li>
                <li><Link href="/contact" className="hover:text-white/90">Liên Hệ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white/90">Theo Dõi</h4>
              <div className="mt-4 flex items-center gap-4">
                <a href="https://www.facebook.com/Yarnary.vn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/yarnary" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@yarnary" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 2c1.2 0 2.4.4 3.4 1.1.4 2.4 2.3 4.2 4.6 4.6v3.1c-1.7 0-3.3-.5-4.6-1.5v6.6c0 3.7-3 6.6-6.6 6.6S2.2 19.7 2.2 16s3-6.6 6.6-6.6c.4 0 .8 0 1.1.1v3.4c-.3-.1-.7-.2-1.1-.2-1.7 0-3.1 1.4-3.1 3.2s1.4 3.2 3.1 3.2 3.1-1.4 3.1-3.2V2h2z"/>
                  </svg>
                </a>
              </div>
              <div className="mt-6 text-xs text-gray-500">
                Thanh toán an toàn: Visa · MasterCard · Momo
              </div>
            </div>
          </div>

          {/* ===== NEWSLETTER CARD ===== */}
          <div className="mt-10 md:mt-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-white/5 backdrop-blur px-5 py-6 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="text-center md:text-left">
                <h3 className="text-base md:text-lg font-semibold text-white">Nhận ưu đãi & mẫu mới mỗi tháng</h3>
                <p className="text-xs md:text-sm text-gray-400">Đăng ký nhận bản tin – hủy bất cứ lúc nào.</p>
              </div>

              <form className="w-full md:w-auto flex items-center gap-3" action={subscribe}>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email của bạn"
                  className="w-full md:w-80 rounded-xl bg-white/10 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-white/30 px-4 py-3"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-medium text-white hover:opacity-95"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}