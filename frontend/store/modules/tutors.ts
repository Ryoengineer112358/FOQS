import { Tutor } from "@/types";
import axios from "@/lib/axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// Reducers
const slice = createSlice({
  name: 'tutors',
  initialState: [] as Tutor[],
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTutors.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

// Action Creators
// export const { updateTutors } = slice.actions

// Operations
export const fetchTutors = createAsyncThunk(
    'tutors/fetchTutors',
    async () => {
      const response = await axios.get<Tutor[]>('/api/tutors')
      return response.data
  }
)

export default slice.reducer;
