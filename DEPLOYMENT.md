# Vercel 배포 가이드

## 🚀 Vercel에 MindBooks 배포하기

### 1. 사전 준비

#### 필수 요구사항
- [Vercel 계정](https://vercel.com) (GitHub 연동 권장)
- [OpenAI API 키](https://platform.openai.com/api-keys) (GPT-5 접근 권한 필요)
- GitHub 리포지토리 (코드 업로드 완료)

### 2. GitHub에 코드 업로드

```bash
# Git 초기화 (아직 안했다면)
git init
git add .
git commit -m "Initial commit: MindBooks chatbot"

# GitHub 리포지토리 생성 후
git remote add origin https://github.com/your-username/mindbook.git
git branch -M main
git push -u origin main
```

### 3. Vercel 배포 단계

#### 3.1 Vercel 프로젝트 생성
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "New Project" 클릭
3. GitHub 리포지토리 선택 (mindbook)
4. "Import" 클릭

#### 3.2 프로젝트 설정
- **Framework Preset**: Next.js (자동 감지됨)
- **Root Directory**: `.` (기본값)
- **Build Command**: `npm run build` (자동 설정됨)
- **Output Directory**: `.next` (자동 설정됨)

#### 3.3 환경 변수 설정 ⚠️ **중요!**
배포 전에 반드시 환경 변수를 설정해야 합니다:

1. Vercel 프로젝트 설정에서 "Environment Variables" 탭 클릭
2. 다음 변수들 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `OPENAI_API_KEY` | `your_openai_api_key_here` | Production, Preview, Development |
| `SPARQL_ENDPOINT` | `https://graphdb-on-railway-production-e50e.up.railway.app/repositories/booklist` | Production, Preview, Development |

### 4. 배포 실행

1. "Deploy" 버튼 클릭
2. 빌드 과정 모니터링 (약 2-3분 소요)
3. 배포 완료 후 도메인 확인

### 5. 배포 후 확인사항

#### ✅ 체크리스트
- [ ] 웹사이트가 정상적으로 로드되는가?
- [ ] 바 분위기 UI가 올바르게 표시되는가?
- [ ] 채팅 입력이 가능한가?
- [ ] AI 응답이 정상적으로 오는가?
- [ ] 책 추천 기능이 작동하는가?
- [ ] 모바일에서도 잘 보이는가?

#### 🔧 문제 해결

**1. 500 Internal Server Error**
- Vercel 대시보드에서 "Functions" 탭 확인
- 로그에서 에러 메시지 확인
- 환경 변수가 올바르게 설정되었는지 확인

**2. OpenAI API 에러**
```
서비스 설정에 문제가 있습니다. 관리자에게 문의해 주세요.
```
→ `OPENAI_API_KEY` 환경 변수 확인 및 GPT-5 접근 권한 확인

**3. SPARQL 연결 에러**
- SPARQL 엔드포인트가 접근 가능한지 확인
- 네트워크 타임아웃 설정 확인

### 6. 도메인 설정 (선택사항)

#### 커스텀 도메인 연결
1. Vercel 프로젝트 설정 → "Domains" 탭
2. 도메인 추가 (예: `mindbooks.yourdomain.com`)
3. DNS 설정 업데이트

### 7. 성능 최적화

#### 권장 설정
- **Edge Runtime**: API 라우트에서 더 빠른 응답
- **Image Optimization**: 자동으로 활성화됨
- **Caching**: 정적 자산 자동 캐싱

### 8. 모니터링

#### Vercel Analytics (선택사항)
1. 프로젝트 설정 → "Analytics" 탭
2. 방문자 통계 및 성능 메트릭 확인

#### 로그 확인
- 실시간 로그: Vercel 대시보드 → "Functions" 탭
- 에러 추적: 각 함수 실행 로그 확인

### 9. 자동 배포 설정

GitHub에 푸시할 때마다 자동으로 배포되도록 설정됨:
- `main` 브랜치 → Production 배포
- 다른 브랜치 → Preview 배포

### 🚨 주의사항

1. **API 키 보안**: 환경 변수로만 관리, 코드에 하드코딩 금지
2. **타임아웃**: Vercel Hobby 플랜은 10초 제한 (Pro 플랜은 60초)
3. **대역폭**: 과도한 API 호출 시 요금 발생 가능
4. **CORS**: 필요시 추가 설정

### 📞 지원

배포 중 문제가 발생하면:
- [Vercel 문서](https://vercel.com/docs)
- [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)
- [Next.js 문서](https://nextjs.org/docs)
