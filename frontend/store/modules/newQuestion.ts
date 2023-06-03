import { Tutor } from "@/types";
import axios from "@/lib/axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { csrf } from "@/hooks/auth";

export type NewQuestion = {
  text: string;
  images: string[];
  tutorId?: number;
}

const initialState: NewQuestion | null = null

export const submitQuestion = createAsyncThunk(
  'newQuestion/submitQuestion',
  async (_, { getState }) => {
    const state = getState() as { newQuestion: NewQuestion }
    if (state?.newQuestion) {
      await csrf()
      const params = new FormData()
      params.append('text', state.newQuestion.text)
      params.append('tutor_id', state.newQuestion.tutorId?.toString() ?? '')
      
      const imagesPromises = state.newQuestion.images.map(async (imgUrl, index) => {
        const imageBlob = await fetch(imgUrl).then(res => res.blob())
        const fileName = `image_${Date.now()}_${index}.jpg`;
        params.append(`images[${index}]`, imageBlob, fileName)
      })
      await Promise.all(imagesPromises)
      const response = await axios.post('/api/questions', params)
      
      return response.data
    }
  }
)

// Reducers
const slice = createSlice({
  name: 'newQuestion',
  initialState: null as NewQuestion | null,
  reducers: {
    setText: (state, action) => {
      localStorage.setItem('questionText', action.payload)
      return { text: action.payload, images: state?.images ?? [], tutorId: state?.tutorId }
    },
    setImages: (state, action) => {
      return { text: state?.text ?? '', images: action.payload, tutorId: state?.tutorId }
    },
    setTutorId: (state, action) => {
      //ローカルストレージに保存
      if (action.payload === null) {
        localStorage.removeItem('tutorId')
      } else {
        localStorage.setItem('tutorId', action.payload.toString())
      }

      return { text: state?.text ?? '', images: state?.images ?? [], tutorId: action.payload }
    },
    clearNewQuestion: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(submitQuestion.fulfilled, () => {
      localStorage.removeItem('questionText')
      localStorage.removeItem('tutorId')
      return initialState
  })
    builder.addCase(submitQuestion.rejected, (state, action) => {
      console.log(action.error)
      return state
  })}
});
// Action Creators
export const {setText, setImages, setTutorId, clearNewQuestion} = slice.actions;

export default slice.reducer;
