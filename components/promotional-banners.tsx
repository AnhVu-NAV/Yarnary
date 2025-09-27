import { Button } from "@/components/ui/button"

export function PromotionalBanners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Banner */}
          <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 overflow-hidden">
            <div className="relative z-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  TÚI LEN THỦ CÔNG
                  <br />
                  PHONG CÁCH VINTAGE
                  <br />
                  ĐỘC ĐÁO
                </h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Mua Ngay</Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
              <img
                src="/placeholder.svg?height=300&width=200&text=Túi+Len+Vintage"
                alt="Túi Len Vintage"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 overflow-hidden">
            <div className="relative z-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  TÚI LEN THÊU HOA
                  <br />
                  TINH TẾ CHO BẠN!
                </h3>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">Mua Ngay</Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
              <img
                src="/placeholder.svg?height=300&width=200&text=Túi+Len+Thêu+Hoa"
                alt="Túi Len Thêu Hoa"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Discount Coupons */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-100 text-purple-800 p-4 rounded-lg text-center">
            <span className="font-semibold">GIẢM 20% MÃ "YARN20"</span>
          </div>
          <div className="bg-pink-100 text-pink-800 p-4 rounded-lg text-center">
            <span className="font-semibold">GIẢM 15% MÃ "HANDMADE15"</span>
          </div>
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center">
            <span className="font-semibold">GIẢM 25% MÃ "KNIT25"</span>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
            <span className="font-semibold">MIỄN PHÍ SHIP MÃ "FREESHIP"</span>
          </div>
        </div>
      </div>
    </section>
  )
}
