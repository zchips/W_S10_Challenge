import { configureStore } from '@reduxjs/toolkit';
import { api } from './api'; 
import filterReducer from './pizzaFormSlice'; // 

// Function to configure and return the store
export const resetStore = () => 
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer, // Use dynamic key for API slice
      filter: filterReducer, // Direct reference to filter reducer
    },
    // Combine default and api-specific middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware), // Efficient use of RTK Query middleware
  });

// Initialize the store using the resetStore function
export const store = resetStore();
