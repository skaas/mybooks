'use client'

import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start message-glow">
      <div className="flex items-start space-x-3 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-bar-gold/20 border border-bar-gold/30">
          <Bot size={20} className="text-bar-gold" />
        </div>

        {/* Typing Animation */}
        <div className="bg-bar-warm/40 border border-bar-gold/20 backdrop-blur-sm px-4 py-3 rounded-2xl">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
