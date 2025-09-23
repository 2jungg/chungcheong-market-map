# 1단계: 빌드 환경 설정 (Builder Stage)
# Node.js 20-alpine 버전을 기반으로 빌드 환경을 구성합니다.
FROM node:20-alpine AS builder

# 작업 디렉터리를 /app으로 설정합니다.
WORKDIR /app

# 의존성 설치를 위해 package.json과 package-lock.json 파일을 먼저 복사합니다.
COPY package.json package-lock.json ./

# npm을 사용하여 의존성을 설치합니다.
RUN npm install

# 나머지 소스 코드를 /app 디렉터리로 복사합니다.
COPY . .

# Vite 빌드 명령을 실행하여 /app/dist 디렉터리에 정적 파일을 생성합니다.
# --build-arg로 전달된 환경 변수들을 사용합니다.
ARG VITE_KAKAO_API_KEY
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_GEMINI_API_KEY

RUN VITE_KAKAO_API_KEY=$VITE_KAKAO_API_KEY \
    VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
    VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY \
    npm run build

# 2단계: 프로덕션 환경 설정 (Production Stage)
# 경량 웹 서버인 Nginx를 기반으로 최종 이미지를 생성합니다.
FROM nginx:stable-alpine

# Nginx의 기본 설정을 삭제합니다.
RUN rm /etc/nginx/conf.d/default.conf

# Nginx 설정 템플릿을 복사합니다.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# 빌드 단계(builder)에서 생성된 정적 파일들을 Nginx의 웹 루트 디렉터리로 복사합니다.
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run이 제공하는 PORT 환경 변수를 사용하도록 컨테이너를 설정합니다.
# 기본값으로 8080을 사용합니다.
ENV PORT 8080

# 컨테이너가 시작될 때 실행될 스크립트입니다.
# 1. templates/default.conf.template 파일의 ${PORT} 변수를 실제 PORT 환경 변수 값으로 치환하여
#    /etc/nginx/conf.d/default.conf 파일을 생성합니다.
# 2. Nginx를 포그라운드에서 실행합니다.
CMD sh -c "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
