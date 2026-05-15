'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '../lib/auth';
import { trackEvent } from '../lib/ga';
import '../login/auth.css';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [authorNickname, setAuthorNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [role, setRole] = useState('reader');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 유효성 검사
    if (!email.trim() || !password.trim() || !nickname.trim()) {
      setError('필수 필드(이메일, 비밀번호, 닉네임)를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    if (nickname.length < 2 || nickname.length > 20) {
      setError('닉네임은 2자 이상 20자 이하여야 합니다.');
      setIsLoading(false);
      return;
    }

    // 성별 및 출생연도 검증
    let selectedGender = gender || null;
    let selectedBirthYear = birthYear ? parseInt(birthYear, 10) : null;

    if (birthYear && (selectedBirthYear < 1900 || selectedBirthYear > new Date().getFullYear())) {
      setError('올바른 출생연도를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    // 작가 회원가입 나이 제한 (만 15세 이상)
    if (role === 'writer' && selectedBirthYear && selectedBirthYear >= 2011) {
      setError('작가 회원가입은 만 15세 이상만 가능합니다.');
      setIsLoading(false);
      return;
    }

    let selectedAuthorNickname = null;
    if (role === 'writer' && authorNickname.trim()) {
      if (authorNickname.trim().length > 20) {
        setError('필명은 20자 이하여야 합니다.');
        setIsLoading(false);
        return;
      }
      selectedAuthorNickname = authorNickname.trim();
    }

    const { user, error: signupError } = await signup(
      email,
      password,
      nickname,
      role,
      selectedGender,
      selectedBirthYear,
      selectedAuthorNickname
    );

    if (signupError) {
      setError(signupError);
      setIsLoading(false);
      return;
    }

    if (user) {
      trackEvent('signup_completed', {
        method: 'email',
        role,
      });
      // 회원가입 성공 시 로그인 페이지로 이동
      router.push('/login?signup=success');
    }
  };

  const currentYear = new Date().getFullYear();
  const birthYears = Array.from({ length: 124 }, (_, i) => currentYear - i);

  return (
    <div className="auth-page" style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <a href="/" className="back-button">
        <span className="back-icon">←</span>
        <span className="back-text">홈으로</span>
      </a>
      <div className="auth-container" style={{ marginTop: '40px' }}>
        <div className="auth-header">
          <h1 className="auth-title">풍덩</h1>
          <p className="auth-subtitle">회원가입</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일 <span className="required">*</span>
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
            <label htmlFor="nickname" className="form-label">
              닉네임 <span className="required">*</span>
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="2자 이상 20자 이하"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {role === 'writer' && (
            <div className="form-group">
              <label htmlFor="authorNickname" className="form-label">
                필명 (작가 모드에서 표시될 이름)
              </label>
              <input
                id="authorNickname"
                type="text"
                placeholder="독자 닉네임과 다르게 설정 가능해요"
                value={authorNickname}
                onChange={(e) => setAuthorNickname(e.target.value)}
                className="form-input"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                성별
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-input form-select"
                disabled={isLoading}
              >
                <option value="">선택해주세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="birthYear" className="form-label">
                출생연도
              </label>
              <select
                id="birthYear"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="form-input form-select"
                disabled={isLoading}
              >
                <option value="">선택해주세요</option>
                {birthYears.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호 <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="6자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              비밀번호 확인 <span className="required">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">회원 유형 선택 <span className="required">*</span></label>
            <div className="role-options">
              <div className="role-option">
                <input
                  id="reader"
                  type="radio"
                  name="role"
                  value="reader"
                  checked={role === 'reader'}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isLoading}
                  className="role-input"
                />
                <label htmlFor="reader" className="role-label">
                  <span className="role-title">독자</span>
                  <span className="role-desc">작품 읽기만 가능</span>
                </label>
              </div>

              <div className="role-option">
                <input
                  id="writer"
                  type="radio"
                  name="role"
                  value="writer"
                  checked={role === 'writer'}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isLoading}
                  className="role-input"
                />
                <label htmlFor="writer" className="role-label">
                  <span className="role-title">작가</span>
                  <span className="role-desc">작품 등록 및 연재 가능</span>
                </label>
                <div className="role-tooltip">독자 계정도 함께 생성돼요.</div>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            이미 계정이 있으신가요?{' '}
            <a href="/login" className="auth-link">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
