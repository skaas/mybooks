'use client'

export default function BarBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bar-dark via-bar-wood to-bar-dark"></div>
      
      {/* Warm lighting effects - 주요 조명 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bar-gold opacity-4 rounded-full blur-3xl animate-slow-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-bar-amber opacity-6 rounded-full blur-3xl animate-slow-glow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-bar-gold opacity-3 rounded-full blur-3xl animate-slow-glow" style={{animationDelay: '4s'}}></div>
      
      {/* 추가 은은한 조명 효과 */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-bar-amber opacity-2 rounded-full blur-3xl animate-gentle-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-bar-gold opacity-1 rounded-full blur-3xl animate-slow-glow" style={{animationDelay: '6s'}}></div>
      <div className="absolute top-2/3 right-1/4 w-48 h-48 bg-bar-amber opacity-1 rounded-full blur-3xl animate-gentle-pulse" style={{animationDelay: '8s'}}></div>
      
      {/* 미묘한 배경 조명 */}
      <div className="absolute top-1/6 left-1/6 w-40 h-40 bg-bar-gold rounded-full blur-3xl animate-gentle-pulse" style={{opacity: '0.005', animationDelay: '10s'}}></div>
      <div className="absolute bottom-1/6 right-1/6 w-36 h-36 bg-bar-amber rounded-full blur-3xl animate-slow-glow" style={{opacity: '0.008', animationDelay: '7s'}}></div>
      
      {/* Wood texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
    </div>
  )
}
