
<div align="center">
  <img src="./src/assets/chungcheong-connect-logo.png" alt="어서5슈 로고" width="130"/>
  <h1>어서5슈 (chungcheong-market-map)</h1>
  <strong>AI와 LBS 기술로 충청권 전통시장의 '오늘'을 연결하는 실시간 지도 플랫폼</strong>
  <p>2025 충청권 ICT 이노베이션 아이디어 및 SW 개발 공모전 출품작</p>
  
  <p>
    <a href="https://chungcheong-market-map.vercel.app/"><strong>🔗 서비스 바로가기</strong></a>
  </p>
  
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</div>

---

## 🤔 Why: 왜 '어서5슈'인가요?

"오늘 시장에 가면 싱싱한 딸기를 살 수 있을까?", "지난번에 갔던 그 할머니는 오늘 나오셨을까?"

충청권 전통시장은 사람 사는 정이 넘치는 곳이지만, 방문객은 **'정보의 깜깜함'** 속에서 발걸음을 망설이고, 상인들은 **'디지털의 높은 벽'** 앞에서 가게를 알릴 방법을 몰랐습니다.

**어서5슈**는 이 두 가지 문제를 **사진 한 장**이라는 가장 따뜻하고 직관적인 기술로 해결합니다. 우리는 기술을 통해 단절된 시장의 정보를 잇고, 세대와 세대를 연결하여, 모두가 설레는 마음으로 시장을 찾게 만드는 것을 목표로 합니다.

## ✨ What: 무엇을 할 수 있나요?
<div align="center">
  <img src="./src/assets/eoseo5shu-demo.gif" alt="어서5슈 서비스 시연 GIF" width="800"/>
</div>

*   **🗺️ 실시간 스마트 지도:** "오늘 장 서유?" 오늘 영업 중인 가게, 판매 중인 상품을 지도 위에서 실시간으로 확인하세요. 더 이상 헛걸음은 없습니다.
*   **🤖 AI 자동 등록:** 사장님은 그저 좌판 사진 한 장만 '찰칵'! AI가 상품과 위치를 알아서 등록해주는, 세상에서 가장 쉬운 디지털 가게입니다.
*   **❤️ 단골 맺기:** 마음에 드는 가게를 '단골'로 등록하고, 영업 시작, 신상품 입고 소식을 가장 먼저 받아보세요.
*   **🔍 통합 검색:** '공주 알밤'처럼 찾고 싶은 품목을 검색하면, 해당 상품을 파는 모든 가게를 한눈에 찾아줍니다.

## 🚀 How: 어떻게 만들었나요?

| 구분 | 기술 | 역할 |
|:---:|:---|:---|
| **Frontend** | `React`, `TypeScript`, `Vite`, `Tailwind CSS` | 사용자에게 빠르고 직관적인 경험을 제공하는 반응형 웹 인터페이스를 구축했습니다. |
| **Backend** | `Supabase (PostgreSQL, Edge Functions)` | 복잡한 서버 관리 없이, 실시간 데이터 동기화와 안전한 사용자 인증을 구현했습니다. |
| **APIs** | `Kakao Map API`, `Google Gemini API` | 국내 환경에 최적화된 지도 서비스와, 사진 속 상품을 인식하는 강력한 AI를 연동했습니다. |
| **Deployment** | `Vercel`, `CI/CD Pipeline` | 코드 변경 사항을 즉시 서비스에 반영하는 자동화된 배포 파이프라인을 구축했습니다. |

## 🏁 시작하기 (For Developers)

이 프로젝트에 기여하고 싶으신가요? 아래의 가이드를 따라 로컬 환경에서 프로젝트를 실행해보세요.

1.  **저장소 복제 및 의존성 설치**
    ```bash
    git clone https://github.com/ssum21/chungcheong-market-map.git
    cd chungcheong-market-map
    npm install
    ```
2.  **환경변수 설정**
    `.env.example` 파일을 복사하여 `.env` 파일을 만들고, 필요한 API 키를 입력해주세요.
    ```bash
    cp .env.example .env
    ```
    ```env
    VITE_KAKAO_API_KEY=여러분의_카카오_API_키를_입력하세요
    VITE_SUPABASE_URL=여러분의_SUPABASE_URL을_입력하세요
    VITE_SUPABASE_ANON_KEY=여러분의_SUPABASE_ANON_KEY를_입력하세요
    ```
3.  **개발 서버 실행**
    ```bash
    npm run dev
    ```
    이제 브라우저에서 `http://localhost:5173`으로 접속하여 '어서5슈'를 만나보세요!

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


## 👨‍💻 제작자 (Contributors)

| 역할 | 이름 | Github |
|:---:|:---:|:---|
| **Backend & AI Lead** | 이중권 | `https://github.com/2jungg` |
| **Frontend & UX Lead** | 임수민 | `https://github.com/ssum21` |

<br/>

<div align="center">
  <strong>충청의 심장을 다시 뛰게 할 저희의 여정에 함께해주세요.</strong>
</div>
