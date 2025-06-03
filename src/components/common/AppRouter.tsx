import ChatPage from '@/pages/ChatPage'
import HomePage from '@/pages/HomePage'
import PersonasPage from '@/pages/PersonasPage'
import SettingsPage from '@/pages/SettingsPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import PersonaProfilePage from '@/pages/PersonaProfilePage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import SignupPage from '@/pages/SignupPage'
import TabBar from './TabBar'
import { useAuthStore } from '@/stores/useAuthStore'
import LoadingPage from '@/pages/LoadingPage'
import DashboardPage from '@/pages/DashboardPage'
import CalendarPage from '@/pages/CalendarPage'
import MyPage from '@/pages/MyPage'

interface ProtectedRouteProps {
  children: React.ReactNode
}

// 보호 라우트 (로그인하지 않은 사용자는 접근 불가)
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore()

  // 토큰은 있지만 인증 상태가 false인 경우 (새로고침 시)
  // 이 경우는 axios 인터셉터나 PrivateRoute 컴포넌트에서 처리할 수도 있음

  if (isLoading) {
    return <LoadingPage />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// 공개 라우트 (로그인한 사용자는 접근 불가)
const PublicOnlyRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isAuthenticated) {
    return <Navigate to="/me" replace /> // 로그인된 사용자의 기본 페이지
  }

  return <>{children}</>
}

export default function AppRouter() {
  const { isAuthenticated } = useAuthStore()

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/personas"
          element={
            <ProtectedRoute>
              <PersonasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/persona-profile/:personaId"
          element={
            <ProtectedRoute>
              <PersonaProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* TabBar는 인증된 사용자에게만 표시 */}
      {isAuthenticated && <TabBar />}
    </>
  )
}
