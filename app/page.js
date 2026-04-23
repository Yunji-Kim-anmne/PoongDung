'use client';

import { useEffect } from 'react';

const pageMarkup = `
    <div id="pageTransitionOverlay"></div>

    <!-- 헤더 -->
    <header class="header">
        <div class="header-content">
            <h1 class="logo">풍덩</h1>
            <!-- 독자용 네비게이션 -->
            <nav id="readerNav" class="view-top-nav">
                <a href="#" class="view-nav-item" data-page="homePage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12h18M3 6h18M3 18h18"></path>
                    </svg>
                    <span class="nav-label">홈</span>
                </a>
                <a href="#" class="view-nav-item" data-page="explorePage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <span class="nav-label">탐색</span>
                </a>
                <a href="#" class="view-nav-item" data-page="bookshelfPage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    <span class="nav-label">책꽂이</span>
                </a>
                <a href="#" class="view-nav-item" data-page="myPage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="nav-label">마이페이지</span>
                </a>
            </nav>
            <!-- 작가용 네비게이션 -->
            <nav id="authorNav" class="view-top-nav" style="display: none;">
                <a href="#" class="view-nav-item" data-page="authorHomePage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12h18M3 6h18M3 18h18"></path>
                    </svg>
                    <span class="nav-label">홈</span>
                </a>
                <a href="#" class="view-nav-item" data-page="authorWritePage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span class="nav-label">창작</span>
                </a>
                <a href="#" class="view-nav-item" data-page="authorMyPage">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="nav-label">마이페이지</span>
                </a>
            </nav>
            <button id="modeToggleBtn" class="mode-toggle-btn" title="작가 모드로 전환">
                ✏️
            </button>
        </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="main-content">
        <!-- 홈 페이지 -->
        <div id="homePage" class="page-content">
            <!-- 히어로 배너 -->
            <section class="hero-section">
                <div class="hero-left">
                    <div class="hero-logo-placeholder">
                        <img src="/풍덩_로고__ai__명함용__확정___-removebg-preview.png" alt="풍덩 로고" class="hero-logo">
                    </div>
                </div>
                <div class="hero-right">
                    <h2 class="hero-title">당신의 취향에 풍덩 빠져보세요.</h2>
                    <p class="hero-sub">지금 이 순간, 당신을 기다리는 작품 <span id="totalWorksCount"></span>편이 있습니다.</p>
                    <p class="hero-desc">당신이 찾던 작품, 풍덩에서라면 만날지도 몰라요.</p>
                    <button class="hero-btn" id="goExploreBtn">작품 탐색하기</button>
                </div>
            </section>

            <!-- 지금 뜨는 독자 반응 -->
            <section class="trending-section">
                <h2 class="section-title">지금 뜨는 반응 🔥</h2>
                <div class="trending-tags" id="trendingTags"></div>
            </section>

            <!-- 이 주의 작품 -->
            <section class="weekly-section">
                <h2 class="section-title">이 주의 작품</h2>
                <div class="works-grid" id="weeklyWorksGrid"></div>
            </section>

            <!-- 나를 위한 추천 -->
            <section class="recommend-section">
                <h2 class="section-title">나를 위한 추천</h2>
                <div id="recommendContent"></div>
            </section>
        </div>

        <!-- 책꽂이 페이지 -->
        <div id="bookshelfPage" class="page-content" style="display: none;">
            <section class="works-section">
                <h2 class="section-title">내 책꽂이</h2>
                <div class="works-grid" id="bookshelfGrid">
                    <!-- 찜한 작품들이 JavaScript로 추가됨 -->
                </div>
                <div id="emptyBookshelf" class="empty-message" style="display: none;">
                    <p>아직 찜한 작품이 없습니다.</p>
                    <p>마음에 드는 작품을 찾아 찜해보세요!</p>
                </div>
            </section>
        </div>

        <!-- 탐색 페이지 -->
        <div id="explorePage" class="page-content" style="display: none;">
            <!-- 장르 필터 섹션 -->
            <section class="filter-section">
                <h2 class="filter-title">장르로 탐색하기</h2>
                <div class="filter-buttons">
                    <button class="filter-btn active" data-genre="all">전체</button>
                    <button class="filter-btn" data-genre="literature">문학</button>
                    <button class="filter-btn" data-genre="webtoon">만화/웹툰</button>
                    <button class="filter-btn" data-genre="information">정보성 글</button>
                </div>
            </section>

            <!-- 카테고리 필터 섹션 -->
            <section class="category-section" id="categorySection" style="display: none;">
                <h3 class="category-title">카테고리 선택</h3>
                <div class="category-buttons" id="categoryButtons">
                    <!-- 카테고리 버튼들이 JavaScript로 추가됨 -->
                </div>
            </section>

            <section class="hashtag-section" id="hashtagSection" style="display: none;">
                <div class="hashtag-header">
                    <h3 class="hashtag-title">태그로 좁히기</h3>
                    <div class="hashtag-controls">
                        <div class="toggle-wrap">
                            <span class="toggle-label" id="toggleLabel">1개 선택</span>
                            <label class="toggle-switch">
                                <input type="checkbox" id="multiSelectToggle">
                                <span class="toggle-slider"></span>
                            </label>
                            <span class="toggle-label">다중 선택</span>
                        </div>
                        <button id="resetHashtagsBtn" class="reset-tags-btn">전체 해제</button>
                    </div>
                </div>
                <div class="hashtag-group" id="authorHashtagButtons"></div>
                <div class="hashtag-group" id="readerHashtagButtons"></div>
            </section>

            <!-- 작품 카드 목록 섹션 -->
            <section class="works-section">
                <div class="works-header">
                    <h2 class="section-title">인기 작품</h2>
                    <div class="completion-filter">
                        <button class="completion-btn active" data-status="all">전체</button>
                        <button class="completion-btn" data-status="ongoing">연재 중</button>
                        <button class="completion-btn" data-status="completed">완결</button>
                    </div>
                    <div class="view-settings">
                        <button class="view-btn active" data-view="grid" title="박스 형태">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </button>
                        <button class="view-btn" data-view="list" title="라인 형태">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <rect x="3" y="5" width="2" height="2"></rect>
                                <rect x="3" y="11" width="2" height="2"></rect>
                                <rect x="3" y="17" width="2" height="2"></rect>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="works-grid" id="worksGrid" data-view="grid">
                    <!-- 작품 카드들이 JavaScript로 추가됨 -->
                </div>
            </section>
        </div>

        <!-- 마이페이지 -->
        <div id="myPage" class="page-content" style="display: none;">
            <!-- 프로필 섹션 -->
            <section class="mypage-profile-section">
                <div class="mypage-avatar" id="mypageAvatar">독</div>
                <div class="mypage-profile-info">
                    <p class="mypage-nickname" id="mypageNickname">풍덩 독자</p>
                    <span class="mypage-mode-badge" id="mypageModeBadge">독자 모드</span>
                </div>
            </section>

            <!-- 독서 현황 -->
            <section class="mypage-stats-section">
                <div class="mypage-stat-card">
                    <p class="mypage-stat-label">찜한 작품</p>
                    <p class="mypage-stat-value" id="statLikedCount">0편</p>
                </div>
                <div class="mypage-stat-card">
                    <p class="mypage-stat-label">읽은 회차</p>
                    <p class="mypage-stat-value" id="statEpisodeCount">0화</p>
                </div>
                <div class="mypage-stat-card">
                    <p class="mypage-stat-label">현재 모드</p>
                    <p class="mypage-stat-value" id="statMode">독자</p>
                </div>
            </section>

            <!-- 최근 읽은 작품 -->
            <section class="mypage-recent-section">
                <h2 class="section-title">최근 읽은 작품</h2>
                <div id="mypageRecentWork"></div>
            </section>

            <!-- 취향 분석 -->
            <section class="mypage-chart-section">
                <h2 class="section-title">내 취향 분석</h2>
                <div class="mypage-charts">
                    <div class="mypage-chart-card">
                        <p class="mypage-chart-title">장르 분포</p>
                        <canvas id="genreChart"></canvas>
                    </div>
                    <div class="mypage-chart-card">
                        <p class="mypage-chart-title">선호 태그 TOP 5</p>
                        <canvas id="tagChart"></canvas>
                    </div>
                </div>
            </section>
        </div>

        <!-- 작가 홈 페이지 -->
        <div id="authorHomePage" class="page-content author-mode" style="display: none;">
            <!-- 히어로 배너 -->
            <section class="hero-section">
                <div class="hero-left">
                    <div class="hero-logo-placeholder">
                        <img src="/풍덩로고 작가모드 removebg-preview.png" alt="풍덩 로고" class="hero-logo">
                    </div>
                </div>
                <div class="hero-right">
                    <h2 class="hero-title">당신의 바다에 독자들을 초대하세요.</h2>
                    <p class="hero-sub">지금 이 순간, 당신의 작품을 기다리는 독자 <span id="totalReadersCount">0</span>명이 있습니다.</p>
                    <p class="hero-desc">당신의 이야기, 풍덩에서라면 누군가의 마음에 닿을지도 몰라요.</p>
                    <button class="hero-btn" id="goAuthorWriteBtn">작품 올리러 가기</button>
                </div>
            </section>

            <!-- 나의 지난 작품 -->
            <section class="past-works-section">
                <h2 class="section-title">나의 지난 작품</h2>
                <div class="works-grid" id="pastWorksGrid"></div>
                <div id="emptyPastWorks" class="empty-message" style="display: none;">
                    <p>아직 등록한 작품이 없습니다.</p>
                    <p>첫 작품을 올려보세요!</p>
                </div>
            </section>

            <!-- 인기 독자 반응 -->
            <section class="reader-reactions-section">
                <h2 class="section-title">인기 독자 반응 🔥</h2>
                <div class="trending-tags" id="authorTrendingTags"></div>
            </section>
        </div>

        <!-- 창작 페이지 -->
        <div id="authorWritePage" class="page-content author-mode" style="display: none;">
            <section class="creation-container">
                <div class="creation-header">
                    <h2 class="section-title">나의 작품</h2>
                    <button id="addWorkBtn" class="add-work-btn">+</button>
                </div>
                <div class="my-works-grid" id="myWorksGrid"></div>
                <div id="emptyCreation" class="empty-message" style="display: none;">
                    <p>당신의 첫 연재작을 시작하세요</p>
                    <button id="emptyAddWorkBtn" class="empty-add-btn">+</button>
                </div>
            </section>
        </div>

        <!-- 작가 마이페이지 -->
        <div id="authorMyPage" class="page-content author-mode" style="display: none;">
            <!-- 프로필 섹션 -->
            <section class="author-profile-section">
                <div class="author-avatar">작</div>
                <div class="author-profile-info">
                    <p class="author-nickname">풍덩 작가</p>
                    <span class="author-mode-badge">작가 모드</span>
                </div>
            </section>

            <!-- 통계 섹션 -->
            <section class="author-stats-section">
                <div class="author-stat-card">
                    <p class="author-stat-label">등록 작품 수</p>
                    <p class="author-stat-value" id="statWorkCount">0개</p>
                </div>
                <div class="author-stat-card">
                    <p class="author-stat-label">총 독자 반응</p>
                    <p class="author-stat-value" id="statTotalReaction">0건</p>
                </div>
                <div class="author-stat-card">
                    <p class="author-stat-label">평균 좋아요 비율</p>
                    <p class="author-stat-value" id="statLikeRatio">0%</p>
                </div>
            </section>

            <!-- 차트 섹션 -->
            <section class="author-chart-section">
                <h2 class="section-title">독자 분석</h2>
                <div class="author-charts">
                    <div class="author-chart-card">
                        <p class="author-chart-title">독자 연령대 분포</p>
                        <canvas id="ageChart"></canvas>
                    </div>
                    <div class="author-chart-card">
                        <p class="author-chart-title">방문 빈도/좋아요 비율</p>
                        <canvas id="engagementChart"></canvas>
                    </div>
                </div>
            </section>
        </div>

        <!-- 감상 페이지 -->
        <div id="viewPage" class="page-content" style="display: none;">
            <section class="view-page-shell">
                <div class="view-page-topbar">
                    <span class="view-page-label">감상하기</span>
                </div>

                <section class="view-book-header">
                    <div class="view-book-cover-wrap">
                        <img id="viewCover" src="" alt="작품 표지">
                    </div>
                    <div class="view-book-meta">
                        <p class="view-book-author" id="viewAuthor"></p>
                        <h2 class="view-book-title" id="viewTitle"></h2>
                        <p class="view-book-synopsis" id="viewSynopsis"></p>
                    </div>
                </section>

                <section class="view-book-layout">
                    <aside class="view-episode-panel">
                        <h3 class="view-panel-title">회차 목록</h3>
                        <div id="viewEpisodeList" class="view-episode-list"></div>
                    </aside>

                    <article class="view-reading-panel">
                        <div class="view-reading-header">
                            <span class="view-reading-badge" id="viewEpisodeBadge"></span>
                            <h3 class="view-reading-title" id="viewEpisodeTitle"></h3>
                        </div>
                        <div class="view-reading-content" id="viewEpisodeContent"></div>
                    </article>
                </section>

                <button class="episode-arrow-btn left" id="prevEpBtn" title="이전화 보기">&#8249;</button>
                <button class="episode-arrow-btn right" id="nextEpBtn" title="다음화 보기">&#8250;</button>
            </section>
        </div>

        <div id="workModal" class="modal-overlay" style="display:none;" onclick="if(event.target === this) closeModal()">
            <div class="modal-container">
                <button class="modal-close-btn" onclick="closeModal()">✕</button>
                <div class="modal-inner">
                    <div class="modal-cover-wrap">
                        <img id="modalCover" src="" alt="작품 표지">
                    </div>
                    <div class="modal-body">
                        <div class="modal-title-row">
                            <h2 id="modalTitle" class="modal-title"></h2>
                            <button id="modalReadBtn" class="modal-read-btn">감상하러 가기</button>
                        </div>
                        <p id="modalAuthor" class="modal-author"></p>
                        <div class="modal-rating">
                            <span class="star">⭐</span>
                            <span id="modalRating"></span>
                        </div>
                        <p id="modalSynopsis" class="modal-synopsis"></p>
                        <div class="modal-tags-section">
                            <p class="modal-tag-label author-label">작가 태그</p>
                            <div id="modalAuthorTags" class="modal-tags-wrap"></div>
                            <p class="modal-tag-label reader-label">독자 태그</p>
                            <div id="modalReaderTags" class="modal-tags-wrap"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- 하단 네비게이션 바 -->
    <nav class="bottom-nav">
        <a href="#" class="nav-item active">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
            <span class="nav-label">홈</span>
        </a>
        <a href="#" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <span class="nav-label">탐색</span>
        </a>
        <a href="#" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span class="nav-label">책꽂이</span>
        </a>
        <a href="#" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="nav-label">마이페이지</span>
        </a>
    </nav>

    
    
    
`;

