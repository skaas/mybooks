'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import ChatInterface from '@/components/ChatInterface'
import BarBackground from '@/components/BarBackground'
import HelpModal from '@/components/HelpModal'

export default function Home() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <main className="min-h-screen relative overflow-hidden">
      <BarBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Help Button */}
        <button
          onClick={() => setShowHelp(true)}
          className="absolute top-4 right-4 z-20 p-2 bg-bar-warm/30 hover:bg-bar-warm/50 border border-bar-gold/20 rounded-xl transition-all duration-200 group"
          title="도움말"
        >
          <HelpCircle size={20} className="text-bar-gold group-hover:text-bar-amber transition-colors duration-200" />
        </button>

        {/* Header */}
        <header className="text-center py-6 md:py-8 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bar-gold mb-2 font-serif">
            MindBooks
          </h1>
          <p className="text-base md:text-lg text-bar-amber opacity-90">
            마음을 어루만져주는 책을 찾아드립니다
          </p>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-bar-gold to-bar-amber mx-auto mt-3 md:mt-4 rounded"></div>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 px-4 pb-4">
          <ChatInterface />
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </main>
  )
}
