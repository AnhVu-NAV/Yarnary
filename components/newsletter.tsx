import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ĐĂNG KÝ NHẬN TIN TỨC</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CẬP NHẬT VÀ NHẬN THÔNG BÁO VỀ NHỮNG SẢN PHẨM MỚI NHẤT, ƯU ĐÃI VÀ TIN TỨC TỪ YARNARY.COM
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <Input placeholder="Nhập email của bạn" className="flex-1" />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">Đăng Ký</Button>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <img src="/placeholder.svg?height=40&width=60&text=Mastercard" alt="Mastercard" className="h-8" />
            <img src="/placeholder.svg?height=40&width=60&text=PayPal" alt="PayPal" className="h-8" />
            <img src="/placeholder.svg?height=40&width=60&text=Visa" alt="Visa" className="h-8" />
          </div>
        </div>
      </div>
    </section>
  )
}
