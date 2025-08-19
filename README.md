# MindBooks - 마음을 어루만져주는 책 추천 챗봇

바 분위기의 따뜻한 공간에서 당신의 마음을 이해하고, 딱 맞는 책을 추천해드리는 AI 북 큐레이터입니다.

## 🌟 주요 기능

- **공감적 대화**: 사용자의 감정과 상황을 깊이 있게 파악
- **개인화된 추천**: 최대 3권의 의미 있는 책 추천
- **SPARQL 기반 검색**: 온톨로지 지식그래프를 활용한 정확한 책 검색
- **바 분위기 UI**: 따뜻한 조명과 편안한 분위기의 채팅 인터페이스
- **반응형 디자인**: 모바일과 데스크톱 모두 최적화

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-5 (최신 reasoning 기능 활용)
- **Knowledge Graph**: SPARQL 쿼리를 통한 온톨로지 검색
- **Icons**: Lucide React

## 🚀 설치 및 실행

### 1. 프로젝트 클론 및 의존성 설치

```bash
cd mindbook
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# OpenAI API Key (필수)
OPENAI_API_KEY=your_openai_api_key_here

# SPARQL Endpoint (기본값이 설정되어 있음)
SPARQL_ENDPOINT=https://graphdb-on-railway-production-e50e.up.railway.app/repositories/booklist
```

**빠른 설정:** `./setup.sh` 스크립트를 실행하면 자동으로 설정됩니다:

```bash
./setup.sh
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📱 사용 방법

1. **대화 시작**: 현재의 감정이나 상황을 편하게 말씀해 주세요
2. **감정 파악**: AI가 당신의 마음을 이해하고 추가 질문을 할 수 있습니다
3. **책 검색**: SPARQL을 통해 온톨로지에서 관련 책들을 검색합니다
4. **개인화된 추천**: 최대 3권의 책을 개인화된 이유와 함께 추천받습니다

## 🎨 디자인 컨셉

- **바 분위기**: 어둡고 따뜻한 색조의 배경
- **황금빛 조명**: 바에서 느낄 수 있는 아늑한 조명 효과
- **부드러운 애니메이션**: 메시지와 타이핑 인디케이터의 자연스러운 애니메이션
- **반응형**: 모바일부터 데스크톱까지 모든 기기에서 최적화

## 🧠 GPT-5 AI 시스템

이 챗봇은 GPT-5의 최신 기능을 활용하여 프롬프트 기반으로 동작합니다:

- **Advanced Reasoning**: 높은 reasoning effort로 깊이 있는 감정 분석
- **SPARQL Query Generation**: GPT-5가 직접 온톨로지 쿼리를 생성하고 실행
- **Structured Decision Making**: JSON 형태의 구조화된 사고 과정
- **Fallback Strategies**: 검색 실패 시 자동으로 대안 전략 적용
- **Tool-based Architecture**: `run_sparql_query`, `ask_user`, `final_answer` 도구 활용

## 🔍 SPARQL 온톨로지

책 검색은 다음과 같은 온톨로지 구조를 기반으로 합니다:

- **감정 기반 검색**: 사용자의 감정에 맞는 책 찾기
- **장르 기반 검색**: 심리학, 자기계발, 에세이 등
- **시나리오 기반 검색**: 특정 상황에 맞는 책 추천
- **복합 검색**: 여러 조건을 조합한 정밀 검색

## 📂 프로젝트 구조

```
mindbook/
├── app/
│   ├── api/chat/route.ts    # 채팅 API 엔드포인트
│   ├── globals.css          # 글로벌 스타일
│   ├── layout.tsx           # 앱 레이아웃
│   └── page.tsx            # 메인 페이지
├── components/
│   ├── BarBackground.tsx    # 바 분위기 배경
│   ├── BookRecommendation.tsx # 책 추천 카드
│   ├── ChatInterface.tsx    # 채팅 인터페이스
│   ├── Message.tsx          # 메시지 컴포넌트
│   └── TypingIndicator.tsx  # 타이핑 인디케이터
├── lib/
│   ├── openai.ts           # OpenAI API 연동
│   └── sparql.ts           # SPARQL 쿼리 함수들
└── prompt.md               # AI 프롬프트 정의
```

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🚀 Vercel 배포

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### 빠른 배포 체크리스트

1. ✅ GitHub에 코드 업로드
2. ✅ Vercel에서 프로젝트 import
3. ✅ 환경 변수 설정:
   - `OPENAI_API_KEY`: OpenAI API 키
   - `SPARQL_ENDPOINT`: SPARQL 엔드포인트 URL
4. ✅ 배포 실행

## 🆘 문제 해결

### 로컬 개발 환경
- **OpenAI API 키**: `.env.local`에 올바른 API 키 설정 확인
- **SPARQL 연결**: 엔드포인트 접근 가능 여부 확인
- **스타일링**: Tailwind CSS 빌드 상태 확인

### Vercel 배포 문제
- **500 에러**: Vercel 대시보드에서 Function 로그 확인
- **환경 변수**: Production/Preview/Development 모든 환경에 설정
- **빌드 실패**: TypeScript 타입 에러 및 의존성 확인
- **타임아웃**: GPT-5 API 호출이 60초, Vercel 함수가 90초로 여유있게 설정됨

### 성능 최적화
- ✅ API 타임아웃 설정 (60초)
- ✅ SPARQL 쿼리 타임아웃 (30초)
- ✅ Vercel 함수 최대 실행 시간 (90초)
- ✅ 에러 핸들링 강화
- ✅ GPT-5 전용 최적화

---

💝 **MindBooks와 함께 마음을 치유하는 독서 여행을 시작해보세요!**

🌐 **배포 준비 완료**: Vercel에 바로 배포할 수 있도록 모든 설정이 최적화되었습니다.
# mybooks
