export interface User {
  id: string
  phone_number: string
  name?: string | null
  email?: string | null
  role?: string
  is_notification_enabled?: boolean
}