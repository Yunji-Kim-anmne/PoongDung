'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logout, getCurrentUser, getUserProfile } from '../lib/auth';
import './header.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { user: currentUser } = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const { profile: userProfile } = await getUserProfile(currentUser.id);
        setProfile(userProfile);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setProfile(null);
    setShowProfileMenu(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo-link">
          <h1 className="logo">풍덩</h1>
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="header-nav">
          <Link href="/" className="nav-link">
            홈
          </Link>
          <Link href="/explore" className="nav-link">
            탐색
          </Link>
          {user && (
            <>
              <Link href="/bookshelf" className="nav-link">
                책꽂이
              </Link>
              <Link href="/mypage" className="nav-link">
                마이페이지
              </Link>
            </>
          )}
        </nav>

        {/* 인증 섹션 */}
        <div className="header-auth">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : user && profile ? (
            <div className="profile-section">
              <button
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="profile-icon">👤</span>
                <span className="profile-name">{profile.nickname}</span>
              </button>

              {showProfileMenu && (
                <div className="profile-menu">
                  <Link href="/mypage" className="menu-item">
                    마이페이지
                  </Link>
                  {profile.role === 'writer' && (
                    <Link href="/dashboard" className="menu-item">
                      창작 대시보드
                    </Link>
                  )}
                  <button
                    className="menu-item logout-item"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link href="/login" className="auth-btn login-btn">
                로그인
              </Link>
              <Link href="/signup" className="auth-btn signup-btn">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
