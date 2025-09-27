export function CollectionShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bộ Sưu Tập Túi Len</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tất cả túi len của chúng tôi đều được đan thủ công 100%. Chúng trông tuyệt đẹp, mang lại cho bạn vẻ ngoài
            quyến rũ và cảm giác tự tin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src="/placeholder.svg?height=320&width=300&text=Phụ+Nữ+Túi+Len+Vintage"
              alt="Bộ sưu tập 1"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">Xem Tất Cả</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src="/placeholder.svg?height=320&width=300&text=Túi+Len+Màu+Sắc"
              alt="Bộ sưu tập 2"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">Xem Tất Cả</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src="/placeholder.svg?height=320&width=300&text=Túi+Len+Boho"
              alt="Bộ sưu tập 3"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">Xem Tất Cả</span>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img
              src="/placeholder.svg?height=300&width=300&text=Túi+Len+Vàng+Đặc+Biệt"
              alt="Túi Len Vàng Đặc Biệt"
              className="w-full max-w-sm mx-auto"
            />
          </div>
          <div className="text-center lg:text-left space-y-6">
            <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto lg:mx-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bộ Sưu Tập - Vintage</h3>
              <p className="text-gray-600">
                Chúng tôi làm việc tỉ mỉ từng chi tiết với kỹ thuật đan len truyền thống. Đây là lợi thế lớn khi sử dụng
                những chất liệu bền vững và thân thiện với môi trường nhất.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            <div className="w-16 h-16 bg-pink-200 rounded-full mx-auto lg:mx-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-pink-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bộ Sưu Tập - Hiện Đại</h3>
              <p className="text-gray-600">
                Chúng tôi kết hợp phong cách hiện đại với kỹ thuật đan len truyền thống. Tạo ra những sản phẩm độc đáo
                với chất lượng cao nhất và thiết kế thời trang.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <img
              src="/placeholder.svg?height=300&width=300&text=Túi+Len+Xanh+Hiện+Đại"
              alt="Túi Len Xanh Hiện Đại"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
