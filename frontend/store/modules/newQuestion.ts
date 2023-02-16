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
      // return {content: action.payload};
    },
    setTutorId: (state, action) => {
      return { content: state?.content ?? '', tutorId: action.payload }
      // return state ?
      //   {content: state.content, tutorId: action.payload}
      // : {content: "", tutorId: action.payload};
    },
  }
});
// Action Creators
export const {setContent, setTutorId} = slice.actions;

export default slice.reducer;
