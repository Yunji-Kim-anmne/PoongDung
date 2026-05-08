'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../lib/auth';
import './auth.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 유효성 검사
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    const { user, error: loginError } = await login(email, password);

    if (loginError) {
      setError(loginError);
      setIsLoading(false);
      return;
    }

    if (user) {
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/');
    }
  };

  return (
    <div className="auth-page">
      <a href="/" className="back-button">
        <span className="back-icon">←</span>
        <span className="back-text">홈으로</span>
      </a>
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">풍덩</h1>
          <p className="auth-subtitle">로그인</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            계정이 없으신가요?{' '}
            <a href="/signup" className="auth-link">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
