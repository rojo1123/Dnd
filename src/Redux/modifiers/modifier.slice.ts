import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Modifier = {name: string, value: number}

interface ModifierState {
    modifiers: Modifier[]
}

const initialState: ModifierState = {
    modifiers: [
        {name: 'strength', value: 10},
        {name: 'dex', value: 10},
        {name: 'con', value: 10},
        {name: 'int', value: 10},
        {name: 'wis', value: 10},
        {name: 'cha', value: 10}
    ]
}

const ModifierSlice = createSlice({
    name: 'Modifier',
    initialState,
    reducers: {
        setModifier(state, action: PayloadAction<{index: number, value: number}>){
            const {index, value} = action.payload;
            state.modifiers[index].value = value;
        }
    }
})


export const { setModifier  } = ModifierSlice.actions;
export default ModifierSlice.reducer