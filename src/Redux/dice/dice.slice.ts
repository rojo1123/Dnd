import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Dice, RollTypes } from "./dice.types";
import { calculateRoll, calculateRollState, createDice } from "./dice.helpers";

type DiceState = {
    dices: Dice[],
    results: {dice: Dice, value: number, total: number, modifier: number[], extraRolls: number[]}[],
    rollType: RollTypes;
    sum: number;
    maxDice: number;
    usedDice: number;
}

const initialState: DiceState = {
    dices: [
        createDice('D4', 4),
        createDice('D6', 6),
        createDice('D10', 10),
        createDice('D12', 12),
        createDice('D20', 20),
    ],
    results: [],
    rollType: RollTypes.roll,
    sum: 0,
    maxDice: 10,
    usedDice: 0,
}

const diceSlice = createSlice({
    name: 'dice',
    initialState,
    reducers: {
        updateDice(state, action: PayloadAction<{index: number, amount: number}>){
            const {index, amount} = action.payload;
            state.dices[index].amount = Math.min(state.maxDice, Math.max(0, state.dices[index].amount + amount));
            state.usedDice += amount;
        },
        roll(state, action: PayloadAction<{modifier: number}>){
            let sum = 0;
            state.results = [];
            const {modifier} = action.payload;

            state.dices.forEach(dice => {
                for(let i = 0; i < dice.amount; i++){
                    const {roll, extraRolls} = calculateRoll(dice, state.rollType);
                    const total = roll + modifier
                    sum += total;
                    state.results.push({dice: 
                        {...dice, state: calculateRollState(dice, roll)}, 
                        value: roll, 
                        total, 
                        extraRolls, 
                        modifier: [modifier].filter(x => x !== 0)})
                }
            })

            state.sum = sum;
        },
        setRollType(state, action: PayloadAction<{rollType: RollTypes}>){
            const {rollType} = action.payload;
            if(state.rollType === rollType) {
                state.rollType = RollTypes.roll;
                return
            }
            state.rollType = rollType;
        }
    }
})


export const {updateDice, roll, setRollType } = diceSlice.actions;
export default diceSlice.reducer