# 🏪 충청전통시장 맵 (Chungcheong Market Map)

> 충청남도 전통시장의 디지털 지도를 통해 상인과 소비자를 연결하는 혁신적인 플랫폼

![충청전통시장 맵](./src/assets/chungcheong-connect-logo.png)

## 📖 프로젝트 개요

충청전통시장 맵은 충청남도 지역의 전통시장과 상인들을 디지털로 연결하는 웹 애플리케이션입니다. 카카오맵 API를 활용하여 실제 지도 위에 시장 위치와 상인 정보를 표시하고, 상인 등록 및 관리 기능을 제공합니다.

### 🎯 주요 기능

- **🗺️ 인터랙티브 지도**: 카카오맵을 활용한 실시간 시장 위치 표시
- **🏪 상인 정보 관리**: 상인 등록, 수정, 삭제 기능
- **📍 지역별 필터링**: 충청남도 각 지역별 시장 및 상인 정보 조회
- **📱 반응형 디자인**: 모바일과 데스크톱 모두 지원
- **🔐 상인 인증 시스템**: 비밀번호 기반 상인 인증
- **📊 실시간 데이터**: Supabase를 통한 실시간 데이터 동기화

## 🛠️ 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성을 위한 정적 타입 언어
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성이 뛰어난 UI 컴포넌트
- **React Router DOM** - 클라이언트 사이드 라우팅

### Backend & Database
- **Supabase** - 실시간 데이터베이스 및 인증 서비스
- **PostgreSQL** - 관계형 데이터베이스

### External APIs
- **Kakao Maps JavaScript API** - 지도 서비스
- **Kakao Places API** - 장소 검색 서비스

### Development Tools
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Git** - 버전 관리

## 🚀 시작하기

### 필수 요구사항

- **Node.js** (v16 이상)
- **npm** 또는 **yarn**
- **카카오 개발자 계정** 및 **JavaScript API 키**

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/chungcheong-market-map.git
   cd chungcheong-market-map
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경변수 설정**
   ```bash
   cp .env.example .env
   ```
   
   `.env` 파일을 열어 다음 내용을 설정합니다:
   ```env
   VITE_KAKAO_API_KEY=your_kakao_api_key_here
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

5. **브라우저에서 확인**
   - http://localhost:5173 에서 애플리케이션을 확인할 수 있습니다.

### 카카오맵 API 키 발급 방법

1. [카카오 개발자 센터](https://developers.kakao.com) 접속
2. 카카오 계정으로 로그인
3. "내 애플리케이션" → "애플리케이션 추가하기"
4. 애플리케이션 정보 입력 후 생성
5. "플랫폼" → "Web 플랫폼 등록"
6. 사이트 도메인 등록 (예: `http://localhost:5173`)
7. "앱 키" → "JavaScript 키" 복사
8. `.env` 파일의 `VITE_KAKAO_API_KEY`에 붙여넣기

## 📁 프로젝트 구조

```
chungcheong-market-map/
├── public/                 # 정적 파일
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── ui/            # 재사용 가능한 UI 컴포넌트
│   │   ├── registration/  # 상인 등록 관련 컴포넌트
│   │   ├── Header.tsx
│   │   ├── MapView.tsx
│   │   ├── MarketSelector.tsx
│   │   └── ...
│   ├── hooks/             # 커스텀 React 훅
│   │   ├── useKakaoMap.ts
│   │   ├── useMerchants.ts
│   │   └── ...
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── data/              # 데이터 파일
│   │   └── market-data-final.csv
│   ├── integrations/      # 외부 서비스 연동
│   │   └── supabase/
│   ├── lib/               # 유틸리티 함수
│   └── utils/             # 헬퍼 함수
├── supabase/              # Supabase 설정 및 마이그레이션
├── .env                   # 환경변수 (보안상 Git에 포함되지 않음)
├── .env.example          # 환경변수 예시 파일
└── README.md
```

## 🗺️ 주요 컴포넌트

### MapView
- 카카오맵 API를 활용한 인터랙티브 지도
- 상인 마커 표시 및 클릭 이벤트 처리
- 인포윈도우를 통한 상인 정보 표시

### MarketSelector
- 지역별 시장 선택 기능
- 드롭다운을 통한 직관적인 UI

### MerchantRegistrationModal
- 상인 등록을 위한 단계별 모달
- 사진 업로드, AI 분석, 완료 단계

### MerchantDashboard
- 상인 전용 대시보드
- 상품 정보 관리 및 영업 상태 설정

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 개발 모드 빌드
npm run build:dev

# 코드 린팅
npm run lint

# 빌드 결과 미리보기
npm run preview
```

## 🌐 환경변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `VITE_KAKAO_API_KEY` | 카카오맵 JavaScript API 키 | ✅ |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | ❌ |
| `VITE_SUPABASE_ANON_KEY` | Supabase 익명 키 | ❌ |

## 🗃️ 데이터베이스 스키마

### merchants 테이블
```sql
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  market_name VARCHAR(255) NOT NULL,
  market_day VARCHAR(50),
  general_location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  product_tags TEXT[],
  description TEXT,
  is_open BOOLEAN DEFAULT false,
  password_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 배포

### Vercel 배포 (권장)

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **프로젝트 배포**
   ```bash
   vercel
   ```

3. **환경변수 설정**
   - Vercel 대시보드에서 환경변수 추가
   - `VITE_KAKAO_API_KEY` 설정

### Netlify 배포

1. **빌드 명령어 설정**
   ```bash
   npm run build
   ```

2. **배포 디렉토리 설정**
   ```
   dist
   ```

3. **환경변수 설정**
   - Netlify 대시보드에서 환경변수 추가

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- **프로젝트 관리자**: [이메일 주소]
- **프로젝트 링크**: [https://github.com/your-username/chungcheong-market-map](https://github.com/your-username/chungcheong-market-map)

## 🙏 감사의 말

- [카카오](https://developers.kakao.com) - 지도 API 제공
- [Supabase](https://supabase.com) - 백엔드 서비스
- [Radix UI](https://www.radix-ui.com) - UI 컴포넌트
- [Tailwind CSS](https://tailwindcss.com) - CSS 프레임워크

---

<div align="center">
  <p>Made with ❤️ for Chungcheong Traditional Markets</p>
</div>