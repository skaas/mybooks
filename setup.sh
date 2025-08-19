#!/bin/bash

echo "🌟 MindBooks 설정을 시작합니다..."

# .env.local 파일이 없으면 생성
if [ ! -f .env.local ]; then
    echo "📝 환경 변수 파일을 생성합니다..."
    cp env.example .env.local
    echo "✅ .env.local 파일이 생성되었습니다."
    echo "⚠️  OpenAI API 키를 .env.local 파일에 입력해주세요."
else
    echo "✅ .env.local 파일이 이미 존재합니다."
fi

# 의존성 설치
echo "📦 의존성을 설치합니다..."
npm install

# 보안 취약점 수정
echo "🔒 보안 취약점을 수정합니다..."
npm audit fix --force

echo "🎉 설정이 완료되었습니다!"
echo ""
echo "다음 명령어로 개발 서버를 실행하세요:"
echo "npm run dev"
echo ""
echo "브라우저에서 http://localhost:3000 을 열어보세요!"
