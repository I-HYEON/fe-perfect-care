interface ProfileHistoryPreviewProps {
    previewImage: string,
    totalCount: number,
    onViewAll: () => void
}

export default function ProfileHistoryPreview({ previewImage, totalCount, onViewAll }:ProfileHistoryPreviewProps) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <h3 className="text-sm text-left font-medium text-gray-500 dark:text-gray-300 mb-3">프로필 히스토리</h3>
        <div
          className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={onViewAll}
        >
          <div className="w-14 h-14 rounded-lg overflow-hidden mr-3">
            <img
              src={previewImage || "/placeholder.svg?height=200&width=200&query=profile picture"}
              alt="프로필 히스토리"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left text-gray-600 dark:text-gray-400">
            <p className="text-sm font-medium">총 {totalCount}장</p>
            <p className="text-xs">터치하여 모두 보기</p>
          </div>
        </div>
      </div>
    )
  }
  