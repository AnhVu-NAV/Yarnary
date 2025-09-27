import { Facebook, Instagram } from "lucide-react"
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Yarnary</h3>
            <p className="text-gray-400 text-sm">Túi len thủ công cao cấp và phụ kiện cho phong cách sống hiện đại.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Bộ Sưu Tập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Thương Hiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Về Chúng Tôi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Giao Hàng & Đổi Trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Hướng Dẫn Size
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Bảo Quản Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Theo Dõi Chúng Tôi</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/yarnary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/yarnary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@yarnary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 2c1.2 0 2.4.4 3.4 1.1.4 2.4 2.3 4.2 4.6 4.6v3.1c-1.7 0-3.3-.5-4.6-1.5v6.6c0 3.7-3 6.6-6.6 6.6S2.2 19.7 2.2 16s3-6.6 6.6-6.6c.4 0 .8 0 1.1.1v3.4c-.3-.1-.7-.2-1.1-.2-1.7 0-3.1 1.4-3.1 3.2s1.4 3.2 3.1 3.2 3.1-1.4 3.1-3.2V2h2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Yarnary. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