export default function Page() {
  useEffect(() => {
    let disposed = false;

    (async () => {
      if (typeof window === 'undefined') return;

      const [{ default: Sortable }, ChartAuto] = await Promise.all([
        import('sortablejs'),
        import('chart.js/auto'),
      ]);

      if (disposed) return;

      window.Sortable = Sortable;
      window.Chart = ChartAuto.default ?? ChartAuto;

const commonTags = {
    literature: {
        author: ['새드엔딩', '해피엔딩', '완결', '연재중'],
        reader: ['탄탄한 서사', '매력적인 캐릭터', '눈물주의', '강추']
    },
    webtoon: {
        author: ['새드엔딩', '해피엔딩', '완결', '연재중'],
        reader: ['탄탄한 서사', '매력적인 캐릭터', '눈물주의', '강추']
    },
    information: {
        author: ['입문자용', '중급자용', '심화', '시리즈', '완결', '정기연재'],
        reader: ['쉽게읽힘', '정독추천', '유익함', '저장각', '강추', '실용적']
    }
};

const categoryTagMap = {
    '감성': { author: ['일상기록', '감정글', '새벽감성', '위로'], reader: ['잔잔함', '공감', '감성글쓰기'] },
    '교육': { author: ['학습법', '공부팁', '교육정보', '진로'], reader: ['자기주도학습', '스터디', '교육콘텐츠'] },
    '기술': { author: ['IT트렌드', '개발일지', '코딩', '테크뉴스'], reader: ['앱개발', 'AI기술', '디지털전환'] },
    '데이터과학': { author: ['데이터분석', '파이썬활용', '시각화', '통계기초'], reader: ['머신러닝입문', '데이터리터러시', '분석툴'] },
    '로맨스': { author: ['환생', '로판', '사극', '삼각관계', '클리셰', '햇살여주', '소꿉친구'], reader: ['심장주의', '설렘주의', '두근두근'] },
    '모험': { author: ['세계관', '퀘스트', '여정', '성장서사'], reader: ['액션전개', '탐험', '긴장감있는'] },
    '미스터리': { author: ['밀실', '연쇄살인', '미제사건', '실화기반'], reader: ['반전있음', '긴장감있는', '소름주의', '떡밥'] },
    '심리학': { author: ['심리학개념', '인지편향', '행동심리', '감정조절'], reader: ['심리실험', '정신건강정보', '심리팁'] },
    '액션': { author: ['전투씬', '고강도전개', '주인공각성', '스피디한전개'], reader: ['세계관충돌', '보스전'] },
    '일상': { author: ['잔잔한전개', '소소함', '힐링물', '느슨한서사'], reader: ['공감100%', '음식', '스트레스없음', '귀여움'] },
    '자기계발': { author: ['습관형성', '생산성팁', '목표설정', '동기부여'], reader: ['루틴공유', '성장기록', '시간관리'] },
    '추리': { author: ['밀실', '연쇄살인', '긴장감있는', '단서찾기'], reader: ['반전있음', '소름주의', '트릭주의'] },
    '코미디': { author: ['웃음주의', '병맛', '현실공감', '일상개그'], reader: ['유쾌한전개', '반전개그', '공감100%'] },
    '판타지': { author: ['회귀물', '이세계', '마법', '몰입각'], reader: ['스케일큰', '세계관탄탄', '판타지입문'] },
    '학교': { author: ['학원물', '청춘서사', '교우관계', '첫사랑'], reader: ['우정', '학교생활', '성장스토리'] }
};

const episodeData = {
    1: [
        {
            ep: 1,
            title: "별빛이 머무는 천문대",
            content: "고요한 밤, 주인공은 폐관 직전의 천문대에서 홀로 별의 움직임을 기록한다. 어느 날 유난히 밝게 빛나는 별 하나가 관측창에 오래 머무르고, 기록장에는 알 수 없는 문장이 남는다. 익숙한 우주가 갑자기 말을 거는 순간, 그는 오랫동안 덮어두었던 첫 꿈과 다시 마주한다."
        },
        {
            ep: 2,
            title: "별에서 온 이름",
            content: "그날 이후 주인공은 매일 밤 같은 별을 찾고, 그 빛을 따라 들려오는 목소리를 받아 적는다. 별은 자신이 오래전 사라진 약속의 파편이라고 말하며, 주인공에게 망원경 너머의 세계를 보여준다. 둘의 대화는 점점 깊어지고, 주인공은 하늘을 보는 일이 결국 마음의 상처를 읽는 일임을 깨닫는다."
        },
        {
            ep: 3,
            title: "새벽이 지나도 남는 위로",
            content: "별빛이 약해질수록 주인공은 자신이 붙잡고 있던 상실과 두려움을 인정하게 된다. 사라질지 모르는 존재를 붙잡으려는 마음과, 보내주어야 한다는 마음이 천천히 부딪힌다. 마지막 회차에서 그는 별에게 작별을 고하지만, 그 작별은 끝이 아니라 누군가의 밤을 지켜주는 새로운 시작이 된다."
        }
    ],
    2: [
        {
            ep: 1,
            title: "지각의 변명",
            content: "매일 같은 시간에 같은 버스를 타는 평범한 아침, 주인공은 오늘도 지각 직전이다. 급히 뛰어오르던 그는 옆자리에 앉은 낯선 사람과 우연히 작은 실랑이를 벌이고, 그 장면이 이상하게도 하루를 가볍게 만든다. 별일 없던 일상은 그렇게 아주 조금씩 다른 표정을 띠기 시작한다."
        },
        {
            ep: 2,
            title: "점심시간의 작은 편지",
            content: "야근이 이어지던 어느 날, 동료가 몰래 건넨 손글씨 메모 한 장이 주인공의 표정을 바꾼다. 그 메모에는 대단한 응원 대신, 오늘도 무사히 버틴 것만으로 충분하다는 소박한 문장이 적혀 있다. 그는 자신이 놓치고 있던 것은 성취가 아니라 서로를 알아보는 따뜻한 시선이었다는 사실을 천천히 배운다."
        },
        {
            ep: 3,
            title: "익숙한 하루의 끝에서",
            content: "집으로 돌아오는 길, 주인공은 늘 지나치던 골목과 편의점 불빛, 늦은 시간의 공기를 새삼 다르게 바라본다. 특별한 사건 하나 없이도 삶은 충분히 단단하고, 그 단단함은 아주 작은 선택들이 쌓여 만든다는 사실이 드러난다. 마지막 장면에서 그는 내일도 같은 버스를 타겠지만, 같은 마음으로 타지는 않겠다고 다짐한다."
        }
    ],
    3: [
        {
            ep: 1,
            title: "금지구역의 지도",
            content: "입학 첫날부터 주인공은 절대 들어가지 말라는 금지구역 지도를 손에 넣는다. 친구의 장난처럼 시작된 모험은 오래된 복도 끝에서 멈춰 있던 마법을 깨우고, 벽면의 문양들이 느리게 움직이며 비밀의 방향을 가리킨다. 학교는 안전한 배움의 장소가 아니라, 감춰진 진실을 시험하는 거대한 미로처럼 느껴진다."
        },
        {
            ep: 2,
            title: "시간이 멈춘 도서관",
            content: "주인공은 비어 있는 줄 알았던 도서관에서 끝없이 같은 페이지를 펼치는 책 한 권을 발견한다. 책 속에는 봉인된 시간의 열쇠와, 학교를 세운 이들이 숨긴 약속이 적혀 있다. 함께 조사하던 친구들과의 신뢰는 조금씩 금이 가고, 누군가가 비밀을 먼저 차지하려 한다는 불안이 공기를 눌러온다."
        },
        {
            ep: 3,
            title: "교장실의 봉인",
            content: "마지막 회차에서 주인공은 배신의 정체와 학교의 진짜 목적을 동시에 마주한다. 교장실 아래 숨겨진 봉인 장치가 풀리면서, 마법학교는 학생을 지키기 위한 공간이 아니라 선택된 힘을 길들이는 장소였다는 사실이 드러난다. 주인공은 친구와 손을 잡고 봉인을 다시 세우며, 두려움보다 우정을 먼저 믿는 선택을 한다."
        }
    ],
    4: [
        {
            ep: 1,
            title: "아침에 깨어난 AI",
            content: "알람이 울리기 전 날씨와 일정, 교통 상황을 먼저 읽어 주는 AI 비서가 주인공의 하루를 바꾼다. 편리함은 순식간에 익숙해지지만, 그는 추천과 예측이 너무 자연스러워져 스스로 선택하는 감각을 잃어가는 기분도 함께 느낀다. 기술은 생활을 돕지만, 판단까지 대신할 수는 없다는 질문이 조용히 남는다."
        },
        {
            ep: 2,
            title: "교실과 회의실의 변화",
            content: "학교에서는 개별 학습을 돕는 AI가 학생들의 속도를 조절하고, 회사에서는 문서 초안과 일정 정리를 대신해 업무를 빠르게 만든다. 모두가 효율을 칭찬하지만, 주인공은 누가 설명하고 책임지는가라는 문제를 놓치면 안 된다고 말한다. 기술의 발전은 결국 사람의 역할을 더 분명하게 드러내는 거울처럼 기능한다."
        },
        {
            ep: 3,
            title: "공존의 규칙",
            content: "마지막 회차에서는 AI가 인간의 일을 빼앗는 존재인지, 새로운 가능성을 여는 동반자인지에 대한 결론이 나온다. 주인공은 기계가 더 잘하는 일을 인정하되, 공감과 윤리, 맥락의 이해는 여전히 사람의 몫임을 강조한다. 읽고 나면 기술을 두려워하기보다, 어떤 기준으로 함께 써야 하는지 고민하게 된다."
        }
    ],
    5: [
        {
            ep: 1,
            title: "지하주차장의 신발 한 짝",
            content: "화려한 도심의 밤, 지하주차장에서 발견된 낡은 신발 한 짝이 연쇄 실종 사건의 첫 단서가 된다. 퇴직한 형사는 익숙한 수사를 떠올리고, 신참 기자는 기사감보다 더 큰 무언가가 숨겨졌음을 직감한다. 도시의 모든 불빛이 밝을수록, 진실은 오히려 더 깊은 그림자 속으로 숨어든다."
        },
        {
            ep: 2,
            title: "재개발 구역의 증언",
            content: "두 사람은 사건 현장을 따라 재개발 구역을 파고들며 사라진 주민들의 흔적을 찾는다. 인터뷰는 서로 다른 진술로 어긋나고, 누군가는 일부러 기억을 지운 듯한 태도로 수사를 방해한다. 주인공들은 도시가 사건을 숨기는 것이 아니라, 사건을 통해 누군가의 욕망이 작동하고 있음을 깨닫는다."
        },
        {
            ep: 3,
            title: "도시가 감춘 얼굴",
            content: "마지막에는 실종 사건의 배후가 개인의 악의만이 아니라 오랫동안 묵인된 권력의 거래였다는 사실이 드러난다. 형사는 끝내 놓쳤던 과거의 사건과 다시 마주하고, 기자는 진실을 밝히는 일이 기사 한 편보다 무거운 책임임을 배운다. 도시의 두 얼굴은 사람을 속이지만, 끝내 진실을 완전히 지우지는 못한다."
        }
    ],
    6: [
        {
            ep: 1,
            title: "원고 속으로 빨려들다",
            content: "마감 직전 원고를 다듬던 웹툰 작가는 갑자기 자신이 그리던 세계 속으로 빨려 들어간다. 캐릭터들은 연재 설정대로 움직이지 않고, 주인공이었던 인물은 원고를 찢어 내듯 현실을 흔든다. 작가는 그림을 그리던 손으로 이제는 직접 살아남아야 한다는 사실을 받아들인다."
        },
        {
            ep: 2,
            title: "펜으로 바꾸는 능력",
            content: "작가는 자신이 쥔 펜이 단순한 도구가 아니라 세계의 규칙을 잠시 바꾸는 열쇠라는 걸 알아낸다. 등장인물의 감정선과 배경 설정을 이해할수록 전투의 흐름도 달라지고, 그는 창작이 곧 책임이라는 사실을 몸으로 배운다. 작가의 상상력은 무기가 되지만, 그 힘을 어디에 쓰느냐가 더 중요해진다."
        },
        {
            ep: 3,
            title: "최종 보스와 마지막 콘티",
            content: "마지막 회차에서 주인공은 자신이 만든 최종 보스와 맞서며 세계를 끝낼지, 다시 그려낼지 선택해야 한다. 전투가 거세질수록 이야기의 결말은 원래의 완결 원고와 조금씩 어긋나고, 그는 완벽한 결말보다 살아 있는 결말을 선택한다. 창작물은 창작자를 닮아 움직이고, 그 끝에서 작가는 비로소 진짜 영웅이 된다."
        }
    ],
    7: [
        {
            ep: 1,
            title: "생각이 먼저 틀리는 이유",
            content: "주인공은 왜 같은 뉴스도 자신의 믿음에 맞는 내용만 더 크게 보게 되는지 궁금해한다. 확증편향과 선택적 기억을 일상의 예시로 따라가다 보면, 우리는 논리보다 익숙함에 더 빨리 설득된다는 사실이 선명해진다. 첫 회차는 심리학이 특별한 사람의 이야기가 아니라, 누구에게나 숨어 있는 습관의 기록임을 보여준다."
        },
        {
            ep: 2,
            title: "습관과 감정의 실험실",
            content: "두 번째 회차에서는 작은 행동이 반복되며 습관이 되고, 습관이 다시 감정의 방향을 바꾸는 과정을 실험으로 풀어낸다. 알람을 미루는 행동, 미뤄둔 일의 죄책감, 칭찬 한마디에 달라지는 기분이 모두 심리의 작동 방식으로 연결된다. 읽는 사람은 스스로를 탓하기보다, 구조를 이해하는 쪽이 먼저라는 사실을 배운다."
        },
        {
            ep: 3,
            title: "관계 속 마음 돌보기",
            content: "마지막 회차는 타인과의 관계에서 생기는 오해와 방어를 다룬다. 말 한마디를 오래 곱씹는 이유, 상처를 숨기려 무심한 척하는 태도, 도움을 청하는 일이 왜 어려운지 차분히 짚어 준다. 결론은 단순하다. 마음은 관리 대상이 아니라 이해 대상이며, 이해가 시작될 때 비로소 변화가 가능해진다."
        }
    ],
    8: [
        {
            ep: 1,
            title: "밤에만 열리는 문",
            content: "사서인 주인공은 늦은 밤, 지하 서가 끝에서 평소 보이지 않던 문을 발견한다. 문을 열자 달빛이 쏟아지는 도서관과, 오래전에 누군가가 남긴 편지 한 장이 기다리고 있다. 편지의 필체는 잊었던 이름을 불러오고, 주인공은 이곳이 단순한 서점이 아니라 기억을 보관하는 장소라는 걸 알아차린다."
        },
        {
            ep: 2,
            title: "10년 전의 약속",
            content: "달빛 도서관의 비밀을 따라가다 보니, 주인공은 소꿉친구와 나눴던 어린 시절의 약속을 다시 만난다. 두 사람은 서로를 잊은 척 지냈지만, 책갈피 사이에 남은 메모와 낡은 사진들이 거짓말을 하지 않는다. 회차가 진행될수록 감정은 천천히 복원되고, 묻어둔 시간은 다시 숨을 쉰다."
        },
        {
            ep: 3,
            title: "새벽의 고백",
            content: "마지막 회차에서는 도서관의 문이 닫히기 전, 두 사람이 끝내 전하지 못했던 마음이 드러난다. 고백은 화려하지 않지만 오래 참아 온 시간만큼 깊고, 서로를 향한 용서는 조용한 새벽 공기처럼 부드럽다. 책장 사이로 새어 들어오는 빛 아래에서, 둘의 이야기는 비로소 다음 장으로 넘어간다."
        }
    ],
    9: [
        {
            ep: 1,
            title: "추천 알고리즘의 함정",
            content: "주인공은 피곤한 퇴근길마다 자신을 너무 정확하게 아는 추천 알고리즘에 소름을 느낀다. 한 번 본 밈, 한 번 멈춘 영상, 한 번 흘겨본 댓글까지 모두 기록되고, 그 결과 일상은 점점 비슷한 콘텐츠만 돌려 보는 원형 감옥처럼 좁아진다. 웃기지만 불편한 이 회차는 현대인의 시선을 가볍게 비튼다."
        },
        {
            ep: 2,
            title: "회의실에서 터진 밈",
            content: "회사 회의 중 갑자기 터진 밈 하나가 분위기를 완전히 바꿔 놓는다. 모두가 웃는 사이, 주인공은 유행을 따라가는 것이 능숙함인지, 생각을 멈추는 것인지 헷갈린다. 회식 자리까지 이어지는 엉뚱한 해프닝 속에서 작품은 우리 일상의 과장된 리듬을 코믹하게 포착한다."
        },
        {
            ep: 3,
            title: "조회수보다 진심",
            content: "마지막 회차는 조회수와 진심 사이에서 흔들리는 창작자의 고민을 건드린다. 재밌는 장면을 더 빨리, 더 세게 만들라는 요구 속에서도 주인공은 결국 사람을 웃기는 일과 사람을 이해하는 일이 완전히 같지는 않다는 걸 깨닫는다. 이 웹툰은 가볍게 웃기면서도, 왜 우리는 더 자극적인 것에 끌리는지 끝까지 묻게 만든다."
        }
    ],
    10: [
        {
            ep: 1,
            title: "데이터 정리의 시작",
            content: "프로젝트를 시작한 주인공은 엉망으로 흩어진 데이터셋을 마주한다. 결측치와 중복값, 이상치를 하나씩 정리하는 과정에서 분석은 숫자를 다루는 일이 아니라 질문을 정리하는 일이라는 사실이 드러난다. 첫 회차는 초심자가 가장 많이 놓치는 기초를 차분하게 짚으며, 실전의 출발점이 무엇인지 보여준다."
        },
        {
            ep: 2,
            title: "모델은 왜 틀리는가",
            content: "두 번째 회차에서는 피처 선택과 학습 모델의 오차를 추적하며, 좋은 결과가 우연이 아님을 설명한다. 눈에 보이는 정확도보다 중요한 것은 왜 그런 결과가 나왔는지 이해하는 과정이고, 주인공은 검증 세트와 해석 가능성의 의미를 깨닫는다. 코드는 짧아도 사고는 길어야 한다는 메시지가 또렷하게 남는다."
        },
        {
            ep: 3,
            title: "배포 이후의 진짜 일",
            content: "마지막 회차는 모델을 서비스에 올린 뒤 마주하는 현실을 다룬다. 성능이 좋았던 모델도 사용자 환경에서는 예기치 않게 흔들리고, 설명할 수 없는 결과는 신뢰를 잃게 만든다. 그래서 이 장은 데이터 과학의 끝이 예측이 아니라 책임이라는 점을 강조하며, 실무자가 꼭 챙겨야 할 감각을 남긴다."
        }
    ],
    11: [
        {
            ep: 1,
            title: "비 오는 카페에서",
            content: "졸업 후 10년 만에 다시 모인 친구들은 모교 앞 카페에서 어색한 인사를 나눈다. 비에 젖은 우산과 낯설어진 말투 사이로, 예전처럼 웃고 떠들던 시간이 너무 멀리 간 것만 같다. 그러나 한 사람의 작은 농담이 기억의 문을 열고, 잊은 줄 알았던 장면들이 차례로 돌아오기 시작한다."
        },
        {
            ep: 2,
            title: "편지함 속 오래된 약속",
            content: "주인공은 우연히 학교 시절 사용하던 편지함을 다시 찾고, 그 안에서 서로에게 못 전한 메시지와 함께 찍은 사진을 발견한다. 사진 속 웃음 뒤에 숨은 서운함과 미안함이 드러나면서, 그날의 관계가 왜 멈췄는지 조금씩 윤곽이 잡힌다. 계절은 지나갔지만 마음은 아직 그 자리에 남아 있었다."
        },
        {
            ep: 3,
            title: "계절이 끝나는 자리",
            content: "마지막 회차에서 주인공들은 결국 각자의 이별이 한 사람의 잘못만은 아니었음을 인정한다. 말하지 못했던 이유와 피하지 못했던 순간들이 서로의 상처를 만들었지만, 동시에 다시 만나게 만든 힘이기도 했다. 그리운 계절은 돌아오지 않지만, 돌아보는 순간 새로운 위로가 시작된다."
        }
    ],
    12: [
        {
            ep: 1,
            title: "능력 없는 입학식",
            content: "초능력 학교에 입학한 주인공은 정작 자기 능력을 확인하지 못한 채 낙오자 취급을 받는다. 반짝이는 폭발과 비행, 물건을 움직이는 친구들 사이에서 그는 가장 평범한 학생처럼 보이지만, 이상하게도 학교의 기계들은 그를 자꾸만 감지하지 못한다. 첫 회차는 숨겨진 가능성의 씨앗을 조용히 심는다."
        },
        {
            ep: 2,
            title: "숨겨진 힘의 흔적",
            content: "훈련이 거듭될수록 주인공은 자신의 능력이 사라진 것이 아니라 다른 형태로 잠들어 있었다는 사실을 깨닫는다. 위기 상황에서 시간의 감각이 느려지고, 상대의 움직임이 선명하게 읽히는 순간들이 이어지며 주위의 시선도 달라진다. 팀전과 실전 수업은 이 학생이 정말 누구인지 밝혀내는 시험장이 된다."
        },
        {
            ep: 3,
            title: "최종 시험의 각성",
            content: "마지막 회차에서 학교는 학생들의 능력을 평가하는 최종 시험을 열지만, 그 시험은 사실 누가 두려움을 넘어설 수 있는지 보는 관문이다. 주인공은 동료들과 협력하며 드디어 자신의 힘을 온전히 받아들이고, 비교당하던 입장에서 선택받는 존재가 아니라 스스로 증명하는 존재로 거듭난다. 이야기는 성장과 우정을 함께 남긴 채 힘있게 끝난다."
        }
    ]
};

// 샘플 작품 데이터
const works = [
    {
        id: 1,
        title: "별과 함께하는 밤",
        author: "윤지작가",
        genre: "literature",
        tags: ["판타지", "감성"],
        authorTags: ['감정글', '새벽감성', '연재중', '해피엔딩'],
        readerTags: ['잔잔함', '공감', '눈물주의'],
        synopsis: "밤하늘의 별을 관찰하던 고독한 천문학도가 어느 날 별에서 내려온 존재를 만나며 시작되는 감성 판타지. 우주의 끝에서 전해지는 위로와 사랑 이야기.",
        rating: 4.8,
        cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop",
        episodes: episodeData[1]
    },
    {
        id: 2,
        title: "그 남자의 일상",
        author: "김수연",
        genre: "literature",
        tags: ["일상", "감성"],
        authorTags: ['일상기록', '소소함', '연재중'],
        readerTags: ['공감100%', '스트레스없음', '귀여움'],
        synopsis: "특별할 것 없는 평범한 직장인의 하루하루. 출근길 버스, 점심 메뉴 고민, 퇴근 후 맥주 한 캔. 소소하지만 따뜻한 일상의 기록.",
        rating: 4.5,
        cover: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=300&h=400&fit=crop",
        episodes: episodeData[2]
    },
    {
        id: 3,
        title: "마법학교의 비밀",
        author: "이준호",
        genre: "webtoon",
        tags: ["판타지", "모험"],
        authorTags: ['마법', '학원물', '이세계', '연재중'],
        readerTags: ['몰입각', '세계관탄탄', '강추'],
        synopsis: "입학과 동시에 금지구역에 발을 들인 신입생이 학교 깊숙이 숨겨진 금지된 마법의 비밀을 파헤치기 시작한다. 우정과 배신이 교차하는 마법 학원 어드벤처.",
        rating: 4.9,
        cover: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=300&h=400&fit=crop",
        episodes: episodeData[3]
    },
    {
        id: 4,
        title: "AI 시대의 미래",
        author: "박영호",
        genre: "information",
        tags: ["기술", "교육"],
        authorTags: ['IT트렌드', '테크뉴스', '중급자용', '정기연재', '연재중'],
        readerTags: ['AI기술', '유익함', '정독추천'],
        synopsis: "챗GPT부터 자율주행까지, AI가 바꾸는 우리 삶의 모든 것. 기술을 모르는 사람도 쉽게 이해할 수 있도록 풀어쓴 AI 트렌드 해설서.",
        rating: 4.3,
        cover: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=400&fit=crop",
        episodes: episodeData[4]
    },
    {
        id: 5,
        title: "도시의 두 얼굴",
        author: "최민지",
        genre: "literature",
        tags: ["추리", "미스터리"],
        authorTags: ['밀실', '연쇄살인', '완결'],
        readerTags: ['반전있음', '소름주의', '긴장감있는', '떡밥'],
        synopsis: "화려한 도심 뒤편에서 연쇄적으로 발생하는 의문의 실종 사건. 퇴직한 형사와 신참 기자가 손을 잡고 도시가 숨긴 어두운 진실을 추적한다.",
        rating: 4.7,
        cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=400&fit=crop",
        episodes: episodeData[5]
    },
    {
        id: 6,
        title: "웹툰 프로젝트: 영웅",
        author: "한준상",
        genre: "webtoon",
        tags: ["액션", "판타지"],
        authorTags: ['전투씬', '주인공각성', '세계관', '연재중'],
        readerTags: ['스케일큰', '몰입각', '보스전'],
        synopsis: "평범한 웹툰 작가가 자신이 그린 캐릭터의 세계로 빨려 들어간다. 자신이 만든 세계에서 살아남기 위해 직접 영웅이 되어야 하는 황당하고 스펙터클한 이야기.",
        rating: 4.6,
        cover: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=300&h=400&fit=crop",
        episodes: episodeData[6]
    },
    {
        id: 7,
        title: "심리학의 이해",
        author: "정서영",
        genre: "information",
        tags: ["심리학", "자기계발"],
        authorTags: ['심리학개념', '인지편향', '입문자용', '시리즈'],
        readerTags: ['심리실험', '유익함', '저장각', '실용적'],
        synopsis: "왜 우리는 후회하는 걸 알면서도 같은 선택을 반복할까? 일상 속 심리 현상을 알기 쉬운 사례로 풀어낸 입문자를 위한 심리학 가이드.",
        rating: 4.4,
        cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=400&fit=crop",
        episodes: episodeData[7]
    },
    {
        id: 8,
        title: "달빛 도서관",
        author: "이서준",
        genre: "literature",
        tags: ["로맨스", "감성"],
        authorTags: ['로판', '소꿉친구', '해피엔딩', '완결'],
        readerTags: ['심장주의', '설렘주의', '두근두근', '강추'],
        synopsis: "밤에만 열리는 비밀 도서관에서 소꿉친구를 다시 만난 사서. 10년의 시간이 흐른 뒤 다시 마주한 두 사람 사이에 쌓인 말 못 한 감정들.",
        rating: 4.8,
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        episodes: episodeData[8]
    },
    {
        id: 9,
        title: "트렌디한 웹툰",
        author: "최동욱",
        genre: "webtoon",
        tags: ["코미디", "일상"],
        authorTags: ['일상개그', '병맛', '현실공감', '연재중'],
        readerTags: ['웃음주의', '유쾌한전개', '공감100%'],
        synopsis: "SNS 알고리즘에 지배당하는 현대인의 일상을 유쾌하게 꼬집는 코미디 웹툰. 공감 100%의 직장인 병맛 에피소드 모음집.",
        rating: 4.5,
        cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
        episodes: episodeData[9]
    },
    {
        id: 10,
        title: "데이터 과학 완벽 가이드",
        author: "문규현",
        genre: "information",
        tags: ["데이터과학", "기술"],
        authorTags: ['데이터분석', '파이썬활용', '심화', '완결'],
        readerTags: ['머신러닝입문', '정독추천', '저장각', '실용적'],
        synopsis: "파이썬 기초부터 머신러닝 모델 배포까지. 실무 프로젝트 중심으로 구성된 데이터 사이언티스트 완전 정복 가이드. 코드 한 줄씩 따라가다 보면 어느새 분석가가 되어있다.",
        rating: 4.7,
        cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=400&fit=crop",
        episodes: episodeData[10]
    },
    {
        id: 11,
        title: "그리운 계절",
        author: "이지은",
        genre: "literature",
        tags: ["감성", "학교"],
        authorTags: ['청춘서사', '감정글', '새벽감성', '완결'],
        readerTags: ['잔잔함', '눈물주의', '여운남음'],
        synopsis: "졸업 후 뿔뿔이 흩어진 친구들이 10년 만에 모교 앞 카페에서 재회한다. 그날의 기억과 지금의 현실 사이에서 피어나는 그리움과 위로의 이야기.",
        rating: 4.6,
        cover: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=300&h=400&fit=crop",
        episodes: episodeData[11]
    },
    {
        id: 12,
        title: "초능력 학교 이야기",
        author: "정민준",
        genre: "webtoon",
        tags: ["판타지", "학교"],
        authorTags: ['학원물', '판타지', '주인공각성', '연재중'],
        readerTags: ['몰입각', '세계관탄탄', '강추', '성장스토리'],
        synopsis: "초능력자만 입학할 수 있는 특수 학교에 능력 없이 입학한 주인공. 숨겨진 능력을 찾아가며 성장하는 학원 판타지. 매 화 터지는 능력 배틀씬이 압권.",
        rating: 4.8,
        cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=400&fit=crop",
        episodes: episodeData[12]
    }
];

let currentFilter = 'all';
let currentCategory = 'all';
let currentHashtags = new Set();
let currentStatus = 'all';
let isMultiSelect = false;
let currentView = 'grid';
let likedWorksOrder = [];
let likedWorks = new Set();
let bookshelfSortable = null;
let currentPageId = 'homePage';
let currentReadingWorkId = null;
let currentReadingEpisodeIndex = 0;
let currentMode = 'reader';
let readEpisodeCount = 0;
let lastReadWorkId = null;
let genreChartInstance = null;
let tagChartInstance = null;
const jsSortable = window.Sortable;

// 찜한 작품 로드 (localStorage에서)
function loadLikedWorks() {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('likedWorks');
    if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
            likedWorksOrder = Array.from(new Set(parsed.map(id => parseInt(id, 10)).filter(id => !Number.isNaN(id))));
        }
    }

    likedWorks = new Set(likedWorksOrder);
}

// 찜한 작품 저장 (localStorage에)
function saveLikedWorks() {
    if (typeof window === 'undefined') return;
    localStorage.setItem('likedWorks', JSON.stringify(likedWorksOrder));
}

function syncLikedWorksSet() {
    likedWorks = new Set(likedWorksOrder);
}

function renderMyPage() {
    const avatarEl = document.getElementById('mypageAvatar');
    const nicknameEl = document.getElementById('mypageNickname');
    const modeBadgeEl = document.getElementById('mypageModeBadge');
    const statLikedCountEl = document.getElementById('statLikedCount');
    const statEpisodeCountEl = document.getElementById('statEpisodeCount');
    const statModeEl = document.getElementById('statMode');
    const recentWorkEl = document.getElementById('mypageRecentWork');
    const chartSection = document.querySelector('.mypage-chart-section');
    const chartsWrap = chartSection ? chartSection.querySelector('.mypage-charts') : null;
    const genreCanvas = document.getElementById('genreChart');
    const tagCanvas = document.getElementById('tagChart');

    const isReaderMode = currentMode === 'reader';
    const modeText = isReaderMode ? '독자' : '작가';

    if (avatarEl) avatarEl.textContent = isReaderMode ? '독' : '작';
    if (nicknameEl) nicknameEl.textContent = isReaderMode ? '풍덩 독자' : '풍덩 작가';
    if (modeBadgeEl) modeBadgeEl.textContent = `${modeText} 모드`;
    if (statLikedCountEl) statLikedCountEl.textContent = `${likedWorksOrder.length}편`;
    if (statEpisodeCountEl) statEpisodeCountEl.textContent = `${readEpisodeCount}화`;
    if (statModeEl) statModeEl.textContent = modeText;

    if (recentWorkEl) {
        const recentWork = works.find(work => work.id === lastReadWorkId);
        if (recentWork) {
            recentWorkEl.className = 'works-grid';
            recentWorkEl.innerHTML = createWorkCard(recentWork, true);
            addLikeButtonListeners();
        } else {
            recentWorkEl.className = 'empty-message';
            recentWorkEl.innerHTML = '<p>아직 읽은 작품이 없어요</p>';
        }
    }

    if (genreChartInstance) {
        genreChartInstance.destroy();
        genreChartInstance = null;
    }

    if (tagChartInstance) {
        tagChartInstance.destroy();
        tagChartInstance = null;
    }

    const likedWorksList = likedWorksOrder
        .map(workId => works.find(work => work.id === workId))
        .filter(Boolean);

    if (!chartSection || !chartsWrap) return;

    let emptyHint = chartSection.querySelector('.mypage-chart-empty');
    if (likedWorksList.length === 0) {
        chartsWrap.style.display = 'none';
        if (!emptyHint) {
            emptyHint = document.createElement('p');
            emptyHint.className = 'empty-message mypage-chart-empty';
            chartSection.appendChild(emptyHint);
        }
        emptyHint.textContent = '작품을 찜하면 취향 분석이 시작돼요!';
        return;
    }

    chartsWrap.style.display = 'grid';
    if (emptyHint) {
        emptyHint.remove();
    }

    if (!window.Chart || !genreCanvas || !tagCanvas) return;

    const genreLabelMap = {
        literature: '문학',
        webtoon: '만화/웹툰',
        information: '정보성 글'
    };

    const genreCountMap = {};
    likedWorksList.forEach(work => {
        const label = genreLabelMap[work.genre] || work.genre;
        genreCountMap[label] = (genreCountMap[label] || 0) + 1;
    });

    const tagCountMap = {};
    likedWorksList.forEach(work => {
        (work.authorTags || []).forEach(tag => {
            tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
        });
    });

    const topTags = Object.entries(tagCountMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    genreChartInstance = new window.Chart(genreCanvas, {
        type: 'doughnut',
        data: {
            labels: Object.keys(genreCountMap),
            datasets: [{
                data: Object.values(genreCountMap),
                backgroundColor: ['#5BB8F5', '#4FD1C5', '#90CDF4', '#F6AD55', '#F687B3'],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    tagChartInstance = new window.Chart(tagCanvas, {
        type: 'bar',
        data: {
            labels: topTags.map(([tag]) => tag),
            datasets: [{
                data: topTags.map(([, count]) => count),
                backgroundColor: '#5BB8F5',
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// 작품 카드 HTML 생성
function createWorkCard(work, isBookshelf = false) {
    const isLiked = likedWorks.has(work.id);
    const clickMode = isBookshelf ? 'view' : 'modal';
    
    return `
        <div class="work-card" data-genre="${work.genre}" data-id="${work.id}" onclick="openWork(${work.id}, '${clickMode}')">
            <div class="work-card-cover">
                <img src="${work.cover}" alt="${work.title}" onload="this.style.display='block'" onerror="handleImageError(event, '${work.title}')">
                <button class="work-card-like-btn ${isLiked ? 'liked' : 'unliked'}" data-work-id="${work.id}" title="${isLiked ? '찜 해제' : '찜하기'}">
                    ${isLiked ? '♥' : '♡'}
                </button>
            </div>
            <div class="work-card-content">
                <h3 class="work-card-title">${work.title}</h3>
                <p class="work-card-author">by ${work.author}</p>
                <div class="work-card-meta">
                    <div class="work-card-tags">
                        ${work.tags.map(tag => `<span class="work-card-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="work-card-rating">
                    <span class="star">⭐</span>
                    <span>${work.rating}</span>
                </div>
            </div>
        </div>
    `;
}

function openWork(workId, mode = 'modal') {
    if (mode === 'view') {
        openViewPage(workId);
        return;
    }

    openModal(workId);
}

function openViewPage(workId) {
    const work = works.find(w => w.id === workId);
    if (!work) return;

    currentReadingWorkId = workId;
    currentReadingEpisodeIndex = 0;
    renderViewPage();
    showPage('viewPage');
    window.scrollTo(0, 0);
}

function openModal(workId) {
    const work = works.find(w => w.id === workId);
    if (!work) return;

    document.getElementById('modalTitle').textContent = work.title;
    document.getElementById('modalAuthor').textContent = 'by ' + work.author;
    document.getElementById('modalSynopsis').textContent = work.synopsis;
    document.getElementById('modalCover').src = work.cover;
    document.getElementById('modalRating').textContent = work.rating;

    const authorTagsEl = document.getElementById('modalAuthorTags');
    const readerTagsEl = document.getElementById('modalReaderTags');
    authorTagsEl.innerHTML = (work.authorTags || []).map(tag =>
        `<span class="modal-tag author">#${tag}</span>`).join('');
    readerTagsEl.innerHTML = (work.readerTags || []).map(tag =>
        `<span class="modal-tag reader">#${tag}</span>`).join('');

    const modalReadBtn = document.getElementById('modalReadBtn');
    if (modalReadBtn) {
        modalReadBtn.onclick = () => {
            closeModal();
            setTimeout(() => openViewPage(workId), 260);
        };
    }

    const modal = document.getElementById('workModal');
    modal.style.display = 'flex';
    modal.classList.remove('modal-closing');
    modal.classList.add('modal-opening');
    document.documentElement.style.overflowY = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('workModal');
    modal.classList.remove('modal-opening');
    modal.classList.add('modal-closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-closing');
        document.documentElement.style.overflowY = 'scroll';
    }, 250);
}

function getCurrentReadingWork() {
    return works.find(work => work.id === currentReadingWorkId) || null;
}

function renderViewPage() {
    const work = getCurrentReadingWork();
    if (!work) return;

    const viewCover = document.getElementById('viewCover');
    const viewTitle = document.getElementById('viewTitle');
    const viewAuthor = document.getElementById('viewAuthor');
    const viewSynopsis = document.getElementById('viewSynopsis');
    const viewEpisodeList = document.getElementById('viewEpisodeList');
    const viewEpisodeTitle = document.getElementById('viewEpisodeTitle');
    const viewEpisodeContent = document.getElementById('viewEpisodeContent');
    const viewEpisodeBadge = document.getElementById('viewEpisodeBadge');
    const prevEpisodeBtn = document.getElementById('prevEpBtn');
    const nextEpisodeBtn = document.getElementById('nextEpBtn');

    const episodes = work.episodes || [];
    const currentEpisode = episodes[currentReadingEpisodeIndex] || episodes[0];

    if (viewCover) viewCover.src = work.cover;
    if (viewTitle) viewTitle.textContent = work.title;
    if (viewAuthor) viewAuthor.textContent = `by ${work.author}`;
    if (viewSynopsis) viewSynopsis.textContent = work.synopsis;

    if (viewEpisodeList) {
        viewEpisodeList.innerHTML = episodes.map((episode, index) => `
            <button class="episode-card ${index === currentReadingEpisodeIndex ? 'active' : ''}" data-episode-index="${index}">
                <span class="episode-card-number">${episode.ep}화</span>
                <span class="episode-card-title">${episode.title}</span>
            </button>
        `).join('');

        viewEpisodeList.querySelectorAll('.episode-card').forEach(button => {
            button.addEventListener('click', () => {
                currentReadingEpisodeIndex = parseInt(button.dataset.episodeIndex, 10);
                readEpisodeCount += 1;
                lastReadWorkId = currentReadingWorkId;
                renderViewPage();
            });
        });
    }

    if (currentEpisode) {
        if (viewEpisodeTitle) viewEpisodeTitle.textContent = `${currentEpisode.ep}화 · ${currentEpisode.title}`;
        if (viewEpisodeContent) viewEpisodeContent.textContent = currentEpisode.content;
        if (viewEpisodeBadge) viewEpisodeBadge.textContent = `${currentEpisode.ep}화`;
    }

    if (prevEpisodeBtn) {
        prevEpisodeBtn.disabled = currentReadingEpisodeIndex === 0;
    }

    if (nextEpisodeBtn) {
        nextEpisodeBtn.disabled = currentReadingEpisodeIndex >= episodes.length - 1;
    }
}

function goToPreviousEpisode() {
    if (currentReadingEpisodeIndex <= 0) return;
    currentReadingEpisodeIndex -= 1;
    readEpisodeCount += 1;
    lastReadWorkId = currentReadingWorkId;
    renderViewPage();
    window.scrollTo(0, 0);
}

function goToNextEpisode() {
    const work = getCurrentReadingWork();
    const episodes = work?.episodes || [];
    if (currentReadingEpisodeIndex >= episodes.length - 1) return;
    currentReadingEpisodeIndex += 1;
    readEpisodeCount += 1;
    lastReadWorkId = currentReadingWorkId;
    renderViewPage();
    window.scrollTo(0, 0);
}

// 이미지 로딩 실패 처리
function handleImageError(event, title) {
    event.target.style.display = 'none';
    const coverDiv = event.target.parentElement;
    
    if (!coverDiv.querySelector('.cover-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'cover-placeholder';
        placeholder.innerHTML = `<div class="cover-placeholder-title">${title}</div>`;
        coverDiv.appendChild(placeholder);
    }
}

// 작품 목록 렌더링
function renderWorks(filter = 'all') {
    const worksGrid = document.getElementById('worksGrid');
    
    let filteredWorks = filter === 'all' 
        ? works 
        : works.filter(work => work.genre === filter);
    
    // 카테고리 필터 적용
    if (currentCategory !== 'all') {
        filteredWorks = filteredWorks.filter(work => work.tags.includes(currentCategory));
    }

    // 해시태그 AND 필터 적용
    if (currentHashtags.size > 0) {
        filteredWorks = filteredWorks.filter(work => {
            const allTags = [...(work.authorTags || []), ...(work.readerTags || [])];
            return [...currentHashtags].every(tag => allTags.includes(tag));
        });
    }

    if (currentStatus === 'ongoing') {
        filteredWorks = filteredWorks.filter(work =>
            (work.authorTags || []).includes('연재중'));
    } else if (currentStatus === 'completed') {
        filteredWorks = filteredWorks.filter(work =>
            (work.authorTags || []).includes('완결'));
    }
    
    worksGrid.innerHTML = filteredWorks.map(work => createWorkCard(work)).join('');
    
    // 하트 버튼 이벤트 추가
    addLikeButtonListeners();
}

function renderHashtags(category) {
    const hashtagSection = document.getElementById('hashtagSection');
    const authorHashtagButtons = document.getElementById('authorHashtagButtons');
    const readerHashtagButtons = document.getElementById('readerHashtagButtons');
    const resetHashtagsBtn = document.getElementById('resetHashtagsBtn');
    const multiSelectToggle = document.getElementById('multiSelectToggle');
    const toggleLabel = document.getElementById('toggleLabel');

    if (!hashtagSection || !authorHashtagButtons || !readerHashtagButtons || !resetHashtagsBtn || !multiSelectToggle || !toggleLabel) {
        return;
    }

    multiSelectToggle.checked = isMultiSelect;
    toggleLabel.textContent = isMultiSelect ? '다중 선택' : '1개 선택';

    multiSelectToggle.onchange = () => {
        isMultiSelect = multiSelectToggle.checked;
        currentHashtags.clear();
        renderHashtags(category);
        renderWorks(currentFilter);
    };

    if (category === 'all') {
        currentHashtags.clear();
        hashtagSection.style.display = 'none';
        authorHashtagButtons.innerHTML = '';
        readerHashtagButtons.innerHTML = '';
        return;
    }

    const common = commonTags[currentFilter] || { author: [], reader: [] };
    const categoryTags = categoryTagMap[category] || { author: [], reader: [] };

    const authorTags = Array.from(new Set([...common.author, ...categoryTags.author]));
    const readerTags = Array.from(new Set([...common.reader, ...categoryTags.reader]));

    hashtagSection.style.display = 'block';

    authorHashtagButtons.innerHTML = authorTags
        .map(tag => `<button class="hashtag-btn-author ${currentHashtags.has(tag) ? 'active' : ''}" data-tag="${tag}">#${tag}</button>`)
        .join('');

    readerHashtagButtons.innerHTML = readerTags
        .map(tag => `<button class="hashtag-btn-reader ${currentHashtags.has(tag) ? 'active' : ''}" data-tag="${tag}">#${tag}</button>`)
        .join('');

    const hashtagButtons = document.querySelectorAll('.hashtag-btn-author, .hashtag-btn-reader');
    hashtagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.dataset.tag;

            if (isMultiSelect) {
                if (currentHashtags.has(tag)) {
                    currentHashtags.delete(tag);
                } else {
                    currentHashtags.add(tag);
                }
            } else {
                currentHashtags.clear();
                currentHashtags.add(tag);
            }

            renderHashtags(category);
            renderWorks(currentFilter);
        });
    });

    resetHashtagsBtn.onclick = () => {
        currentHashtags.clear();
        renderHashtags(category);
        renderWorks(currentFilter);
    };
}

function renderHome() {
    const totalWorksCount = document.getElementById('totalWorksCount');
    const trendingTags = document.getElementById('trendingTags');
    const weeklyWorksGrid = document.getElementById('weeklyWorksGrid');
    const recommendContent = document.getElementById('recommendContent');
    const goExploreBtn = document.getElementById('goExploreBtn');

    if (!totalWorksCount || !trendingTags || !weeklyWorksGrid || !recommendContent) {
        return;
    }

    totalWorksCount.textContent = String(works.length);

    const trendingComments = [
        { username: "달빛독자", avatar: "달", workTitle: "달빛 도서관", comment: "마지막 회차 읽고 진짜 한참 멍했어요. 이런 결말이라니...", tags: ["#눈물주의", "#여운남음"] },
        { username: "판타지덕후", avatar: "판", workTitle: "마법학교의 비밀", comment: "세계관이 너무 탄탄해서 읽는 내내 실제처럼 느껴졌어요!", tags: ["#세계관탄탄", "#몰입각"] },
        { username: "새벽세시", avatar: "새", workTitle: "도시의 두 얼굴", comment: "자려고 누웠다가 결국 밤새 다 읽어버렸습니다... 범인이에요", tags: ["#밤새읽음", "#강추"] },
        { username: "로판수집가", avatar: "로", workTitle: "달빛 도서관", comment: "두근두근해서 심장이 터질 뻔 했어요 진짜로요", tags: ["#심장주의", "#설렘주의"] },
        { username: "힐링중", avatar: "힐", workTitle: "그리운 계절", comment: "요즘 너무 지쳐있었는데 이 작품 덕분에 위로받았어요 🥹", tags: ["#힐링", "#공감100%"] }
    ];

    const trendingContainer = document.getElementById('trendingTags');
    trendingContainer.innerHTML = trendingComments.map(item => `
        <div class="trending-comment-card" data-work-title="${item.workTitle}">
            <div class="trending-comment-header">
                <div class="trending-avatar">${item.avatar}</div>
                <div class="trending-comment-meta">
                    <span class="trending-username">${item.username}</span>
                    <span class="trending-work-title">📖 ${item.workTitle}</span>
                </div>
            </div>
            <p class="trending-comment-text">${item.comment}</p>
            <div class="trending-comment-tags">
                ${item.tags.map(tag => `<span class="trending-comment-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');

    let isDown = false;
    let startX;
    let scrollLeft;

    trendingContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - trendingContainer.offsetLeft;
        scrollLeft = trendingContainer.scrollLeft;
        trendingContainer.style.cursor = 'grabbing';
    });

    trendingContainer.addEventListener('mouseleave', () => {
        isDown = false;
        trendingContainer.style.cursor = 'grab';
    });

    trendingContainer.addEventListener('mouseup', () => {
        isDown = false;
        trendingContainer.style.cursor = 'grab';
    });

    trendingContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - trendingContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        trendingContainer.scrollLeft = scrollLeft - walk;
    });

    trendingContainer.querySelectorAll('.trending-comment-card').forEach(card => {
        card.addEventListener('click', () => {
            if (Math.abs(trendingContainer.scrollLeft - scrollLeft) > 5) return;
            const workTitle = card.dataset.workTitle;
            const work = works.find(w => w.title === workTitle);
            if (work) openModal(work.id);
        });
    });

    const weeklyTopWorks = [...works]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    weeklyWorksGrid.innerHTML = weeklyTopWorks.map(work => createWorkCard(work)).join('');

    const likedSet = new Set(likedWorksOrder);
    if (likedWorksOrder.length === 0) {
        recommendContent.innerHTML = '<div class="recommend-empty">아직 찜한 작품이 없어요. 마음에 드는 작품을 찜하면 추천이 시작돼요!</div>';
    } else {
        const authorTagCounts = new Map();

        likedWorksOrder
            .map(workId => works.find(work => work.id === workId))
            .filter(Boolean)
            .forEach(work => {
                (work.authorTags || []).forEach(tag => {
                    authorTagCounts.set(tag, (authorTagCounts.get(tag) || 0) + 1);
                });
            });

        const topAuthorTagEntry = Array.from(authorTagCounts.entries())
            .sort((a, b) => b[1] - a[1])[0];

        if (!topAuthorTagEntry) {
            recommendContent.innerHTML = '<div class="recommend-empty">추천 태그를 분석 중이에요. 작품을 더 찜하면 추천이 더 정확해져요!</div>';
        } else {
            const [topAuthorTag] = topAuthorTagEntry;
            const recommendedWorks = works
                .filter(work => !likedSet.has(work.id) && (work.authorTags || []).includes(topAuthorTag))
                .slice(0, 3);

            if (recommendedWorks.length === 0) {
                recommendContent.innerHTML = `<div class="recommend-empty">현재 #${topAuthorTag} 기반으로 추천할 새 작품을 찾지 못했어요. 다른 작품을 찜해 보세요!</div>`;
            } else {
                recommendContent.innerHTML = `<div class="works-grid">${recommendedWorks.map(work => createWorkCard(work)).join('')}</div>`;
            }
        }
    }

    addLikeButtonListeners();

    if (goExploreBtn) {
        goExploreBtn.addEventListener('click', () => {
            const btn = document.getElementById('goExploreBtn');
            const btnRect = btn.getBoundingClientRect();
            const centerX = btnRect.left + btnRect.width / 2;
            const centerY = btnRect.top + btnRect.height / 2;

            const ripple = document.createElement('div');
            ripple.className = 'page-transition-ripple';
            ripple.style.left = centerX + 'px';
            ripple.style.top = centerY + 'px';
            document.body.appendChild(ripple);

            const homePage = document.getElementById('homePage');
            homePage.classList.add('page-fade-out');

            setTimeout(() => {
                const navItems = document.querySelectorAll('.bottom-nav .nav-item');
                navItems.forEach(nav => nav.classList.remove('active'));
                navItems[1].classList.add('active');
                showPage('explorePage');
                const explorePage = document.getElementById('explorePage');
                explorePage.classList.add('page-fade-in');
                setTimeout(() => {
                    explorePage.classList.remove('page-fade-in');
                    homePage.classList.remove('page-fade-out');
                }, 250);
            }, 200);

            setTimeout(() => ripple.remove(), 1100);
        });
    }
}

function renderAuthorHome() {
    const totalReadersCount = document.getElementById('totalReadersCount');
    if (totalReadersCount) {
        totalReadersCount.textContent = String(works.length * 37);
    }
}

function renderAuthorMyPage() {
    const statWorkCount = document.getElementById('statWorkCount');
    const statTotalReaction = document.getElementById('statTotalReaction');
    const statLikeRatio = document.getElementById('statLikeRatio');

    if (statWorkCount) statWorkCount.textContent = `${works.length}개`;
    if (statTotalReaction) statTotalReaction.textContent = `${likedWorksOrder.length * 9}건`;
    if (statLikeRatio) {
        const ratioBase = works.length > 0 ? Math.round((likedWorksOrder.length / works.length) * 100) : 0;
        statLikeRatio.textContent = `${Math.min(100, ratioBase)}%`;
    }
}

// 책꽂이 렌더링
function renderBookshelf() {
    const bookshelfGrid = document.getElementById('bookshelfGrid');
    const emptyMessage = document.getElementById('emptyBookshelf');

    if (bookshelfGrid) {
        bookshelfGrid.dataset.view = currentView;
    }
    
    const likedWorksList = likedWorksOrder
        .map(workId => works.find(work => work.id === workId))
        .filter(Boolean);
    
    if (likedWorksList.length === 0) {
        bookshelfGrid.innerHTML = '';
        if (bookshelfSortable) {
            bookshelfSortable.destroy();
            bookshelfSortable = null;
        }
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        bookshelfGrid.innerHTML = likedWorksList.map(work => createWorkCard(work, true)).join('');

        if (bookshelfSortable) {
            bookshelfSortable.destroy();
            bookshelfSortable = null;
        }

        if (jsSortable) {
            bookshelfSortable = Sortable.create(bookshelfGrid, {
                animation: 500,
                swapThreshold: 0.65,
                forceFallback: false,
                ghostClass: 'dragging-source',
                chosenClass: 'dragging-chosen',
                filter: '.work-card-like-btn',
                preventOnFilter: true,
                onEnd: function() {
                    const nextOrder = [];
                    bookshelfGrid.querySelectorAll('.work-card[data-id]').forEach(card => {
                        nextOrder.push(parseInt(card.dataset.id, 10));
                    });
                    likedWorksOrder = nextOrder;
                    syncLikedWorksSet();
                    saveLikedWorks();
                }
            });
        }

        addLikeButtonListeners();
    }
}

// 하트 버튼 리스너
function addLikeButtonListeners() {
    const likeButtons = document.querySelectorAll('.work-card-like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLike(button);
        });
    });
}

// 찜하기 토글
function toggleLike(button) {
    const workId = parseInt(button.dataset.workId);
    
    if (likedWorks.has(workId)) {
        likedWorks.delete(workId);
        likedWorksOrder = likedWorksOrder.filter(id => id !== workId);
        button.classList.remove('liked');
        button.classList.add('unliked');
        button.textContent = '♡';
        button.title = '찜하기';
    } else {
        likedWorks.add(workId);
        likedWorksOrder.push(workId);
        button.classList.remove('unliked');
        button.classList.add('liked');
        button.textContent = '♥';
        button.title = '찜 해제';
    }
    
    syncLikedWorksSet();
    saveLikedWorks();
    
    // 책꽂이 페이지가 열려있으면 업데이트
    if (document.getElementById('bookshelfPage').style.display !== 'none') {
        renderBookshelf();
    }

    if (document.getElementById('homePage').style.display !== 'none') {
        renderHome();
    }

    if (document.getElementById('myPage').style.display !== 'none') {
        renderMyPage();
    }
}

// 페이지 전환
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');

    const overlay = document.getElementById('pageTransitionOverlay');
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    setTimeout(() => {
        pages.forEach(page => {
            page.style.display = 'none';
            page.style.visibility = 'hidden';
            page.style.position = 'absolute';
        });

        bottomNavItems.forEach(item => item.classList.remove('active'));
        const bottomPageIndexMap = { homePage: 0, explorePage: 1, bookshelfPage: 2, myPage: 3 };
        if (pageId !== 'viewPage') {
            const activeIndex = bottomPageIndexMap[pageId];
            if (typeof activeIndex === 'number' && bottomNavItems[activeIndex]) {
                bottomNavItems[activeIndex].classList.add('active');
            }
        }

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.style.visibility = 'visible';
            targetPage.style.position = 'relative';
            currentPageId = pageId;
            if (pageId === 'bookshelfPage') renderBookshelf();
            if (pageId === 'homePage') renderHome();
            if (pageId === 'authorHomePage') renderAuthorHome();
            if (pageId === 'viewPage') renderViewPage();
            if (pageId === 'myPage') renderMyPage();
            if (pageId === 'authorMyPage') renderAuthorMyPage();
        }

        window.scrollTo(0, 0);

        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }, 50);
    }, 200);
}

