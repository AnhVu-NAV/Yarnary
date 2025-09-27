"use client"

import { useState } from "react"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Trang Chủ" },
    { href: "/collections", label: "Bộ Sưu Tập" },
    { href: "/custom", label: "Thiết Kế Riêng" },
    { href: "/brands", label: "Thương Hiệu" },
    { href: "/values", label: "Giá Trị" },
    { href: "/popular", label: "Phổ Biến" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/faq", label: "FAQ" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">
              Yarnary
            </span>
            <span className="text-sm text-gray-600 hidden sm:inline whitespace-nowrap">
              Túi Len Thủ Công
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-nowrap items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap font-medium transition-colors ${
                    isActive
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="w-5 h-5" />
            </Button> */}
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 pb-4 border-t border-gray-200">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-2 py-2 rounded font-medium ${
                    isActive
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // auto đóng menu khi chọn
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}



// import { Search, ShoppingBag, User, Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"

// export function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">
//               Yarnary
//             </span>
//             <span className="text-sm text-gray-600 hidden sm:inline whitespace-nowrap">
//               Túi Len Thủ Công
//             </span>
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex flex-nowrap items-center space-x-8">
//             <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               Trang Chủ
//             </Link>
//             <Link href="/collections" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               Bộ Sưu Tập
//             </Link>
//             <Link href="/custom" className="text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap">
//               Thiết Kế Riêng
//             </Link>
//             <Link href="/brands" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               Thương Hiệu
//             </Link>
//             <Link href="/values" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               Giá Trị
//             </Link>
//             <Link href="/popular" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               Phổ Biến
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               Về Chúng Tôi
//             </Link>
//             <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
//               FAQ
//             </Link>
//           </nav>


//           {/* Search and Actions */}
//           <div className="flex items-center space-x-4">
//             <div className="hidden md:flex items-center">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search..."
//                   className="pl-10 w-64 bg-gray-50 border-gray-200"
//                 />
//               </div>
//             </div>
//             <Button variant="ghost" size="icon">
//               <User className="w-5 h-5" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <ShoppingBag className="w-5 h-5" />
//             </Button>
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Menu className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }


// import { Search, ShoppingBag, User, Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"

// export function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <div className="text-2xl font-bold text-gray-900">Yarnary</div>
//             <div className="text-sm text-gray-600 ml-2 hidden sm:block">Túi Len Thủ Công</div>
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
//               Trang Chủ
//             </Link>
//             <Link href="/collections" className="text-gray-700 hover:text-gray-900 font-medium">
//               Bộ Sưu Tập
//             </Link>
//             <Link href="/custom" className="text-purple-600 hover:text-purple-700 font-medium">
//               Thiết Kế Riêng
//             </Link>
//             <Link href="/brands" className="text-gray-700 hover:text-gray-900 font-medium">
//               Thương Hiệu
//             </Link>
//             <Link href="/values" className="text-gray-700 hover:text-gray-900 font-medium">
//               Giá Trị
//             </Link>
//             <Link href="/popular" className="text-gray-700 hover:text-gray-900 font-medium">
//               Phổ Biến
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
//               Về Chúng Tôi
//             </Link>
//             <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-medium">
//               FAQ
//             </Link>
//           </nav>

//           {/* Search and Actions */}
//           <div className="flex items-center space-x-4">
//             <div className="hidden md:flex items-center">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input placeholder="Search..." className="pl-10 w-64 bg-gray-50 border-gray-200" />
//               </div>
//             </div>
//             <Button variant="ghost" size="icon">
//               <User className="w-5 h-5" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <ShoppingBag className="w-5 h-5" />
//             </Button>
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Menu className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }
