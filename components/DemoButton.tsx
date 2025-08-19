'use client'

import { MessageCircle } from 'lucide-react'

interface DemoButtonProps {
  message: string
  onClick: (message: string) => void
}

export default function DemoButton({ message, onClick }: DemoButtonProps) {
  return (
    <button
      onClick={() => onClick(message)}
      className="flex items-center space-x-2 bg-bar-warm/20 hover:bg-bar-warm/40 border border-bar-gold/30 rounded-xl px-4 py-2 transition-all duration-200 group text-sm md:text-base"
    >
      <MessageCircle size={16} className="text-bar-gold group-hover:text-bar-amber transition-colors duration-200" />
      <span className="text-bar-gold group-hover:text-bar-amber transition-colors duration-200 font-serif">
        {message}
      </span>
    </button>
  )
}
