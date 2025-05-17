import PersonaItem, { Persona } from "./PersonaItem"

interface PersonaListProps {
  personas: Persona[]
}

export default function PersonaList({ personas }: PersonaListProps) {
  return (
    <div className="space-y-1">
      {personas.length > 0 ? (
        personas.map((persona) => <PersonaItem key={persona.id} persona={persona} />)
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">검색 결과가 없습니다</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">다른 키워드로 검색해보세요</p>
        </div>
      )}
    </div>
  )
}
