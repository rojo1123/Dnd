import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RPGClass } from "./class.types";
import { Bard, Paladin, Rogue, Warlock, Warrior, Monk } from "./classes";

interface ClassState {
    selectedClass: RPGClass;
    selectedIndex: number;
    availableClasses: RPGClass[];
}

export const DefaultClass = Bard;

const initialState: ClassState = {
    selectedClass: DefaultClass,
    selectedIndex: 0,
    availableClasses: [
        Bard,
        Warlock,
        Warrior,
        Rogue,
        Paladin,
        Monk
    ],
}

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        setClass(state, action: PayloadAction<{selectedClass: RPGClass, selectedIndex: number}>){
            const {selectedClass, selectedIndex} = action.payload;
            state.selectedClass = selectedClass;
            state.selectedIndex = selectedIndex;
        }
    }
})


export const { setClass  } = classSlice.actions;
export default classSlice.reducer