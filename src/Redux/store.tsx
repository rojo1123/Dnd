import { configureStore } from "@reduxjs/toolkit";
import diceReducer from "./dice/dice.slice";
import modifierReducer from './modifiers/modifier.slice'
import classReducer from './class/class.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        dice: diceReducer,
        modifier: modifierReducer,
        class: classReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;