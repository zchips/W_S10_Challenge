import { configureStore } from '@reduxjs/toolkit'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    // add your own reducers here
  },
})

export const store = resetStore()
