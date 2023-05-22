import { Tutor } from "@/types";
import axios from "@/lib/axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { csrf } from "@/hooks/auth";

export type NewQuestion = {
  content: string;
  tutorId?: number;
}

const initialState: NewQuestion | null = null

export const submitQuestion = createAsyncThunk(
  'newQuestion/submitQuestion',
  async (_, { getState }) => {
    const state = getState() as { newQuestion: NewQuestion }
    if (state?.newQuestion) {
      await csrf()
      const response = await axios.post('/api/questions', {
        content: state.newQuestion.content,
        tutor_id: state.newQuestion.tutorId,
      })
      return response.data
    }
  }
)

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
    clearNewQuestion: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(submitQuestion.fulfilled, () => {
      localStorage.removeItem('questionContent')
      localStorage.removeItem('tutorId')
      return initialState
  })
  },
});
// Action Creators
export const {setContent, setTutorId, clearNewQuestion} = slice.actions;

export default slice.reducer;
