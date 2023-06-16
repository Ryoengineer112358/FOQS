import { combineReducers } from 'redux'
import { Tutor } from '@/types'
import tutorsReducer from './modules/tutors'
import newQuestionReducer from './modules/newQuestion'
import { NewQuestion } from './modules/newQuestion'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export type State = {
  tutors: Tutor[]
  newQuestion?: NewQuestion
}

export const store = configureStore({
  reducer: combineReducers({
    tutors: tutorsReducer,
    newQuestion: newQuestionReducer,
  }),
})
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
