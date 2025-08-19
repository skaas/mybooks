'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <div className="w-8 h-8 border-2 border-bar-gold/30 rounded-full animate-spin border-t-bar-gold"></div>
        <div className="absolute inset-0 w-8 h-8 border-2 border-transparent rounded-full animate-pulse border-t-bar-amber/50"></div>
      </div>
    </div>
  )
}