// 필터 버튼 이벤트
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.genre;
            currentCategory = 'all'; // 장르 변경 시 카테고리 리셋
            currentHashtags.clear();
            renderCategories();
            renderHashtags('all');
            renderWorks(currentFilter);
        });
    });
}

function setupCompletionFilter() {
    const completionButtons = document.querySelectorAll('.completion-btn');

    completionButtons.forEach(button => {
        button.addEventListener('click', () => {
            completionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentStatus = button.dataset.status;
            renderWorks(currentFilter);
        });
    });
}

// 선택된 장르의 카테고리 목록 가져오기
function getCategoriesByGenre(genre) {
    const genreWorks = genre === 'all' 
        ? works 
        : works.filter(work => work.genre === genre);
    
    const categoriesSet = new Set();
    genreWorks.forEach(work => {
        work.tags.forEach(tag => categoriesSet.add(tag));
    });
    
    return Array.from(categoriesSet).sort();
}

// 카테고리 버튼 렌더링
function renderCategories() {
    const categorySection = document.getElementById('categorySection');
    const categoryButtons = document.getElementById('categoryButtons');
    
    const categories = getCategoriesByGenre(currentFilter);
    
    // 카테고리가 없으면 섹션 숨기기
    if (categories.length === 0) {
        categorySection.style.display = 'none';
        renderHashtags('all');
        return;
    }
    
    // 카테고리 섹션 표시
    categorySection.style.display = 'block';
    
    // 카테고리 버튼 생성
    const buttonsHTML = [
        '<button class="category-btn active" data-category="all">전체</button>',
        ...categories.map(cat => `<button class="category-btn" data-category="${cat}">${cat}</button>`)
    ].join('');
    
    categoryButtons.innerHTML = buttonsHTML;
    
    // 카테고리 버튼 이벤트 리스너 추가
    addCategoryButtonListeners();
}

