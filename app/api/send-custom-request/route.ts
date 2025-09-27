import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs" // để chắc chắn không chạy edge runtime

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const customRequest = await request.json()

    const emailContent = `
      <h2>🎨 YÊU CẦU THIẾT KẾ TÚI LEN CUSTOM - YARNARY</h2>
      <p><b>Khách hàng:</b> ${customRequest.customerName}</p>
      <p><b>Email:</b> ${customRequest.email}</p>
      <p><b>SĐT:</b> ${customRequest.phone}</p>
      <h3>Chi tiết thiết kế</h3>
      <ul>
        <li><b>Loại túi:</b> ${customRequest.bagType}</li>
        <li><b>Kích thước:</b> ${customRequest.size || "Chưa xác định"}</li>
        <li><b>Màu sắc:</b> ${customRequest.colors || "Chưa xác định"}</li>
        <li><b>Họa tiết:</b> ${customRequest.pattern || "Chưa có"}</li>
        <li><b>Tính năng đặc biệt:</b> ${customRequest.specialFeatures || "Không có"}</li>
      </ul>
      <h3>Thông tin bổ sung</h3>
      <ul>
        <li><b>Ngân sách:</b> ${customRequest.budget || "Chưa xác định"}</li>
        <li><b>Thời gian:</b> ${customRequest.timeline || "Linh hoạt"}</li>
        <li><b>Nguồn cảm hứng:</b> ${customRequest.inspiration || "Không có"}</li>
        <li><b>Ghi chú:</b> ${customRequest.additionalNotes || "Không có"}</li>
      </ul>
      <p><b>Số ảnh tham khảo:</b> ${customRequest.images?.length || 0}</p>
      <hr/>
      <small>Yêu cầu được gửi lúc: ${new Date().toLocaleString("vi-VN")}</small>
    `

    // gửi cho team Yarnary
    await resend.emails.send({
      from: "Yarnary Custom <yarnary.custom@resend.dev>",
      to: [process.env.ORDER_TO_EMAIL || "yarnary.shop@gmail.com"],
      subject: `Yêu cầu custom mới từ ${customRequest.customerName}`,
      html: emailContent,
    })

    // gửi email xác nhận cho khách
    if (customRequest.email) {
      await resend.emails.send({
        from: "Yarnary Custom <custom@yarnary.vn>",
        to: [customRequest.email],
        subject: "✅ Xác nhận yêu cầu thiết kế túi len custom - Yarnary",
        text: `Chào ${customRequest.customerName},\n\nCảm ơn bạn đã gửi yêu cầu thiết kế túi len custom. Đội ngũ Yarnary sẽ liên hệ bạn trong 24h để tư vấn chi tiết.\n\nThân mến,\nYarnary.vn`,
      })
    }

    return NextResponse.json({ success: true, message: "Custom request sent successfully" })
  } catch (error: any) {
    console.error("Error sending custom request:", error)
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to send custom request" },
      { status: 500 }
    )
  }
}


// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const customRequest = await request.json()

//     // Create email content for custom bag request
//     const emailContent = `
//       YÊU CẦU THIẾT KẾ TÚI LEN CUSTOM - YARNARY
      
//       THÔNG TIN KHÁCH HÀNG:
//       - Họ tên: ${customRequest.customerName}
//       - Email: ${customRequest.email}
//       - Số điện thoại: ${customRequest.phone}
      
//       CHI TIẾT THIẾT KẾ:
//       - Loại túi: ${customRequest.bagType}
//       - Kích thước: ${customRequest.size || "Chưa xác định"}
//       - Màu sắc: ${customRequest.colors || "Chưa xác định"}
//       - Họa tiết: ${customRequest.pattern || "Chưa có yêu cầu cụ thể"}
//       - Tính năng đặc biệt: ${customRequest.specialFeatures || "Không có"}
      
//       THÔNG TIN BỔ SUNG:
//       - Ngân sách: ${customRequest.budget || "Chưa xác định"}
//       - Thời gian: ${customRequest.timeline || "Linh hoạt"}
//       - Nguồn cảm hứng: ${customRequest.inspiration || "Không có"}
//       - Ghi chú thêm: ${customRequest.additionalNotes || "Không có"}
      
//       SỐ LƯỢNG HÌNH ẢNH THAM KHẢO: ${customRequest.images?.length || 0}
      
//       ---
//       Yêu cầu được gửi lúc: ${new Date().toLocaleString("vi-VN")}
      
//       Vui lòng liên hệ khách hàng trong vòng 24 giờ để tư vấn chi tiết.
//     `

//     // Log the custom request (in production, you would send this via email service)
//     console.log("🎨 Custom Bag Request:")
//     console.log("Customer:", customRequest.customerName)
//     console.log("Email:", customRequest.email)
//     console.log("Bag Type:", customRequest.bagType)
//     console.log("Full Request:", emailContent)

//     // Simulate email sending delay
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     // Here you would integrate with your email service
//     // Example with Resend:
//     /*
//     import { Resend } from 'resend'
//     const resend = new Resend(process.env.RESEND_API_KEY)
    
//     await resend.emails.send({
//       from: 'custom@yarnary.com',
//       to: ['design@yarnary.com'],
//       subject: `Yêu cầu thiết kế custom - ${customRequest.customerName}`,
//       text: emailContent,
//     })
    
//     // Also send confirmation to customer
//     await resend.emails.send({
//       from: 'custom@yarnary.com',
//       to: [customRequest.email],
//       subject: 'Xác nhận yêu cầu thiết kế túi len custom - Yarnary',
//       text: `Chào ${customRequest.customerName},\n\nCảm ơn bạn đã gửi yêu cầu thiết kế túi len custom. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để tư vấn chi tiết.\n\nTrân trọng,\nĐội ngũ Yarnary`
//     })
//     */

//     return NextResponse.json({
//       success: true,
//       message: "Custom request sent successfully",
//     })
//   } catch (error) {
//     console.error("Error sending custom request:", error)
//     return NextResponse.json({ success: false, message: "Failed to send custom request" }, { status: 500 })
//   }
// }
