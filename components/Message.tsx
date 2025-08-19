'use client'

import { BookOpen, User, Bot } from 'lucide-react'
import BookRecommendation from './BookRecommendation'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  books?: BookRecommendationData[]
}

interface BookRecommendationData {
  title: string
  author: string
  reason: string
  summary?: string
}

interface MessageProps {
  message: ChatMessage
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-glow`}>
      <div className={`flex max-w-[85%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 md:space-x-3 ${isUser ? 'space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-bar-amber/20 border border-bar-amber/30' 
            : 'bg-bar-gold/20 border border-bar-gold/30'
        }`}>
          {isUser ? (
            <User size={16} className="text-bar-amber md:w-5 md:h-5" />
          ) : (
            <Bot size={16} className="text-bar-gold md:w-5 md:h-5" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
            isUser
              ? 'bg-bar-amber/20 border border-bar-amber/30 text-bar-amber'
              : 'bg-bar-warm/40 border border-bar-gold/20 text-bar-gold'
          } backdrop-blur-sm`}>
            <p className="text-sm md:text-base leading-relaxed font-serif whitespace-pre-wrap">
              {message.content}
            </p>
          </div>

          {/* Book Recommendations */}
          {message.books && message.books.length > 0 && (
            <div className="mt-3 md:mt-4 space-y-2 md:space-y-3 w-full">
              <div className="flex items-center space-x-2 text-bar-gold">
                <BookOpen size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="font-semibold text-sm md:text-base">추천 도서</span>
              </div>
              {message.books.map((book, index) => (
                <BookRecommendation key={index} book={book} />
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className="mt-1 text-xs text-bar-gold/50">
            {message.timestamp.toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
