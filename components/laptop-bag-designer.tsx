// components/ProductCustomizer.tsx
"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch" // Giả sử bạn có component Switch từ shadcn/ui

// --- Cấu hình sản phẩm ---

// 1. Định nghĩa các bộ phận có thể tùy chỉnh
const customizableParts = {
    body: { name: "Thân túi" },
    top: { name: "Miệng túi" },
    pouch: { name: "Túi nhỏ" },
    stitching: { name: "Đường chỉ viền" },
}

// 2. Định nghĩa bảng màu
// 'id' sẽ được dùng để tạo tên file ảnh, ví dụ: 'body-pink.png'
const colorOptions = [
    { id: "pink", name: "Hồng Pastel", hex: "#FFB6C1" },
    { id: "blue", name: "Xanh Da Trời", hex: "#87CEEB" },
    { id: "white", name: "Trắng", hex: "#FFFFFF" },
    { id: "mint", name: "Xanh Mint", hex: "#98FB98" },
    { id: "lavender", name: "Tím Lavender", hex: "#E6E6FA" },
]

// 3. Định nghĩa các phụ kiện
const accessories = {
    flower: { name: "Bông hoa trang trí", price: 50000 },
}

// 4. Giá cơ bản
const basePrice = 750000

// --- Component chính ---

export function ProductCustomizer() {
    // State để lưu tất cả các lựa chọn của người dùng
    const [selections, setSelections] = useState({
        body: "pink",
        top: "blue",
        pouch: "blue",
        stitching: "white",
        hasFlower: true,
    })

    // Hàm để cập nhật lựa chọn
    const handleSelectionChange = (part: string, value: string | boolean) => {
        setSelections(prev => ({
            ...prev,
            [part]: value,
        }))
    }

    // Hàm để tạo đường dẫn ảnh dựa trên lựa chọn
    // !! QUAN TRỌNG: Bạn cần tạo các file ảnh PNG nền trong suốt theo cấu trúc này
    // Ví dụ: public/images/bag/body-pink.png, public/images/bag/top-blue.png, ...
    const getImageUrl = (part: string, color: string) => {
        return `/images/bag/${part}-${color}.png`
    }

    // Tính toán tổng giá
    const calculateTotalPrice = () => {
        let total = basePrice
        if (selections.hasFlower) {
            total += accessories.flower.price
        }
        return total
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Tùy Chỉnh Túi Len Của Bạn</h2>
                <p className="text-lg text-muted-foreground mt-2">
                    Chọn màu sắc và phụ kiện để tạo ra chiếc túi độc nhất.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* === CỘT BÊN TRÁI: HIỂN THỊ HÌNH ẢNH === */}
                <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8 aspect-square sticky top-8">
                    <div className="relative w-full h-full">
                        {/* Đây là khu vực xếp chồng các lớp ảnh.
              Thứ tự render quyết định lớp nào nằm trên, lớp nào nằm dưới.
              Ví dụ: Thân túi -> Miệng túi -> Túi nhỏ -> Chỉ viền -> Hoa.
            */}
                        <img
                            src={getImageUrl("body", selections.body)}
                            alt="Thân túi"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                        <img
                            src={getImageUrl("top", selections.top)}
                            alt="Miệng túi"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                        <img
                            src={getImageUrl("pouch", selections.pouch)}
                            alt="Túi nhỏ"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                        <img
                            src={getImageUrl("stitching", selections.stitching)}
                            alt="Đường chỉ viền"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                        {selections.hasFlower && (
                            <img
                                // Phụ kiện có thể có nhiều phiên bản màu, hoặc chỉ 1
                                src="/images/bag/accessory-flower.png"
                                alt="Bông hoa"
                                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                            />
                        )}
                    </div>
                </div>

                {/* === CỘT BÊN PHẢI: BẢNG ĐIỀU KHIỂN === */}
                <div className="space-y-6">
                    {/* Lựa chọn màu sắc cho từng bộ phận */}
                    {Object.entries(customizableParts).map(([partKey, partDetails]) => (
                        <Card key={partKey}>
                            <CardHeader>
                                <CardTitle className="text-lg">{partDetails.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    {colorOptions.map(color => (
                                        <button
                                            key={color.id}
                                            title={color.name}
                                            onClick={() => handleSelectionChange(partKey, color.id)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                                                selections[partKey as keyof typeof selections] === color.id
                                                    ? "border-purple-600 scale-110 ring-2 ring-purple-600 ring-offset-2"
                                                    : "border-gray-300 hover:border-gray-500"
                                            }`}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Lựa chọn phụ kiện */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Phụ Kiện</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <h4 className="font-semibold">{accessories.flower.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Thêm điểm nhấn xinh xắn cho túi.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary">
                                        +{accessories.flower.price.toLocaleString("vi-VN")}₫
                                    </Badge>
                                    <Switch
                                        checked={selections.hasFlower}
                                        onCheckedChange={(checked) => handleSelectionChange("hasFlower", checked)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tổng kết giá */}
                    <Card className="bg-gray-50">
                        <CardHeader>
                            <CardTitle>Tổng Cộng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Túi cơ bản:</span>
                                    <span>{basePrice.toLocaleString("vi-VN")}₫</span>
                                </div>
                                {selections.hasFlower && (
                                    <div className="flex justify-between">
                                        <span>{accessories.flower.name}:</span>
                                        <span>+{accessories.flower.price.toLocaleString("vi-VN")}₫</span>
                                    </div>
                                )}
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-bold text-xl">
                                        <span>Thành tiền:</span>
                                        <span className="text-purple-600">
                      {calculateTotalPrice().toLocaleString("vi-VN")}₫
                    </span>
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