// 카테고리 버튼 이벤트 리스너
function addCategoryButtonListeners() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderHashtags(currentCategory);
            renderWorks(currentFilter);
        });
    });
}

// 네비게이션 바 이벤트
function setupNavigation() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    
    bottomNavItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const pages = ['homePage', 'explorePage', 'bookshelfPage', 'myPage'];
            showPage(pages[index]);
        });
    });
}

// 보기 설정 버튼 이벤트
function setupViewSettings() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            
            const worksGrid = document.getElementById('worksGrid');
            worksGrid.setAttribute('data-view', currentView);
        });
    });
}

function switchMode(mode) {
    const isAuthor = mode === 'author';
    const btn = document.getElementById('modeToggleBtn');
    const readerNav = document.getElementById('readerNav');
    const authorNav = document.getElementById('authorNav');

    btn.textContent = isAuthor ? '📖' : '✏️';
    btn.title = isAuthor ? '독자 모드로 전환' : '작가 모드로 전환';
    btn.style.backgroundColor = isAuthor ? '#FF8C2A' : '';
    btn.style.boxShadow = isAuthor ? '0 2px 8px rgba(255, 140, 42, 0.4)' : '';

    if (isAuthor) {
        document.body.classList.add('author-mode-active');
        if (readerNav) readerNav.style.display = 'none';
        if (authorNav) authorNav.style.display = 'flex';

        // display 변경 후에 색상 적용
        requestAnimationFrame(() => {
            document.querySelectorAll('#authorNav .view-nav-item').forEach(i => {
                i.classList.remove('active');
                i.style.color = '';
                const s = i.querySelector('svg');
                if (s) s.style.stroke = '';
            });
            const authorHomeBtn = document.querySelector('#authorNav .view-nav-item[data-page="authorHomePage"]');
            if (authorHomeBtn) {
                authorHomeBtn.classList.add('active');
                authorHomeBtn.style.color = '#FF8C2A';
                const svg = authorHomeBtn.querySelector('svg');
                if (svg) svg.style.stroke = '#FF8C2A';
            }
        });

        showPage('authorHomePage');
    } else {
        document.body.classList.remove('author-mode-active');
        if (readerNav) readerNav.style.display = 'flex';
        if (authorNav) authorNav.style.display = 'none';
        document.querySelectorAll('#readerNav .view-nav-item').forEach(i => i.classList.remove('active'));
        const readerHomeBtn = document.querySelector('#readerNav .view-nav-item[data-page="homePage"]');
        if (readerHomeBtn) readerHomeBtn.classList.add('active');
        showPage('homePage');
    }
}

