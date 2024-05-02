import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "../store/store";

export interface InputValues {
    _id?: string;
    name: string;
    age: string;
    position: string;
    gender: string;
    terms: boolean;
}

interface InputState {
    values: InputValues[];
}

const initialState: InputState = {
    values: [],
};

const valueSclice = createSlice({
    name: 'value',
    initialState,
    reducers:{
        setItem(state, action: PayloadAction<InputValues[]>) {
            state.values = action.payload;
          },
          addItem(state, action: PayloadAction<InputValues>) {
            state.values.push(action.payload);
          },
          updateItem(state, action: PayloadAction<{ index: number; value: InputValues }>) {
            state.values[action.payload.index] = action.payload.value;
          },
          deleteItem(state, action: PayloadAction<string>) {
            state.values = state.values.filter(value => value._id !== action.payload);
          },
    }
});


export const {setItem, addItem, updateItem, deleteItem} = valueSclice.actions;
export const selectvalues = (state: rootState)=> state.value.values;
export default valueSclice.reducer;