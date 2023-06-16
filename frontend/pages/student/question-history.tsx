import type { NextPage } from 'next'
import * as QuestionHistoryComponent from '@/components/Pages/QuestionHistory'

const QuestionHistory: NextPage = () => {
  return <QuestionHistoryComponent.default middleware='student' />
}

export default QuestionHistory
