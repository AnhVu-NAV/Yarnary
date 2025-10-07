"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RotateCcw, ZoomIn, ZoomOut, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LaptopBagDesign {
  topColor: string
  bodyColor: string
  smallPouchColor: string
  hasSmallPouch: boolean
  hasStrap: boolean
  pattern: "chunky" | "smooth" | "ribbed"
}

const colorPalette = [
  { name: "Xanh Nhạt", value: "#87CEEB", hex: "#87CEEB" },
  { name: "Hồng Nhạt", value: "#FFB6C1", hex: "#FFB6C1" },
  { name: "Xanh Mint", value: "#98FB98", hex: "#98FB98" },
  { name: "Tím Lavender", value: "#E6E6FA", hex: "#E6E6FA" },
  { name: "Vàng Kem", value: "#FFF8DC", hex: "#FFF8DC" },
  { name: "Xanh Navy", value: "#191970", hex: "#191970" },
  { name: "Đỏ Đậm", value: "#8B0000", hex: "#8B0000" },
  { name: "Xanh Lá", value: "#228B22", hex: "#228B22" },
  { name: "Cam San Hô", value: "#FF7F50", hex: "#FF7F50" },
  { name: "Xám Xanh", value: "#708090", hex: "#708090" },
  { name: "Nâu Đất", value: "#8B4513", hex: "#8B4513" },
  { name: "Trắng Tuyết", value: "#FFFAFA", hex: "#FFFAFA" },
  { name: "Đen Than", value: "#2F2F2F", hex: "#2F2F2F" },
  { name: "Be", value: "#F5F5DC", hex: "#F5F5DC" },
  { name: "Xanh Dương", value: "#4169E1", hex: "#4169E1" }
]