// 초기화 함수
window.closeModal = closeModal;
window.openWork = openWork;
window.handleImageError = handleImageError;

function init() {
    loadLikedWorks();
    renderHome();
    renderCategories();
    renderWorks();
    setupFilterButtons();
    setupCompletionFilter();
    setupNavigation();
    setupViewSettings();

    document.querySelectorAll('#readerNav .view-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#readerNav .view-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            showPage(item.dataset.page);
        });
    });

    document.querySelectorAll('#authorNav .view-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#authorNav .view-nav-item').forEach(i => {
                i.classList.remove('active');
                i.style.color = '';
                const svg = i.querySelector('svg');
                if (svg) svg.style.stroke = '';
            });
            item.classList.add('active');
            item.style.color = '#FF8C2A';
            const svg = item.querySelector('svg');
            if (svg) svg.style.stroke = '#FF8C2A';
            showPage(item.dataset.page);
        });
    });

    document.querySelector('.logo').addEventListener('click', () => {
        if (currentMode === 'author') {
            document.querySelectorAll('#authorNav .view-nav-item').forEach(i => i.classList.remove('active'));
            const authorHomeBtn = document.querySelector('#authorNav .view-nav-item[data-page="authorHomePage"]');
            if (authorHomeBtn) authorHomeBtn.classList.add('active');
            showPage('authorHomePage');
        } else {
            document.querySelectorAll('#readerNav .view-nav-item').forEach(i => i.classList.remove('active'));
            const readerHomeBtn = document.querySelector('#readerNav .view-nav-item[data-page="homePage"]');
            if (readerHomeBtn) readerHomeBtn.classList.add('active');
            showPage('homePage');
        }
    });

    const prevEpisodeBtn = document.getElementById('prevEpBtn');
    const nextEpisodeBtn = document.getElementById('nextEpBtn');

    if (prevEpisodeBtn) {
        prevEpisodeBtn.addEventListener('click', goToPreviousEpisode);
    }

    if (nextEpisodeBtn) {
        nextEpisodeBtn.addEventListener('click', goToNextEpisode);
    }

    const modeToggleBtn = document.getElementById('modeToggleBtn');
    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', () => {
            currentMode = currentMode === 'reader' ? 'author' : 'reader';
            switchMode(currentMode);
        });
    }
}

// DOM이 로드되면 초기화 실행



init();

    })();

    return () => {
      disposed = true;
      if (typeof window !== 'undefined') {
        delete window.closeModal;
        delete window.openWork;
        delete window.handleImageError;
      }
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />;
}

