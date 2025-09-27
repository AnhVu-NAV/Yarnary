// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { ShoppingCart } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// interface PurchaseFormProps {
//   isOpen: boolean
//   onClose: () => void
//   product: {
//     id: string
//     name: string
//     price: number
//     image: string
//   }
// }

// export function PurchaseForm({ isOpen, onClose, product }: PurchaseFormProps) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     district: "",
//     ward: "",
//     quantity: 1,
//     notes: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       // Create email content
//       const emailContent = `
//         ĐƠN HÀNG MỚI TỪ YARNARY
        
//         THÔNG TIN SẢN PHẨM:
//         - Tên sản phẩm: ${product.name}
//         - Giá: ${product.price.toLocaleString("vi-VN")}₫
//         - Số lượng: ${formData.quantity}
//         - Tổng tiền: ${(product.price * formData.quantity).toLocaleString("vi-VN")}₫
        
//         THÔNG TIN KHÁCH HÀNG:
//         - Họ tên: ${formData.fullName}
//         - Email: ${formData.email}
//         - Số điện thoại: ${formData.phone}
//         - Địa chỉ: ${formData.address}
//         - Phường/Xã: ${formData.ward}
//         - Quận/Huyện: ${formData.district}
//         - Tỉnh/Thành phố: ${formData.city}
        
//         GHI CHÚ:
//         ${formData.notes || "Không có ghi chú"}
        
//         ---
//         Đơn hàng được tạo lúc: ${new Date().toLocaleString("vi-VN")}
//       `

//       // Send email using a service (this is a mock implementation)
//       const response = await fetch("/api/send-order-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           to: "orders@yarnary.com", // Replace with your actual email
//           subject: `Đơn hàng mới - ${product.name}`,
//           content: emailContent,
//           customerInfo: formData,
//           productInfo: product,
//         }),
//       })

//       if (response.ok) {
//         toast({
//           title: "Đặt hàng thành công!",
//           description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
//         })

//         // Reset form
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           address: "",
//           city: "",
//           district: "",
//           ward: "",
//           quantity: 1,
//           notes: "",
//         })

//         onClose()
//       } else {
//         throw new Error("Failed to send order")
//       }
//     } catch (error) {
//       toast({
//         title: "Có lỗi xảy ra",
//         description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const totalPrice = product.price * formData.quantity

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center space-x-2">
//             <ShoppingCart className="w-5 h-5" />
//             <span>Đặt Hàng</span>
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Product Summary */}
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-16 h-16 object-cover rounded-lg"
//               />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900">{product.name}</h3>
//                 <p className="text-purple-600 font-bold">{product.price.toLocaleString("vi-VN")}₫</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Label htmlFor="quantity">Số lượng:</Label>
//                 <Input
//                   id="quantity"
//                   name="quantity"
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={formData.quantity}
//                   onChange={handleInputChange}
//                   className="w-20"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mt-3 pt-3 border-t border-gray-200">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold">Tổng tiền:</span>
//                 <span className="text-xl font-bold text-purple-600">{totalPrice.toLocaleString("vi-VN")}₫</span>
//               </div>
//             </div>
//           </div>

//           {/* Customer Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900">Thông Tin Khách Hàng</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="fullName">Họ và tên *</Label>
//                 <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <Label htmlFor="phone">Số điện thoại *</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="address">Địa chỉ cụ thể *</Label>
//               <Input
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 placeholder="Số nhà, tên đường..."
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label htmlFor="ward">Phường/Xã *</Label>
//                 <Input id="ward" name="ward" value={formData.ward} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <Label htmlFor="district">Quận/Huyện *</Label>
//                 <Input id="district" name="district" value={formData.district} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <Label htmlFor="city">Tỉnh/Thành phố *</Label>
//                 <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
//               <Textarea
//                 id="notes"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleInputChange}
//                 placeholder="Yêu cầu đặc biệt, thời gian giao hàng..."
//                 rows={3}
//               />
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex space-x-4 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="flex-1 bg-transparent"
//               disabled={isSubmitting}
//             >
//               Hủy
//             </Button>
//             <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
//               {isSubmitting ? "Đang gửi..." : "Xác Nhận Đặt Hàng"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PurchaseFormProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export function PurchaseForm({ isOpen, onClose, product }: PurchaseFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    quantity: 1,
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const emailContent = `
ĐƠN HÀNG MỚI TỪ YARNARY

SẢN PHẨM:
- ${product.name}
- Giá: ${product.price.toLocaleString("vi-VN")}₫
- SL: ${formData.quantity}
- Tổng: ${(product.price * formData.quantity).toLocaleString("vi-VN")}₫

KHÁCH HÀNG:
- ${formData.fullName} / ${formData.phone} / ${formData.email}
- ${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}

GHI CHÚ:
${formData.notes || "-"}
      `.trim()

      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Có thể bỏ "to" để server lấy ORDER_TO_EMAIL từ ENV
          to: undefined,
          subject: `Đơn hàng mới - ${product.name}`,
          content: emailContent,
          customerInfo: formData,
          productInfo: product,
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        toast({ title: "Đặt hàng thành công!", description: "Chúng tôi sẽ liên hệ sớm." })
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          district: "",
          ward: "",
          quantity: 1,
          notes: "",
        })
        onClose()
      } else {
        throw new Error(data?.message || "Failed to send order")
      }
    } catch (error: any) {
      toast({ title: "Có lỗi xảy ra", description: error.message || "Vui lòng thử lại.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = product.price * (formData.quantity || 1)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Đặt Hàng</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-purple-600 font-bold">{product.price.toLocaleString("vi-VN")}₫</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="quantity">Số lượng:</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  max={10}
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-20"
                  required
                />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Tổng tiền:</span>
                <span className="text-xl font-bold text-purple-600">{totalPrice.toLocaleString("vi-VN")}₫</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Thông Tin Khách Hàng</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="address">Địa chỉ cụ thể *</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="ward">Phường/Xã *</Label>
                <Input id="ward" name="ward" value={formData.ward} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="district">Quận/Huyện *</Label>
                <Input id="district" name="district" value={formData.district} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Xác Nhận Đặt Hàng"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
