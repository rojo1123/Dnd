import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModifierSet } from "./modifier.types";
import { DefaultClass, setClass } from "../class/class.slice";

interface ModifierState {
    modifiers: ModifierSet
}

const initialState: ModifierState = {
    modifiers:  DefaultClass.modifiers
}

const ModifierSlice = createSlice({
    name: 'Modifier',
    initialState,
    reducers: {
        setModifier(state, action: PayloadAction<{index: number, value: number}>){
            const {index, value} = action.payload;
            state.modifiers[index].value = value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setClass, (state, action) => {
            state.modifiers = action.payload.selectedClass.modifiers
        })
    }
})


export const { setModifier  } = ModifierSlice.actions;
export default ModifierSlice.reducer