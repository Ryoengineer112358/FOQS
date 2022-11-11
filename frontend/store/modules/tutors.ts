import { Tutor } from "../../types";
import axios from "../../lib/axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// Reducers
const slice = createSlice({
  name: 'tutors',
  initialState: [],
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
      const responce = await axios.get('/api/tutors')
      return responce.data.map((x: Tutor) => x)
  }
)

export default slice.reducer;
