import { useAuthStore } from '@/stores/useAuthStore'
import axios, { AxiosResponse, AxiosError } from 'axios'

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키 전송을 위해 필요
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor(요청 가로채기)
apiClient.interceptors.request.use(
  async (config) => {
    // zustand에서 토큰 가져오기
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // 요청 로깅 (개발 환경에서만)
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.log('🚀 API 요청:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data
      })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor(응답 가로채기)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답에서 새로운 accessToken이 있다면 zustand에 저장
    if (response.data?.accessToken) {
      useAuthStore.getState().setAccessToken(response.data.accessToken)
    }

    // 성공 응답 로깅 (개발 환경에서만)
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.log('✅ API 응답:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      })
    }

    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    // 에러 중 401 에러 처리 (액세스 토큰 만료)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // refreshToken은 쿠키로 자동 전송됨 (별도 axios 인스턴스 사용)
        const refreshResponse = await axios.create({
          baseURL: import.meta.env.VITE_API_URL,
          withCredentials: true
        }).post('/auth/refresh')

        const { accessToken } = refreshResponse.data
        
        // zustand에 새로운 토큰 저장
        useAuthStore.getState().setAccessToken(accessToken)

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // 토큰 갱신 실패시 zustand를 통해 로그아웃 처리
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // 전체 에러 로깅 (개발 환경에서만)
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.error('❌ API Error 발생:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data
      })
    }

    return Promise.reject(error)
  }
)

export default apiClient
