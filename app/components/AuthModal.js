'use client';

import { useState } from 'react';
import './auth-modal.css';

export default function AuthModal({ isOpen, onClose, type = 'both' }) {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  return (
    <>
      {/* 모달 배경 */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* 모달 컨테이너 */}
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">풍덩에 참여하세요</h2>
          <p className="modal-subtitle">로그인 또는 회원가입을 해주세요</p>
        </div>

        <div className="modal-tabs">
          <button
            className={`modal-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            로그인
          </button>
          <button
            className={`modal-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            회원가입
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'login' ? (
            <div className="tab-content">
              <p className="tab-description">계정으로 로그인하세요</p>
              <a href="/login" className="modal-action-btn">
                로그인 페이지로 이동
              </a>
            </div>
          ) : (
            <div className="tab-content">
              <p className="tab-description">
                새 계정을 만들어 풍덩을 시작하세요
              </p>
              <a href="/signup" className="modal-action-btn">
                회원가입 페이지로 이동
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
