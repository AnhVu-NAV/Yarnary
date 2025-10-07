"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BagDesign {
  form: string
  primaryColor: string
  secondaryColor: string
  pattern: string
  features: string[]
}

interface BagForm {
  id: string
  name: string
  description: string
  basePrice: number
  svgPath: string
  dimensions: { width: number; height: number }
}

const bagForms: BagForm[] = [
  {
    id: "clutch",
    name: "Túi Clutch",
    description: "Túi cầm tay thanh lịch, phù hợp cho các dịp đặc biệt",
    basePrice: 450000,
    svgPath: "M20 8 L20 24 L4 24 L4 8 Q4 4 8 4 L16 4 Q20 4 20 8 Z M8 8 L16 8 L16 20 L8 20 Z",
    dimensions: { width: 200, height: 120 }
  },
  {
    id: "tote",
    name: "Túi Tote",
    description: "Túi tote đa năng, phù hợp cho công việc và du lịch",
    basePrice: 650000,
    svgPath: "M6 6 L26 6 L26 28 L6 28 Z M8 8 L24 8 L24 26 L8 26 Z M10 6 L10 4 L22 4 L22 6",
    dimensions: { width: 240, height: 180 }
  },
  {
    id: "crossbody",
    name: "Túi Đeo Chéo",
    description: "Túi đeo chéo tiện lợi, phù hợp cho hoạt động hàng ngày",
    basePrice: 580000,
    svgPath: "M8 12 L24 12 L24 24 L8 24 Z M10 14 L22 14 L22 22 L10 22 Z M16 12 L16 8 Q16 6 18 6 Q20 6 20 8",
    dimensions: { width: 200, height: 150 }
  },
  {
    id: "laptop",
    name: "Túi Laptop",
    description: "Túi laptop dạng sleeve với thiết kế sọc chunky, bảo vệ laptop an toàn",
    basePrice: 780000,
    svgPath: "M4 6 L28 6 L28 22 L4 22 Z M6 8 L26 8 L26 20 L6 20 Z",
    dimensions: { width: 320, height: 220 }
  },
  {
    id: "animal",
    name: "Túi Hình Thú",
    description: "Túi hình thú dễ thương, phù hợp cho trẻ em và người trẻ",
    basePrice: 520000,
    svgPath: "M16 4 Q20 4 22 8 L22 20 Q22 24 18 24 L14 24 Q10 24 10 20 L10 8 Q10 4 16 4 Z M14 8 L18 8 L18 20 L14 20 Z M12 12 L14 12 M18 12 L20 12",
    dimensions: { width: 180, height: 160 }
  }
]

const colorPalette = [
  { name: "Hồng Pastel", value: "#FFB6C1", hex: "#FFB6C1" },
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
  { name: "Đen Than", value: "#2F2F2F", hex: "#2F2F2F" }
]

const patterns = [
  { id: "solid", name: "Màu Đơn", description: "Màu đơn giản, tinh tế" },
  { id: "stripes", name: "Sọc", description: "Họa tiết sọc cổ điển" },
  { id: "dots", name: "Chấm Bi", description: "Chấm bi dễ thương" },
  { id: "flowers", name: "Hoa", description: "Họa tiết hoa nữ tính" },
  { id: "geometric", name: "Hình Học", description: "Họa tiết hình học hiện đại" },
  { id: "gradient", name: "Gradient", description: "Chuyển màu mượt mà" }
]

const features = [
  { id: "zipper", name: "Khóa Kéo", price: 50000 },
  { id: "pockets", name: "Nhiều Ngăn", price: 80000 },
  { id: "strap", name: "Quai Đeo", price: 60000 },
  { id: "lining", name: "Lót Bên Trong", price: 100000 },
  { id: "button", name: "Khuy Cài", price: 30000 }
]

