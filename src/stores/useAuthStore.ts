import { User } from '@/types/user/type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 인증 관련 인터페이스 정의
interface AuthState {
  // 상태
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // 액션들
  setAccessToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  login: (token: string, user: User) => void
  logout: () => void
  clearAuth: () => void
}

// Auth Store 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      // 액세스 토큰 설정
      setAccessToken: (token) => {
        set({ 
          accessToken: token,
          isAuthenticated: !!token
        })
      },
      
      // 사용자 정보 설정
      setUser: (user) => {
        set({ user })
      },
      
      // 로딩 상태 설정
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      
      // 로그인 처리
      login: (token, user) => {
        set({
          accessToken: token,
          user,
          isAuthenticated: true,
          isLoading: false
        })
      },
      
      // 로그아웃 처리
      logout: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      },
      
      // 인증 정보 완전 삭제 (에러 시 사용)
      clearAuth: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      // 저장할 상태만 선택 (보안을 위해 필요한 것만)
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)