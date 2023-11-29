import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RPGClass } from "./class.types";
import { Bard, Warlock, Warrior } from "./classes";

interface ClassState {
    selectedClass: RPGClass
    selectedIndex: number;
    availableClasses: RPGClass[]
}

const initialState: ClassState = {
    selectedClass: Bard,
    selectedIndex: 0,
    availableClasses: [
        Bard,
        Warlock,
        Warrior
    ]
}

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        setClass(state, action: PayloadAction<number>){
            state.selectedIndex = action.payload;
            state.selectedClass = state.availableClasses[action.payload]
        }
    }
})


export const { setClass  } = classSlice.actions;
export default classSlice.reducer