export function LaptopBagDesigner() {
  const [currentDesign, setCurrentDesign] = useState<LaptopBagDesign>({
    topColor: "#FFB6C1", // Pink
    bodyColor: "#87CEEB", // Light blue
    smallPouchColor: "#FFB6C1", // Pink
    hasSmallPouch: true,
    hasStrap: false,
    pattern: "chunky"
  })
  
  const [selectedColorZone, setSelectedColorZone] = useState<"top" | "body" | "pouch">("top")
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const basePrice = 780000
  const smallPouchPrice = 150000
  const strapPrice = 80000

  const calculatePrice = () => {
    let total = basePrice
    if (currentDesign.hasSmallPouch) total += smallPouchPrice
    if (currentDesign.hasStrap) total += strapPrice
    return total
  }

  const drawLaptopBag = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const scale = zoom

    // Draw shadow
    ctx.save()
    ctx.globalAlpha = 0.2
    ctx.fillStyle = "#000000"
    ctx.fillRect(centerX - 160 * scale + 8, centerY - 110 * scale + 8, 320 * scale, 220 * scale)
    ctx.restore()

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.scale(scale, scale)

    // Main laptop sleeve dimensions
    const sleeveWidth = 320
    const sleeveHeight = 220
    const topSectionHeight = 60
    const bodySectionHeight = sleeveHeight - topSectionHeight

    // Draw main sleeve body (light blue section)
    ctx.fillStyle = currentDesign.bodyColor
    ctx.beginPath()
    ctx.roundRect(-sleeveWidth/2, -sleeveHeight/2 + topSectionHeight, sleeveWidth, bodySectionHeight, 12)
    ctx.fill()

    // Draw top section (pink section)
    ctx.fillStyle = currentDesign.topColor
    ctx.beginPath()
    ctx.roundRect(-sleeveWidth/2, -sleeveHeight/2, sleeveWidth, topSectionHeight, 12)
    ctx.fill()

    // Add texture pattern
    if (currentDesign.pattern === "chunky") {
      // Draw chunky crochet texture
      ctx.strokeStyle = "rgba(0,0,0,0.1)"
      ctx.lineWidth = 1
      
      // Horizontal lines for chunky effect
      for (let y = -sleeveHeight/2; y < sleeveHeight/2; y += 8) {
        ctx.beginPath()
        ctx.moveTo(-sleeveWidth/2 + 5, y)
        ctx.lineTo(sleeveWidth/2 - 5, y)
        ctx.stroke()
      }
      
      // Vertical lines for chunky effect
      for (let x = -sleeveWidth/2; x < sleeveWidth/2; x += 12) {
        ctx.beginPath()
        ctx.moveTo(x, -sleeveHeight/2 + 5)
        ctx.lineTo(x, sleeveHeight/2 - 5)
        ctx.stroke()
      }
    }

    // Draw small pouch if enabled
    if (currentDesign.hasSmallPouch) {
      const pouchWidth = 120
      const pouchHeight = 80
      const pouchX = sleeveWidth/2 - 20
      const pouchY = -sleeveHeight/2 + 20

      // Pouch shadow
      ctx.save()
      ctx.globalAlpha = 0.3
      ctx.fillStyle = "#000000"
      ctx.fillRect(pouchX + 3, pouchY + 3, pouchWidth, pouchHeight)
      ctx.restore()

      // Main pouch body
      ctx.fillStyle = currentDesign.smallPouchColor
      ctx.beginPath()
      ctx.roundRect(pouchX, pouchY, pouchWidth, pouchHeight, 8)
      ctx.fill()

      // Pouch opening
      ctx.fillStyle = "rgba(0,0,0,0.1)"
      ctx.fillRect(pouchX + 10, pouchY + 10, pouchWidth - 20, 15)

      // Add texture to pouch
      if (currentDesign.pattern === "chunky") {
        ctx.strokeStyle = "rgba(0,0,0,0.1)"
        ctx.lineWidth = 1
        for (let y = pouchY; y < pouchY + pouchHeight; y += 6) {
          ctx.beginPath()
          ctx.moveTo(pouchX + 5, y)
          ctx.lineTo(pouchX + pouchWidth - 5, y)
          ctx.stroke()
        }
      }

      // IZZA COZY label simulation
      ctx.fillStyle = "#F5F5DC"
      ctx.fillRect(pouchX + 15, pouchY + 25, 60, 20)
      ctx.fillStyle = "#000000"
      ctx.font = "bold 8px Arial"
      ctx.textAlign = "center"
      ctx.fillText("IZZA COZY", pouchX + 45, pouchY + 37)
    }

    // Draw strap if enabled
    if (currentDesign.hasStrap) {
      ctx.strokeStyle = currentDesign.topColor
      ctx.lineWidth = 8
      ctx.lineCap = "round"
      
      // Strap from top left
      ctx.beginPath()
      ctx.moveTo(-sleeveWidth/2 - 10, -sleeveHeight/2 + 30)
      ctx.lineTo(-sleeveWidth/2 - 50, -sleeveHeight/2 - 20)
      ctx.stroke()
      
      // Strap from top right
      ctx.beginPath()
      ctx.moveTo(sleeveWidth/2 + 10, -sleeveHeight/2 + 30)
      ctx.lineTo(sleeveWidth/2 + 50, -sleeveHeight/2 - 20)
      ctx.stroke()
    }

    ctx.restore()
  }

  useEffect(() => {
    drawLaptopBag()
  }, [currentDesign, zoom])

  const handleColorSelect = (color: string) => {
    setCurrentDesign(prev => ({
      ...prev,
      [selectedColorZone === "top" ? "topColor" : 
       selectedColorZone === "body" ? "bodyColor" : "smallPouchColor"]: color
    }))
  }

  const handleToggle = (option: "hasSmallPouch" | "hasStrap") => {
    setCurrentDesign(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const handlePatternChange = (pattern: "chunky" | "smooth" | "ribbed") => {
    setCurrentDesign(prev => ({ ...prev, pattern }))
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(0.5, Math.min(2, newZoom)))
  }

  const handleReset = () => {
    setCurrentDesign({
      topColor: "#FFB6C1",
      bodyColor: "#87CEEB",
      smallPouchColor: "#FFB6C1",
      hasSmallPouch: true,
      hasStrap: false,
      pattern: "chunky"
    })
    setZoom(1)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `laptop-bag-design-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    
    toast({
      title: "Đã tải xuống!",
      description: "Thiết kế túi laptop của bạn đã được lưu.",
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thiết Kế Túi Laptop Len</h2>
        <p className="text-lg text-gray-600">Tạo ra chiếc túi laptop len độc nhất với thiết kế chuyên nghiệp</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Design Canvas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Bản Thiết Kế
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoomChange(zoom - 0.1)}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoomChange(zoom + 0.1)}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={400}
                  className="border border-gray-200 rounded-lg bg-white shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design Controls */}
        <div className="space-y-6">
          {/* Color Zone Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chọn Vùng Màu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "top", label: "Phần Đầu Túi", color: currentDesign.topColor },
                { id: "body", label: "Thân Túi", color: currentDesign.bodyColor },
                { id: "pouch", label: "Túi Nhỏ", color: currentDesign.smallPouchColor, disabled: !currentDesign.hasSmallPouch }
              ].map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => !zone.disabled && setSelectedColorZone(zone.id as any)}
                  disabled={zone.disabled}
                  className={`w-full p-3 border-2 rounded-lg transition-colors flex items-center gap-3 ${
                    selectedColorZone === zone.id
                      ? "border-purple-600 bg-purple-50"
                      : zone.disabled
                      ? "border-gray-200 bg-gray-50 opacity-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span className="font-medium">{zone.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bảng Màu Len</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {colorPalette.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleColorSelect(color.hex)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      (selectedColorZone === "top" && currentDesign.topColor === color.hex) ||
                      (selectedColorZone === "body" && currentDesign.bodyColor === color.hex) ||
                      (selectedColorZone === "pouch" && currentDesign.smallPouchColor === color.hex)
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    } transition-all`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pattern Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kiểu Đan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "chunky", name: "Chunky", description: "Đan dày, nổi bật" },
                { id: "smooth", name: "Mịn", description: "Đan mịn, tinh tế" },
                { id: "ribbed", name: "Sọc Dọc", description: "Sọc dọc cổ điển" }
              ].map((pattern) => (
                <div
                  key={pattern.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    currentDesign.pattern === pattern.id
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => handlePatternChange(pattern.id as any)}
                >
                  <h4 className="font-semibold text-gray-900">{pattern.name}</h4>
                  <p className="text-sm text-gray-600">{pattern.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tùy Chọn Bổ Sung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border-2 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Túi Nhỏ</h4>
                  <p className="text-sm text-gray-600">Túi nhỏ để đựng phụ kiện</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">+{smallPouchPrice.toLocaleString("vi-VN")}₫</Badge>
                  <Button
                    variant={currentDesign.hasSmallPouch ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggle("hasSmallPouch")}
                  >
                    {currentDesign.hasSmallPouch ? "Có" : "Không"}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border-2 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Dây Đeo</h4>
                  <p className="text-sm text-gray-600">Dây đeo vai tiện lợi</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">+{strapPrice.toLocaleString("vi-VN")}₫</Badge>
                  <Button
                    variant={currentDesign.hasStrap ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggle("hasStrap")}
                  >
                    {currentDesign.hasStrap ? "Có" : "Không"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tổng Giá</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Túi laptop cơ bản:</span>
                  <span>{basePrice.toLocaleString("vi-VN")}₫</span>
                </div>
                {currentDesign.hasSmallPouch && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Túi nhỏ:</span>
                    <span>+{smallPouchPrice.toLocaleString("vi-VN")}₫</span>
                  </div>
                )}
                {currentDesign.hasStrap && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dây đeo:</span>
                    <span>+{strapPrice.toLocaleString("vi-VN")}₫</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-purple-600">{calculatePrice().toLocaleString("vi-VN")}₫</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}








