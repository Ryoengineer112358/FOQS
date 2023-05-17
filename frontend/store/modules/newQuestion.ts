import { Tutor } from "@/types";
import axios from "@/lib/axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export type NewQuestion = {
  content: string;
  tutorId?: number;
}
// Reducers
const slice = createSlice({
  name: 'newQuestion',
  initialState: null as NewQuestion | null,
  reducers: {
    setContent: (state, action) => {
      return { content: action.payload, tutorId: state?.tutorId }
    },
    setTutorId: (state, action) => {
      //ローカルストレージに保存
      if (action.payload === null) {
        localStorage.removeItem('tutorId')
      } else {
        localStorage.setItem('tutorId', action.payload.toString())
      }

      return { content: state?.content ?? '', tutorId: action.payload }
    },
  }
});
// Action Creators
export const {setContent, setTutorId} = slice.actions;

export default slice.reducer;
