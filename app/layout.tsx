import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'

const beVN = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yarnary – Túi Len Thủ Công',
  description: 'Thương hiệu túi len thủ công cao cấp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`flex flex-col min-h-screen overflow-x-hidden ${beVN.variable}`}>
        <Header />
        {/* phần cuộn sẽ do từng page quản lý */}
        <main className="flex-1 overflow-hidden w-full">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