export function BagDesigner() {
  const [currentDesign, setCurrentDesign] = useState<BagDesign>({
    form: "clutch",
    primaryColor: "#FFB6C1",
    secondaryColor: "#E6E6FA",
    pattern: "solid",
    features: []
  })
  
  const [selectedTab, setSelectedTab] = useState<"form" | "color" | "pattern" | "features">("form")
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const selectedForm = bagForms.find(form => form.id === currentDesign.form) || bagForms[0]

  const calculatePrice = () => {
    const basePrice = selectedForm.basePrice
    const featurePrice = currentDesign.features.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId)
      return total + (feature?.price || 0)
    }, 0)
    return basePrice + featurePrice
  }

  const drawBag = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas size based on zoom
    const scale = zoom
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw bag shadow
    ctx.save()
    ctx.globalAlpha = 0.3
    ctx.fillStyle = "#000000"
    ctx.fillRect(centerX - (selectedForm.dimensions.width * scale) / 2 + 5, 
                 centerY - (selectedForm.dimensions.height * scale) / 2 + 5, 
                 selectedForm.dimensions.width * scale, 
                 selectedForm.dimensions.height * scale)
    ctx.restore()

    // Draw bag based on pattern
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.scale(scale, scale)

    if (currentDesign.pattern === "solid") {
      ctx.fillStyle = currentDesign.primaryColor
    } else if (currentDesign.pattern === "gradient") {
      const gradient = ctx.createLinearGradient(-selectedForm.dimensions.width/2, 0, selectedForm.dimensions.width/2, 0)
      gradient.addColorStop(0, currentDesign.primaryColor)
      gradient.addColorStop(1, currentDesign.secondaryColor)
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = currentDesign.primaryColor
    }

    // Draw bag shape based on form
    ctx.beginPath()
    if (currentDesign.form === "clutch") {
      ctx.roundRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2, 
                   selectedForm.dimensions.width, selectedForm.dimensions.height, 10)
    } else if (currentDesign.form === "tote") {
      ctx.roundRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2, 
                   selectedForm.dimensions.width, selectedForm.dimensions.height, 5)
      // Draw handles
      ctx.fillStyle = currentDesign.secondaryColor
      ctx.fillRect(-selectedForm.dimensions.width/2 - 5, -selectedForm.dimensions.height/2 - 10, 10, 20)
      ctx.fillRect(selectedForm.dimensions.width/2 - 5, -selectedForm.dimensions.height/2 - 10, 10, 20)
    } else if (currentDesign.form === "crossbody") {
      ctx.roundRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2, 
                   selectedForm.dimensions.width, selectedForm.dimensions.height, 15)
      // Draw strap
      ctx.fillStyle = currentDesign.secondaryColor
      ctx.fillRect(-selectedForm.dimensions.width/2 - 5, -selectedForm.dimensions.height/2, 10, 30)
      ctx.fillRect(selectedForm.dimensions.width/2 - 5, -selectedForm.dimensions.height/2, 10, 30)
    } else if (currentDesign.form === "laptop") {
      // Draw laptop sleeve with rounded corners
      ctx.roundRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2, 
                   selectedForm.dimensions.width, selectedForm.dimensions.height, 8)
      
      // Draw striped pattern for laptop sleeve
      if (currentDesign.pattern === "stripes" || currentDesign.pattern === "solid") {
        const stripeHeight = selectedForm.dimensions.height / 4
        ctx.fillStyle = currentDesign.primaryColor
        ctx.fillRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2, 
                     selectedForm.dimensions.width, stripeHeight)
        
        ctx.fillStyle = currentDesign.secondaryColor
        ctx.fillRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2 + stripeHeight, 
                     selectedForm.dimensions.width, stripeHeight)
        
        ctx.fillStyle = currentDesign.primaryColor
        ctx.fillRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2 + stripeHeight * 2, 
                     selectedForm.dimensions.width, stripeHeight)
        
        ctx.fillStyle = currentDesign.secondaryColor
        ctx.fillRect(-selectedForm.dimensions.width/2, -selectedForm.dimensions.height/2 + stripeHeight * 3, 
                     selectedForm.dimensions.width, stripeHeight)
      }
    } else if (currentDesign.form === "animal") {
      // Draw animal shape (simplified)
      ctx.arc(0, 0, selectedForm.dimensions.width/2, 0, Math.PI * 2)
      // Draw ears
      ctx.fillStyle = currentDesign.secondaryColor
      ctx.beginPath()
      ctx.arc(-selectedForm.dimensions.width/4, -selectedForm.dimensions.height/3, 15, 0, Math.PI * 2)
      ctx.arc(selectedForm.dimensions.width/4, -selectedForm.dimensions.height/3, 15, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fill()

    // Draw pattern details
    if (currentDesign.pattern === "stripes") {
      ctx.strokeStyle = currentDesign.secondaryColor
      ctx.lineWidth = 2
      for (let i = -selectedForm.dimensions.height/2; i < selectedForm.dimensions.height/2; i += 10) {
        ctx.beginPath()
        ctx.moveTo(-selectedForm.dimensions.width/2, i)
        ctx.lineTo(selectedForm.dimensions.width/2, i)
        ctx.stroke()
      }
    } else if (currentDesign.pattern === "dots") {
      ctx.fillStyle = currentDesign.secondaryColor
      for (let x = -selectedForm.dimensions.width/2 + 20; x < selectedForm.dimensions.width/2; x += 20) {
        for (let y = -selectedForm.dimensions.height/2 + 20; y < selectedForm.dimensions.height/2; y += 20) {
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    ctx.restore()
  }

  useEffect(() => {
    drawBag()
  }, [currentDesign, zoom])

  const handleFormSelect = (formId: string) => {
    setCurrentDesign(prev => ({ ...prev, form: formId }))
  }

  const handleColorSelect = (color: string, type: "primary" | "secondary") => {
    setCurrentDesign(prev => ({
      ...prev,
      [type === "primary" ? "primaryColor" : "secondaryColor"]: color
    }))
  }

  const handlePatternSelect = (patternId: string) => {
    setCurrentDesign(prev => ({ ...prev, pattern: patternId }))
  }

  const handleFeatureToggle = (featureId: string) => {
    setCurrentDesign(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }))
  }


  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(0.5, Math.min(2, newZoom)))
  }

  const handleReset = () => {
    setCurrentDesign({
      form: "clutch",
      primaryColor: "#FFB6C1",
      secondaryColor: "#E6E6FA",
      pattern: "solid",
      features: []
    })
    setZoom(1)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `bag-design-${currentDesign.form}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    
    toast({
      title: "Đã tải xuống!",
      description: "Thiết kế túi của bạn đã được lưu.",
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thiết Kế Túi Len Của Bạn</h2>
        <p className="text-lg text-gray-600">Tạo ra chiếc túi len độc nhất với công cụ thiết kế 2D</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Design Canvas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Bản Thiết Kế</CardTitle>
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
              <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="border border-gray-200 rounded-lg bg-white shadow-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design Controls */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: "form", label: "Hình Dáng" },
              { id: "color", label: "Màu Sắc" },
              { id: "pattern", label: "Họa Tiết" },
              { id: "features", label: "Tính Năng" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                  selectedTab === tab.id
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Selection */}
          {selectedTab === "form" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chọn Hình Dáng Túi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bagForms.map((form) => (
                  <div
                    key={form.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      currentDesign.form === form.id
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => handleFormSelect(form.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{form.name}</h4>
                        <p className="text-sm text-gray-600">{form.description}</p>
                      </div>
                      <Badge variant="secondary">{form.basePrice.toLocaleString("vi-VN")}₫</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Color Selection */}
          {selectedTab === "color" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chọn Màu Sắc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Màu Chính</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalette.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => handleColorSelect(color.hex, "primary")}
                        className={`w-8 h-8 rounded-full border-2 ${
                          currentDesign.primaryColor === color.hex
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Màu Phụ</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalette.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => handleColorSelect(color.hex, "secondary")}
                        className={`w-8 h-8 rounded-full border-2 ${
                          currentDesign.secondaryColor === color.hex
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pattern Selection */}
          {selectedTab === "pattern" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chọn Họa Tiết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      currentDesign.pattern === pattern.id
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => handlePatternSelect(pattern.id)}
                  >
                    <h4 className="font-semibold text-gray-900">{pattern.name}</h4>
                    <p className="text-sm text-gray-600">{pattern.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Features Selection */}
          {selectedTab === "features" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tính Năng Bổ Sung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      currentDesign.features.includes(feature.id)
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                      </div>
                      <Badge variant="secondary">+{feature.price.toLocaleString("vi-VN")}₫</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tổng Giá</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá cơ bản:</span>
                  <span>{selectedForm.basePrice.toLocaleString("vi-VN")}₫</span>
                </div>
                {currentDesign.features.map((featureId) => {
                  const feature = features.find(f => f.id === featureId)
                  return feature ? (
                    <div key={featureId} className="flex justify-between">
                      <span className="text-gray-600">{feature.name}:</span>
                      <span>+{feature.price.toLocaleString("vi-VN")}₫</span>
                    </div>
                  ) : null
                })}
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
