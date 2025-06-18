import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import type { MessageType, ChatPersona } from './types'
import { useNavigate } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

interface ChatMessageProps {
  message: MessageType
  persona: ChatPersona
  currentUserId: number
}

export default function ChatMessage({ message, persona, currentUserId }: ChatMessageProps) {
  const isCurrentUser = message.senderId === currentUserId
  const navigate = useNavigate()

  // 첫 글자 가져오는 함수
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?'
  }

  const prepareMacroData = (macros: { carbs: number; protein: number; fat: number }) => {
    return [
      { name: "탄수화물", value: macros.carbs, color: "#3b82f6" },
      { name: "단백질", value: macros.protein, color: "#10b981" },
      { name: "지방", value: macros.fat, color: "#f59e0b" },
    ]
  }

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3 cursor-pointer" onClick={() => navigate("/persona-profile/1")}>
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={persona.avatar || '/placeholder.svg'} alt={persona.name} />
            <AvatarFallback className={`bg-${persona.color}-200 text-${persona.color}-700`}>
              {getInitials(persona.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && (
          <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">{persona.name}</span>
        )}

        <div className="flex items-end gap-1">
          {isCurrentUser && (
            <div className="flex flex-col justify-end items-end mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="ml-1">{message.isRead ? '읽음' : '1'}</span>
              <span>{format(message.timestamp, 'HH:mm')}</span>
            </div>
          )}

          {/* text 채팅이면 채팅 ui*/}
          {message.content && (
            <div
              className={`rounded-lg px-4 py-2 ${
                isCurrentUser
                  ? 'bg-orange-700 text-white text-left rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          )}

          {/* 음식 분석 결과 메시지 */}
          {message.foodAnalysis && (
            <div
              className={`rounded-lg overflow-hidden w-full max-w-[280px] ${
                isCurrentUser
                  ? "bg-orange-700 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {/* 음식 이미지 */}
              <div className="relative w-full h-32">
                <img
                  src={message.foodAnalysis.image || "/placeholder.svg?height=128&width=280&query=delicious food"}
                  alt={message.foodAnalysis.foodName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex justify-between items-end">
                    <h3 className="font-medium text-white">{message.foodAnalysis.foodName}</h3>
                    <span className="text-white text-sm font-bold">{message.foodAnalysis.calories} kcal</span>
                  </div>
                </div>
              </div>

              {/* 영양소 그래프 및 정보 */}
              <div className="p-3">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4
                      className={`text-sm font-medium ${isCurrentUser ? "text-white" : "text-gray-900 dark:text-gray-100"}`}
                    >
                      영양소 구성
                    </h4>
                  </div>

                  <div className="flex items-center">
                    {/* 영양소 그래프 */}
                    <div className="w-24 h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={prepareMacroData(message.foodAnalysis.macronutrients)}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {prepareMacroData(message.foodAnalysis.macronutrients).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}g`, ""]}
                            contentStyle={{
                              backgroundColor: isCurrentUser ? "#7c2d12" : "#e5e7eb",
                              borderColor: "transparent",
                              color: isCurrentUser ? "white" : "black",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* 영양소 범례 */}
                    <div className="ml-2 flex flex-col gap-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                        <span
                          className={`text-xs ${isCurrentUser ? "text-blue-200" : "text-blue-700 dark:text-blue-300"}`}
                        >
                          탄수화물 {message.foodAnalysis.macronutrients.carbs}g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span
                          className={`text-xs ${isCurrentUser ? "text-green-200" : "text-green-700 dark:text-green-300"}`}
                        >
                          단백질 {message.foodAnalysis.macronutrients.protein}g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                        <span
                          className={`text-xs ${isCurrentUser ? "text-amber-200" : "text-amber-700 dark:text-amber-300"}`}
                        >
                          지방 {message.foodAnalysis.macronutrients.fat}g
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주요 재료 */}
                <div className="mb-3">
                  <h4
                    className={`text-sm font-medium mb-1 ${isCurrentUser ? "text-white" : "text-gray-900 dark:text-gray-100"}`}
                  >
                    주요 재료
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {message.foodAnalysis.ingredients.map((ingredient, index) => (
                      <Badge
                        key={index}
                        variant={isCurrentUser ? "outline" : "secondary"}
                        className={isCurrentUser ? "border-orange-300 text-orange-100" : ""}
                      >
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 코멘트 */}
                <p className={`text-xs ${isCurrentUser ? "text-orange-100" : "text-gray-700 dark:text-gray-300"}`}>
                  {message.foodAnalysis.comment}
                </p>
              </div>
            </div>
          )}

          {/* 만약 사진이 있으면 사진 ui */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-1">
              {message.attachments.map((url, index) => (
                <img
                  key={index}
                  src={url || '/placeholder.svg'}
                  alt="Attachment"
                  className="max-w-[200px] max-h-[200px] rounded-md mt-1"
                />
              ))}
            </div>
          )}

          {!isCurrentUser && (
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{format(message.timestamp, 'HH:mm')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
