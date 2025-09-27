import { Truck, CreditCard, RotateCcw } from "lucide-react"

export function ServiceFeatures() {
  const features = [
    {
      icon: Truck,
      title: "GIAO HÀNG NHANH",
      description: "Giao hàng tận nơi nhanh chóng và đáng tin cậy",
    },
    {
      icon: CreditCard,
      title: "THANH TOÁN LINH HOẠT",
      description: "Nhiều hình thức thanh toán tiện lợi",
    },
    {
      icon: RotateCcw,
      title: "ĐỔI TRẢ MIỄN PHÍ",
      description: "Đổi trả dễ dàng trong vòng 30 ngày",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">Dịch Vụ Của Chúng Tôi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
