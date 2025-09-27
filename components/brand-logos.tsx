export function BrandLogos() {
  const brands = [
    { name: "Etsy", logo: "/etsy-logo.jpg" },
    { name: "Pinterest", logo: "/placeholder.svg?height=40&width=120&text=Pinterest" },
    { name: "Instagram", logo: "/placeholder.svg?height=40&width=120&text=Instagram" },
    { name: "Facebook", logo: "/placeholder.svg?height=40&width=120&text=Facebook" },
    { name: "Shopee", logo: "/placeholder.svg?height=40&width=120&text=Shopee" },
    { name: "Lazada", logo: "/placeholder.svg?height=40&width=120&text=Lazada" },
    { name: "Tiki", logo: "/placeholder.svg?height=40&width=120&text=Tiki" },
    { name: "Sendo", logo: "/placeholder.svg?height=40&width=120&text=Sendo" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Được Hỗ Trợ Bởi</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {brands.map((brand) => (
            <div key={brand.name} className="flex justify-center">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
