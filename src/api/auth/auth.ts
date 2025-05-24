import { useAuthStore } from '@/stores/useAuthStore'
import apiClient from '../api'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/types/api/type'

// 로그인 요청 타입
interface LoginRequest {
  phone_number: string
  password: string
  remember_me: boolean
}

// 회원가입 요청 타입
interface RegisterRequest {
  phone_number: string
  password: string
  name: string
}

// 로그인 응답 타입
interface LoginResult {
  access_token: string
  user: {
    id: string
    phone_number: string
  }
}

// 로그인 응답 타입
type LoginResponse = ApiResponse<LoginResult>

// 로그인 API
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    useAuthStore.getState().setLoading(true)

    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)

    // 로그인 성공 시 zustand에 저장
    const { access_token, user } = response.data.result
    useAuthStore.getState().login(access_token, user)

    return response.data
  } catch (error) {
    useAuthStore.getState().setLoading(false)
    throw error
  }
}

// 회원가입 API
export const registerApi = async (userData: RegisterRequest): Promise<LoginResponse> => {
  try {
    useAuthStore.getState().setLoading(true)

    const response = await apiClient.post<LoginResponse>('/auth/register', userData)

    // 회원가입 성공 시에도 자동 로그인 처리
    const { access_token, user } = response.data.result
    useAuthStore.getState().login(access_token, user)

    return response.data
  } catch (error) {
    useAuthStore.getState().setLoading(false)
    throw error
  }
}

// 로그아웃 API
export const logoutApi = async (): Promise<void> => {
  let serverError = null
  try {
    // 서버에 로그아웃 요청 (refreshToken 쿠키 삭제를 위해)
    await apiClient.post('/auth/logout')
  } catch (error) {
    // 서버 에러가 있어도 클라이언트 측 로그아웃은 진행
    console.error('로그아웃 서버 요청 실패:', error)
    serverError = error
  } finally {
    // zustand에서 인증 정보 삭제
    useAuthStore.getState().logout()
  }

  // 서버 에러가 있었다면 다시 throw
  if (serverError) {
    throw serverError
  }
}

// 사용자 정보 조회 API
export const getMeApi = async () => {
  try {
    const response = await apiClient.get('/auth/me')

    // 사용자 정보 업데이트
    useAuthStore.getState().setUser(response.data.user)

    return response.data
  } catch (error) {
    // AxiosError로 타입 단언
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    throw error
  }
}
