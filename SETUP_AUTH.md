# 풍덩 로그인/회원가입 기능 설정 가이드

## 필수 설정

### 1. Supabase 프로젝트 생성

1. [Supabase 공식 사이트](https://supabase.com)에 접속
2. 회원가입 후 새 프로젝트 생성
3. 프로젝트 생성 완료 후 대시보드에서 다음 정보 확인:
   - **Project URL** (API Endpoint)
   - **Anon Key** (공개 키)

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

> **주의**: `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에 노출되므로, 비밀번호는 저장하지 마세요.

### 3. Supabase 데이터베이스 테이블 생성

Supabase 대시보드의 SQL Editor에서 다음 SQL 실행:

```sql
-- profiles 테이블 생성
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(20) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'reader',
  gender VARCHAR(20),
  birth_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security (RLS) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 사용자가 자신의 프로필만 조회 가능
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 사용자가 자신의 프로필만 수정 가능
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 회원가입 시 프로필 자동 생성 (선택사항)
CREATE POLICY "Anyone can insert their profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

## 파일 구조

```
app/
├── lib/
│   ├── auth.js              # 인증 함수 (signup, login, logout 등)
│   └── supabase.js         # Supabase 클라이언트
├── components/
│   ├── Header.js           # 헤더 컴포넌트 (로그인/회원가입 버튼)
│   ├── AuthModal.js        # 인증 모달
│   ├── header.css
│   └── auth-modal.css
├── login/
│   ├── page.js             # 로그인 페이지
│   └── auth.css
├── signup/
│   ├── page.js             # 회원가입 페이지
│   └── auth.css
└── layout.js               # 루트 레이아웃 (Header 포함)
```

## 주요 기능

### 회원 유형 (Role)

- **reader** (기본값): 작품 읽기만 가능
- **writer**: 독자 기능 + 작품 등록/연재 가능

### 인증 함수 (app/lib/auth.js)

```javascript
// 회원가입
signup(email, password, nickname, role, gender, birthYear)

// 로그인
login(email, password)

// 로그아웃
logout()

// 현재 사용자 조회
getCurrentUser()

// 사용자 프로필 조회
getUserProfile(userId)

// 인증 상태 구독
onAuthStateChange(callback)

// 사용자 역할 확인
getUserRole(userId)
```

### 컴포넌트 사용 예제

#### Header 컴포넌트 (자동 포함)

```javascript
// app/layout.js에 이미 포함됨
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

#### AuthModal 사용

```javascript
import { useState } from 'react';
import AuthModal from '@/app/components/AuthModal';

export default function Page() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowAuthModal(true)}>
        감상하러 가기
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
```

## 디자인

- **포인트 컬러**: 감귤색 (#FF6B2C, #FF8C2A)
- **폰트**: 시스템 폰트 스택
- **반응형**: 모바일 완벽 지원 (400px 이상)

## 보안 고려사항

1. **RLS 활성화**: Supabase 테이블에서 Row Level Security 반드시 활성화
2. **환경변수**: .env.local은 .gitignore에 추가 (git에 커밋하지 말 것)
3. **HTTPS**: 프로덕션 배포 시 HTTPS 필수
4. **비밀번호 정책**: 최소 6자 클라이언트 검증 (서버에서도 추가 검증 권장)

## 트러블슈팅

### "Supabase not initialized" 오류

- .env.local 파일 확인
- 환경변수 이름 확인: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Next.js 서버 재시작

### "Failed to create user profile" 오류

- Supabase 데이터베이스 profiles 테이블 생성 확인
- RLS 정책 확인
- Supabase 대시보드에서 오류 로그 확인

### CORS 오류

- Supabase 프로젝트 설정에서 "Authentication" > "URL Configuration"에서 허용된 도메인 추가

## 다음 단계

1. [작품 상세 모달](../작품-상세-모달.md) 구현 시 AuthModal 통합
2. 마이페이지 구현 (프로필 수정, 찜 목록 등)
3. 작가 대시보드 구현 (작품 등록, 연재 관리 등)
4. 소셜 로그인 추가 (Google, GitHub 등) - Supabase에서 지원
