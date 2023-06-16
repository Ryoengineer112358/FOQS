import { Tutor } from '@/types'
import { set, get, del, clear } from 'idb-keyval'
import axios from '@/lib/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { csrf } from '@/hooks/auth'

export type NewQuestion = {
  text: string
  images: string[]
  tutorId?: number
}

const initialState: NewQuestion = {
  text: '',
  images: [],
  tutorId: undefined,
}

export const submitQuestion = createAsyncThunk(
  'newQuestion/submitQuestion',
  async (_, { getState }) => {
    const state = getState() as { newQuestion: NewQuestion }
    if (state?.newQuestion) {
      await csrf()
      const params = new FormData()
      params.append('text', state.newQuestion.text)
      params.append('tutor_id', state.newQuestion.tutorId?.toString() ?? '')

      const imagesUploadPromises = state.newQuestion.images.map(
        async (imgUrl, index) => {
          const imageBlob = await fetch(imgUrl).then((res) => res.blob())
          const fileName = `image_${index}`
          params.append(`images[${index}]`, imageBlob, fileName)
        },
      )
      await Promise.all(imagesUploadPromises)
      const response = await axios.post('/api/questions', params)

      return response.data
    }
  },
)

// Reducers
let isRemoving = false

export const removeImage = createAsyncThunk(
  'newQuestion/removeImage',
  async (indexToRemove: number, { getState }) => {
    // Check if already removing, if so, exit early
    if (isRemoving) return
    isRemoving = true

    try {
      const state = getState() as { newQuestion: NewQuestion }
      const newImages = state.newQuestion.images.filter(
        (_, index) => index !== indexToRemove,
      )

      // Delete the item at the index
      await del(indexToRemove)

      // Shift down the keys for items above the index
      for (
        let i = indexToRemove + 1;
        i < state.newQuestion.images.length;
        i++
      ) {
        const imageBlob = await get(i)
        await set(i - 1, imageBlob)
        await del(i)
      }

      return {
        text: state.newQuestion.text,
        images: newImages,
        tutorId: state.newQuestion.tutorId,
      }
    } finally {
      // Allow future removals
      isRemoving = false
    }
  },
)

const slice = createSlice({
  name: 'newQuestion',
  initialState: initialState,
  reducers: {
    setText: (state, action) => {
      localStorage.setItem('questionText', action.payload)
      return {
        text: action.payload,
        images: state.images,
        tutorId: state.tutorId,
      }
    },
    setImages: (state, action) => {
      action.payload.map(async (imgUrl: string, index: number) => {
        const imageBlob = await fetch(imgUrl).then((res) => res.blob())
        await set(index, imageBlob)
      })
      return {
        text: state.text,
        images: action.payload,
        tutorId: state.tutorId,
      }
    },
    setTutorId: (state, action) => {
      //ローカルストレージに保存
      if (action.payload === null) {
        localStorage.removeItem('tutorId')
      } else {
        localStorage.setItem('tutorId', action.payload.toString())
      }

      return { text: state.text, images: state.images, tutorId: action.payload }
    },
    clearNewQuestion: () => {
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeImage.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(submitQuestion.fulfilled, () => {
      localStorage.removeItem('questionText')
      localStorage.removeItem('tutorId')
      clear()
      return { ...initialState }
    })
    builder.addCase(submitQuestion.rejected, (state, action) => {
      console.log(action.error)
      return state
    })
  },
})
// Action Creators
export const { setText, setImages, setTutorId, clearNewQuestion } =
  slice.actions

export default slice.reducer
