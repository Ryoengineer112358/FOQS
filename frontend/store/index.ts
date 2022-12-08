import { combineReducers } from "redux";
import { Tutor } from "@/types"
import tutorsReducer from "./modules/tutors"
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";

export type State = {
  tutors: Tutor[];
}

export const store = configureStore({
  reducer: combineReducers({
    tutors: tutorsReducer,
  })
})
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()