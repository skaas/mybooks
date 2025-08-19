import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MindBooks - 당신을 위한 책 추천',
  description: '마음을 어루만져주는 책을 찾아드립니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
