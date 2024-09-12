import { configureStore } from '@reduxjs/toolkit';
import pizzaFormReducer from './pizzaFormSlice';

 export const store = configureStore({
  reducer: {
    pizzaForm: pizzaFormReducer,
  },
});


export const resetStore = () => configureStore({
  reducer: {
    pizzaForm: pizzaFormReducer,
  }
})