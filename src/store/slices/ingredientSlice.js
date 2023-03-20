import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    total: 0
}

const ingredientSlice = createSlice({
    name: 'ingrediens',
    initialState,
    reducers: {
        addIngredient(state, action){
            state.ingredients[action.payload.ingType]++;
            state.total+=action.payload.ingPrice;
        },
        removeIngredient(state, action){
            state.ingredients[action.payload.ingType]--;
            state.total-=action.payload.ingPrice;
        },
        clearIngredients(){
            return {
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                total: 0
            }
        }
    }
});

export const {addIngredient, removeIngredient, clearIngredients} = ingredientSlice.actions;

export default ingredientSlice.reducer;