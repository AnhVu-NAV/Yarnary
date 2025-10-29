// File: app/custom/page.tsx (hoặc nơi chứa component CustomBagPage của bạn)
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Palette, Ruler, Heart, Star, Send, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"
import { BAG_MODELS, BagModelMeta } from "@/app/models/bags";

const BagViewer = dynamic(() => import('@/components/BagViewer'), { ssr: false });

export default function CustomBagPage() {
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        bagType: "",
        size: "",
        colors: "",
        pattern: "",
        specialFeatures: "",
        inspiration: "",
        budget: "",
        timeline: "",
        additionalNotes: "",
    })

    // 3D model
    const [selected, setSelected] = useState<BagModelMeta>(BAG_MODELS[0]);
    const [variantIndex, setVariantIndex] = useState(0);

    // --- THÊM MỚI: State cho tính năng AI ---
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    // --- Code cũ không đổi ---
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const bagTypes = [
        { id: "clutch", name: "Túi Clutch", price: "400.000 - 800.000₫" },
        { id: "fashion", name: "Túi Thời Trang", price: "600.000 - 1.200.000₫" },
        { id: "animal", name: "Túi Hình Thú", price: "500.000 - 1.000.000₫" },
        { id: "laptop", name: "Túi Laptop", price: "800.000 - 1.500.000₫" },
        { id: "casual", name: "Túi Casual", price: "550.000 - 1.100.000₫" },
        { id: "other", name: "Khác (theo yêu cầu)", price: "Báo giá riêng" },
    ]
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleBagTypeSelect = (type: string) => {
        setFormData((prev) => ({ ...prev, bagType: type }))
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
            setUploadedImages((prev) => [...prev, ...newImages])
        }
    }

    // --- THÊM MỚI: Hàm xử lý tạo ảnh AI ---
    const handleGeneratePreview = async () => {
        // Kiểm tra các trường cần thiết cho prompt
        if (!formData.bagType || !formData.colors) {
            toast({
                title: "Thiếu thông tin",
                description: "Vui lòng chọn Loại túi và điền Màu sắc chủ đạo để AI có thể tạo ảnh.",
                variant: "destructive",
            });
            return;
        }

        setIsGenerating(true);
        setGeneratedImage(null);

        try {
            const response = await fetch("/api/generate-bag-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            setGeneratedImage(data.generatedImageUrl);
            toast({
                title: "Tạo ảnh thành công!",
                description: "Đây là hình ảnh do AI tạo ra dựa trên mô tả của bạn.",
            });

        } catch (error) {
            toast({
                title: "Có lỗi xảy ra",
                description: "Không thể tạo ảnh AI lúc này. Vui lòng thử lại sau.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    // --- Code hàm handleSubmit cũ không đổi ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // ... logic gửi form của bạn giữ nguyên
    };

    return (
        <div className="min-h-screen bg-background">
            {/* ... Các section Hero, Process Steps giữ nguyên ... */}
            <main>
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thiết Kế Túi Len Theo Yêu Cầu</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tạo ra chiếc túi len độc nhất vô nhị theo ý tưởng của bạn. Đội ngũ nghệ nhân của chúng tôi sẽ biến ước mơ
                            thành hiện thực.
                        </p>
                    </div>
                </div>

                {/* 3D Bag Model Selection */}
                <main className="p-6 space-y-6">
                    <h1 className="text-3xl font-bold text-center mb-12">Preview Túi 3D</h1>

                    {/* 3D Viewer */}
                    <BagViewer model={selected} variantIndex={variantIndex} />

                    {/* Dot Switcher (nếu có nhiều variants) */}
                    {selected.variants && selected.variants.length > 1 && (
                        <div className="flex justify-center space-x-3 mt-3">
                            {selected.variants.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setVariantIndex(i)}
                                    className={`w-3 h-3 rounded-full transition ${
                                        variantIndex === i
                                            ? "bg-purple-600"
                                            : "bg-gray-300 hover:bg-purple-400"
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Danh sách các túi */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {BAG_MODELS.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => {
                                    setSelected(m);
                                    setVariantIndex(0);
                                }}
                                className={`flex items-center gap-3 rounded-lg border p-2 text-left transition ${
                                    selected.id === m.id
                                        ? "border-purple-600 bg-purple-50"
                                        : "border-gray-200 hover:border-purple-300"
                                }`}
                            >
                                <img
                                    src={m.thumb ?? "/placeholder.png"}
                                    alt={m.name}
                                    className="h-16 w-16 rounded object-cover"
                                />
                                <div>
                                    <div className="font-medium">{m.name}</div>
                                </div>
                            </button>
                        ))}
                    </section>
                </main>
                );

                {/* Process Steps */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Quy Trình Thiết Kế</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Gửi Yêu Cầu</h3>
                                <p className="text-gray-600">Điền form chi tiết về ý tưởng túi len của bạn</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Palette className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Tư Vấn Thiết Kế</h3>
                                <p className="text-gray-600">Nhận tư vấn và báo giá chi tiết từ chuyên gia</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Ruler className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Sản Xuất</h3>
                                <p className="text-gray-600">Nghệ nhân bắt đầu đan túi theo thiết kế đã duyệt</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-amber-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Giao Hàng</h3>
                                <p className="text-gray-600">Nhận sản phẩm hoàn thiện và độc nhất</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">Form Yêu Cầu Thiết Kế</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* --- THÊM MỚI: Khu vực hiển thị ảnh AI --- */}
                                <div className="mb-8 p-4 border-2 border-dashed border-purple-200 rounded-lg bg-purple-50">
                                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-4">Xem trước ý tưởng của bạn với AI</h3>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-full max-w-md h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                                            {isGenerating ? (
                                                <div className="text-center">
                                                    <Sparkles className="w-8 h-8 text-purple-500 animate-pulse mx-auto" />
                                                    <p className="text-gray-600 mt-2">AI đang vẽ, vui lòng chờ...</p>
                                                </div>
                                            ) : generatedImage ? (
                                                <img src={generatedImage} alt="AI Generated Bag Preview" className="w-full h-full object-contain rounded-lg"/>
                                            ) : (
                                                <div className="text-center text-gray-500">
                                                    <Palette className="w-8 h-8 mx-auto" />
                                                    <p className="mt-2">Ảnh xem trước sẽ hiện ở đây</p>
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleGeneratePreview}
                                            className="bg-purple-500 hover:bg-purple-600 text-white"
                                            disabled={isGenerating}
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            {isGenerating ? "Đang tạo ảnh..." : "Xem trước bằng AI"}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        Lưu ý: Ảnh do AI tạo chỉ mang tính chất tham khảo ý tưởng về màu sắc và họa tiết.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* ... Toàn bộ các trường input của form giữ nguyên ... */}
                                    {/* Customer Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">1. Thông Tin Liên Hệ</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="customerName">Họ và tên *</Label>
                                                <Input
                                                    id="customerName"
                                                    name="customerName"
                                                    value={formData.customerName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone">Số điện thoại *</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Bag Type Selection */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">2. Loại Túi Mong Muốn *</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {bagTypes.map((type) => (
                                                <div
                                                    key={type.id}
                                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                                        formData.bagType === type.id
                                                            ? "border-purple-600 bg-purple-50"
                                                            : "border-gray-200 hover:border-purple-300"
                                                    }`}
                                                    onClick={() => handleBagTypeSelect(type.id)}
                                                >
                                                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                                                    <p className="text-sm text-gray-600">{type.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Design Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">3. Chi Tiết Thiết Kế</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="size">Kích thước mong muốn</Label>
                                                <Input
                                                    id="size"
                                                    name="size"
                                                    value={formData.size}
                                                    onChange={handleInputChange}
                                                    placeholder="VD: 30cm x 20cm x 10cm"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="colors">Màu sắc chủ đạo *</Label>
                                                <Input
                                                    id="colors"
                                                    name="colors"
                                                    value={formData.colors}
                                                    onChange={handleInputChange}
                                                    placeholder="VD: Hồng pastel, xanh mint"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="pattern">Họa tiết/Kiểu đan</Label>
                                            <Textarea
                                                id="pattern"
                                                name="pattern"
                                                value={formData.pattern}
                                                onChange={handleInputChange}
                                                placeholder="Mô tả họa tiết: hoa, caro, hoặc kiểu đan: chunky, sọc..."
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="specialFeatures">Tính năng đặc biệt</Label>
                                            <Textarea
                                                id="specialFeatures"
                                                name="specialFeatures"
                                                value={formData.specialFeatures}
                                                onChange={handleInputChange}
                                                placeholder="VD: Nhiều ngăn, khóa kéo, quai đeo chéo..."
                                                rows={3}
                                            />
                                        </div>
                                    </div>

                                    {/* Inspiration Images */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">4. Hình Ảnh Tham Khảo (nếu có)</h3>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-600 mb-4">Tải lên hình ảnh tham khảo (tùy chọn)</p>
                                            <Input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="max-w-xs mx-auto"
                                            />
                                        </div>
                                        {uploadedImages.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {uploadedImages.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Reference ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* ... các field còn lại giữ nguyên ... */}

                                    <div className="text-center pt-8">
                                        <Button
                                            type="submit"
                                            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Đang gửi..." : "Gửi Yêu Cầu Thiết Kế"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 bg-white">
                    {/* ... phần testimonials giữ nguyên */}
                </section>

            </main>
        </div>
    )
}