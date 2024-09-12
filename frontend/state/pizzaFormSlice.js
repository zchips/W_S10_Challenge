import { createSlice } from '@reduxjs/toolkit';

// Create a slice for managing the size filter in the pizza form
const pizzaFormSlice = createSlice({
  name: 'pizzaForm', // Clear and consistent slice name
  initialState: { filter: 'All' }, // Initial filter state

  reducers: {
    // Reducer to set the size filter
    setFilter: (state, action) => {
      state.filter = action.payload; // Assign payload directly to the filter state
    },
  },
});

// Export the reducer for store configuration
export default pizzaFormSlice.reducer;

// Export the action creators for component dispatching
export const { setFilter } = pizzaFormSlice.actions;
