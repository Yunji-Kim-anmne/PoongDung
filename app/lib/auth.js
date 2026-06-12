'use client';

import { supabase } from './supabase';

/**
 * 회원가입
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @param {string} nickname - 닉네임
 * @param {string} role - 회원 유형 ('reader' | 'writer')
 * @param {string} gender - 성별 ('male' | 'female' | 'other')
 * @param {number} birthYear - 출생연도
 * @param {string} authorNickname - 필명 (작가 모드 표시 이름)
 * @returns {Promise<{user: object, error: string|null}>}
 */
export async function signup(email, password, nickname, role = 'reader', gender = null, birthYear = null, authorNickname = null) {
  try {
    // 1. Supabase Auth로 계정 생성
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          role,
          gender,
          birth_year: birthYear,
          author_nickname: authorNickname,
        },
      },
    });

    if (signUpError) {
      return { user: null, error: signUpError.message };
    }

    // 2. profiles 테이블에 사용자 정보 저장
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          nickname,
          role,
          gender: gender || null,
          birth_year: birthYear || null,
          author_nickname: authorNickname || null,
          created_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        if (profileError.code === '23505') {
          return { user: null, error: '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.' };
        }
        return { user: null, error: '회원가입 처리 중 오류가 발생했습니다.' };
      }
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { user: null, error: error.message };
  }
}

/**
 * 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<{user: object, error: string|null}>}
 */
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { user: null, error: error.message };
  }
}

/**
 * 로그아웃
 * @returns {Promise<{error: string|null}>}
 */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Logout error:', error);
    return { error: error.message };
  }
}

/**
 * 현재 로그인한 사용자 정보 가져오기
 * @returns {Promise<{user: object, error: string|null}>}
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Get current user error:', error);
    return { user: null, error: error.message };
  }
}

/**
 * 사용자 프로필 정보 가져오기
 * @param {string} userId - 사용자 ID
 * @returns {Promise<{profile: object, error: string|null}>}
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return { profile: null, error: error.message };
    }

    return { profile: data, error: null };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { profile: null, error: error.message };
  }
}

/**
 * 인증 상태 구독
 * @param {function} callback - 인증 상태 변경 시 호출될 콜백
 * @returns {function} 구독 취소 함수
 */
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback({ event, session });
  });

  return data?.subscription?.unsubscribe;
}

/**
 * 사용자 역할(role) 확인
 * @param {string} userId - 사용자 ID
 * @returns {Promise<{role: string, error: string|null}>}
 */
export async function getUserRole(userId) {
  try {
    const { profile, error } = await getUserProfile(userId);

    if (error) {
      return { role: null, error };
    }

    return { role: profile?.role || 'reader', error: null };
  } catch (error) {
    console.error('Get user role error:', error);
    return { role: null, error: error.message };
  }
}
