'use client'

import { X, Book, Heart, MessageCircle, Sparkles } from 'lucide-react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-bar-warm/90 backdrop-blur-md border border-bar-gold/30 rounded-2xl p-6 max-w-md w-full bar-glow">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-bar-gold font-serif">
            MindBooks 사용 가이드
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-bar-gold/20 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-bar-gold" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-bar-gold/90">
          <div className="flex items-start space-x-3">
            <MessageCircle size={20} className="text-bar-amber mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bar-gold mb-1">1. 마음을 나누세요</h3>
              <p className="text-sm">현재 느끼는 감정이나 상황을 편하게 말씀해 주세요.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Heart size={20} className="text-bar-amber mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bar-gold mb-1">2. 공감과 이해</h3>
              <p className="text-sm">AI가 당신의 마음을 깊이 이해하고 추가 질문을 할 수 있어요.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Sparkles size={20} className="text-bar-amber mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bar-gold mb-1">3. 지능형 검색</h3>
              <p className="text-sm">온톨로지 기반으로 당신에게 맞는 책을 정확하게 찾아드려요.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Book size={20} className="text-bar-amber mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bar-gold mb-1">4. 개인화된 추천</h3>
              <p className="text-sm">최대 3권의 책을 개인화된 이유와 함께 추천받으세요.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-bar-gold/20">
          <p className="text-xs text-bar-gold/70 text-center font-serif">
            💝 당신의 마음을 어루만져줄 책을 찾아드릴게요
          </p>
        </div>
      </div>
    </div>
  )
}
