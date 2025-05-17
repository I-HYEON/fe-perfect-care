import ChatPage from '@/pages/ChatPage'
import ChatsPage from '@/pages/ChatsPage'
import HomePage from '@/pages/HomePage'
import PersonasPage from '@/pages/PersonasPage'
import SettingsPage from '@/pages/SettingsPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import PersonaProfilePage from '@/pages/PersonaProfilePage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import MyPage from '@/pages/MyPage'
import AdminPage from '@/pages/AdminPage'
import SignupPage from '@/pages/SignupPage'
import TabBar from './TabBar'

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/chat/:personaId" element={<ChatPage />} />
        <Route path="/persona-profile/:personaId" element={<PersonaProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <TabBar />
    </>
  )
}
