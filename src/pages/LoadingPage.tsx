import { Loader2 } from 'lucide-react'

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    </div>
  )
}
