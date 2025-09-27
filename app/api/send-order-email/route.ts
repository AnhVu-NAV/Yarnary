import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Đảm bảo dùng runtime Node (không phải edge)
export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)
const ORDER_TO_EMAIL = process.env.ORDER_TO_EMAIL || "yarnary.shop@gmail.com"
// Nếu CHƯA verify domain trên Resend, tạm dùng từ địa chỉ này:
const DEFAULT_FROM = process.env.ORDER_FROM_EMAIL || "yarnary@resend.dev"
// Khi đã verify domain: dùng "orders@yarnary.vn" hoặc tương tự

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, content, customerInfo, productInfo } = body || {}

    // ✅ Validate tối thiểu
    if (!subject || !customerInfo?.fullName || !customerInfo?.phone) {
      return NextResponse.json({ success: false, message: "Thiếu dữ liệu bắt buộc." }, { status: 400 })
    }

    // Người nhận: ưu tiên body.to, fallback về ENV
    const toEmail = (to && typeof to === "string") ? to : ORDER_TO_EMAIL

    // HTML đơn giản (bạn có thể thay bằng template đẹp)
    const html = `
      <h2>ĐƠN HÀNG MỚI TỪ YARNARY</h2>
      <p><b>Thời gian:</b> ${new Date().toLocaleString("vi-VN")}</p>
      <hr/>
      <h3>Thông tin khách hàng</h3>
      <p>
        Họ tên: <b>${customerInfo?.fullName || "-"}</b><br/>
        Email: ${customerInfo?.email || "-"}<br/>
        SĐT: <b>${customerInfo?.phone || "-"}</b><br/>
        Địa chỉ: ${customerInfo?.address || "-"}, ${customerInfo?.ward || "-"}, ${customerInfo?.district || "-"}, ${customerInfo?.city || "-"}<br/>
        Ghi chú: ${customerInfo?.notes || "-"}
      </p>
      <h3>Sản phẩm</h3>
      <p>
        Tên: <b>${productInfo?.name || "-"}</b><br/>
        Giá: ${(productInfo?.price ?? 0).toLocaleString("vi-VN")}₫<br/>
        Số lượng: ${customerInfo?.quantity ?? 1}<br/>
        Tổng: ${((productInfo?.price ?? 0) * (customerInfo?.quantity ?? 1)).toLocaleString("vi-VN")}₫
      </p>
      <hr/>
      <pre style="font-size:12px;color:#666;background:#fafafa;padding:8px;border:1px solid #eee;border-radius:8px;">
${content || ""}
      </pre>
    `

    const result = await resend.emails.send({
      from: `Yarnary <${DEFAULT_FROM}>`,
      to: [toEmail],
      subject: subject,
      html,
      // text: content, // có thể thêm text thuần nếu muốn
    })

    if (result.error) {
      return NextResponse.json({ success: false, message: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: result.data?.id || null })
  } catch (error: any) {
    console.error("Error sending order email:", error)
    return NextResponse.json({ success: false, message: error?.message || "Failed to send email" }, { status: 500 })
  }
}


// import { type NextRequest, NextResponse } from "next/server"
// import { Resend } from 'resend'

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { to, subject, content, customerInfo, productInfo } = body

//     // In a real application, you would use a service like:
//     // - Resend
//     // - SendGrid
//     // - Nodemailer with SMTP
//     // - AWS SES

//     // For now, we'll simulate sending an email
//     console.log("📧 Order Email Details:")
//     console.log("To:", to)
//     console.log("Subject:", subject)
//     console.log("Content:", content)
//     console.log("Customer:", customerInfo)
//     console.log("Product:", productInfo)

//     // Simulate email sending delay
//     await new Promise((resolve) => setTimeout(resolve, 1000))
    

//     // Here you would integrate with your email service
//     // Example with Resend:
  
//     const resend = new Resend(process.env.RESEND_API_KEY)
    
//     await resend.emails.send({
//       from: 'orders@yarnary.com',
//       to: [to],
//       subject: subject,
//       text: content,
//     })


//     return NextResponse.json({
//       success: true,
//       message: "Order email sent successfully",
//     })
//   } catch (error) {
//     console.error("Error sending order email:", error)
//     return NextResponse.json({ success: false, message: "Failed to send order email" }, { status: 500 })
//   }
// }
