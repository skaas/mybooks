/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is now stable in Next.js 14, no need for experimental flag
  
  // Vercel 배포 최적화
  output: 'standalone',
  
  // 이미지 최적화 (필요시)
  images: {
    domains: [], // 외부 이미지 도메인이 있다면 추가
  },
  
  // 환경 변수 검증
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
