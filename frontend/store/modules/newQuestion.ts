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
    update: (state, action) => {
      return action.payload;
    }
  },
});
// Action Creators
export const {update} = slice.actions;

export default slice.reducer;
