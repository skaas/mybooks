'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, BookOpen } from 'lucide-react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import DemoButton from './DemoButton'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  books?: BookRecommendation[]
}

interface BookRecommendation {
  title: string
  author: string
  reason: string
  summary?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 저는 마인드북스의 북 큐레이터입니다. 🍷\n\n오늘 어떤 마음으로 이곳에 오셨나요? 현재의 감정이나 상황을 편하게 말씀해 주시면, 당신에게 꼭 맞는 책을 찾아드릴게요.',
      timestamp: new Date(),
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastSentAt, setLastSentAt] = useState<number>(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    // 1) 클라이언트 입력 길이 제한
    if (inputMessage.length > 1000) {
      setMessages(prev => [...prev, {
        id: (Date.now()).toString(),
        role: 'assistant',
        content: '메시지가 너무 길어요. 핵심만 간단히 적어주실 수 있을까요? (1000자 이내)',
        timestamp: new Date(),
      }])
      return
    }

    // 2) 전송 쿨다운 (rate limit – 2초)
    const now = Date.now()
    if (now - lastSentAt < 2000) {
      return
    }
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setLastSentAt(now)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        books: data.books || [],
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleDemoClick = (demoMessage: string) => {
    if (!isLoading) {
      setInputMessage(demoMessage)
      // 자동으로 전송하지 않고 사용자가 확인할 수 있도록 함
    }
  }

  const demoMessages = [
    "요즘 너무 불안해서 잠이 안 와요",
    "이별 후 마음이 너무 아파요",
    "새로운 시작을 위한 용기가 필요해요",
    "자존감이 낮아서 힘들어요"
  ]

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Demo Buttons - 처음 메시지만 있을 때만 표시 */}
      {messages.length === 1 && (
        <div className="mb-4 px-2 md:px-4">
          <p className="text-bar-gold/70 text-sm mb-3 font-serif">
            💡 이런 이야기로 시작해보세요:
          </p>
          <div className="flex flex-wrap gap-2">
            {demoMessages.map((msg, index) => (
              <DemoButton 
                key={index}
                message={msg}
                onClick={handleDemoClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 px-2 md:px-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-bar-warm/30 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-bar-gold/20 bar-glow mx-2 md:mx-0">
        <div className="flex items-end space-x-2 md:space-x-3">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="마음을 편하게 말씀해 주세요..."
              className="w-full bg-transparent text-bar-gold placeholder-bar-gold/60 border-none outline-none text-base md:text-lg resize-none font-serif"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 md:p-3 bg-bar-gold/20 hover:bg-bar-gold/30 disabled:bg-bar-gold/10 disabled:cursor-not-allowed rounded-xl transition-all duration-200 group candlelight-effect"
          >
            <Send 
              size={18} 
              className="text-bar-gold group-hover:text-bar-amber transition-colors duration-200 md:w-5 md:h-5" 
            />
          </button>
        </div>
      </div>
    </div>
  )
}
