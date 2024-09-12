import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    size: '',
    toppings: [],
};

const pizzaFormSlice = createSlice({
    name: 'pizzaForm',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setSize: (state, action) => {
            state.size = action.payload;
        },
        toggleTopping: (state, action) => {
            const topping = action.payload;
            if (state.toppings.includes(topping)) {
                state.toppings = state.toppings.filter(t => t !== topping);
            } else {
                state.toppings.push(topping);
            }
        },
    },
});

export const { setName, setSize, toggleTopping } = pizzaFormSlice.actions;

export default pizzaFormSlice.reducer;
