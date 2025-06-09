import { DietData } from '@/types/calendar/type'
import { format } from 'date-fns'

// 샘플 식단 데이터
export const sampleDietData: DietData = {
  [format(new Date(), 'yyyy-MM-dd')]: [
    {
      id: '1',
      type: 'breakfast',
      foods: ['토스트', '계란', '우유'],
      calories: 350,
      time: '08:00',
      notes: '집에서 간단하게'
    },
    {
      id: '2',
      type: 'lunch',
      foods: ['김치찌개', '밥', '김치', '나물'],
      calories: 520,
      time: '12:30'
    },
    {
      id: '3',
      type: 'snack',
      foods: ['사과', '견과류'],
      calories: 180,
      time: '15:30'
    }
  ],
  [format(new Date(Date.now() - 86400000), 'yyyy-MM-dd')]: [
    {
      id: '4',
      type: 'breakfast',
      foods: ['시리얼', '우유', '바나나'],
      calories: 280,
      time: '07:45'
    },
    {
      id: '5',
      type: 'lunch',
      foods: ['비빔밥', '된장국'],
      calories: 480,
      time: '13:00'
    },
    {
      id: '6',
      type: 'dinner',
      foods: ['삼겹살', '상추', '쌈장', '밥'],
      calories: 650,
      time: '19:30',
      notes: '회식'
    }
  ]
}
