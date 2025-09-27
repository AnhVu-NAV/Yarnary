"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Palette, Ruler, Heart, Star, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBagTypeSelect = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      bagType: type,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would upload these to a cloud storage service
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const customRequest = {
        ...formData,
        images: uploadedImages,
        submittedAt: new Date().toISOString(),
      }

      // Send custom request email
      const response = await fetch("/api/send-custom-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customRequest),
      })

      if (response.ok) {
        toast({
          title: "Yêu cầu đã được gửi!",
          description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để tư vấn chi tiết.",
        })

        // Reset form
        setFormData({
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
        setUploadedImages([])
      } else {
        throw new Error("Failed to send custom request")
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
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

        {/* Custom Request Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Form Yêu Cầu Thiết Kế</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Thông Tin Liên Hệ</h3>
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
                    <h3 className="text-lg font-semibold text-gray-900">Loại Túi Mong Muốn</h3>
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
                    <h3 className="text-lg font-semibold text-gray-900">Chi Tiết Thiết Kế</h3>

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
                        <Label htmlFor="colors">Màu sắc chủ đạo</Label>
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
                      <Label htmlFor="pattern">Họa tiết/Pattern</Label>
                      <Textarea
                        id="pattern"
                        name="pattern"
                        value={formData.pattern}
                        onChange={handleInputChange}
                        placeholder="Mô tả họa tiết bạn muốn: hoa, động vật, hình học..."
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
                    <h3 className="text-lg font-semibold text-gray-900">Hình Ảnh Tham Khảo</h3>
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

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Thông Tin Bổ Sung</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Ngân sách dự kiến</Label>
                        <Input
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="VD: 800.000 - 1.200.000₫"
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline">Thời gian mong muốn</Label>
                        <Input
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          placeholder="VD: 2-3 tuần"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inspiration">Nguồn cảm hứng</Label>
                      <Textarea
                        id="inspiration"
                        name="inspiration"
                        value={formData.inspiration}
                        onChange={handleInputChange}
                        placeholder="Chia sẻ câu chuyện, ý nghĩa đặc biệt bạn muốn gửi gắm vào chiếc túi..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes">Ghi chú thêm</Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder="Bất kỳ yêu cầu đặc biệt nào khác..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Khách Hàng Nói Gì</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Túi custom của Yarnary vượt quá mong đợi! Chất lượng tuyệt vời và đúng như ý tưởng tôi mô tả."
                  </p>
                  <div className="font-semibold text-gray-900">Nguyễn Thị Lan</div>
                  <div className="text-sm text-gray-600">Hà Nội</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Dịch vụ tư vấn rất chuyên nghiệp. Túi được làm tỉ mỉ từng chi tiết, rất đáng tiền!"
                  </p>
                  <div className="font-semibold text-gray-900">Trần Văn Minh</div>
                  <div className="text-sm text-gray-600">TP.HCM</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Tôi đã đặt túi hình con mèo cho con gái. Bé rất thích và túi rất bền, đẹp!"
                  </p>
                  <div className="font-semibold text-gray-900">Lê Thị Hoa</div>
                  <div className="text-sm text-gray-600">Đà Nẵng</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
