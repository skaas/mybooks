'use client'

import { Book, Heart } from 'lucide-react'

interface BookRecommendationData {
  title: string
  author: string
  reason: string
  summary?: string
}

interface BookRecommendationProps {
  book: BookRecommendationData
}

export default function BookRecommendation({ book }: BookRecommendationProps) {
  return (
    <div className="bg-bar-warm/60 backdrop-blur-sm border border-bar-gold/30 rounded-xl p-3 md:p-4 bar-glow">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-bar-gold/20 rounded-lg flex items-center justify-center">
          <Book size={20} className="text-bar-gold md:w-6 md:h-6" />
        </div>
        
        <div className="flex-1 space-y-1.5 md:space-y-2">
          <div>
            <h3 className="text-base md:text-lg font-bold text-bar-gold font-serif">
              {book.title}
            </h3>
            <p className="text-bar-amber/80 text-xs md:text-sm">
              {book.author}
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <Heart size={14} className="text-bar-amber mt-0.5 flex-shrink-0 md:w-4 md:h-4" />
            <p className="text-bar-gold/90 text-xs md:text-sm leading-relaxed">
              {book.reason}
            </p>
          </div>
          
          {book.summary && (
            <div className="pt-1.5 md:pt-2 border-t border-bar-gold/20">
              <p className="text-bar-gold/70 text-xs md:text-sm italic">
                {book.summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
