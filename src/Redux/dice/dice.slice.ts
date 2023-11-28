import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type Dice = {name: string, maxValue: number, amount: number, state: RollState, calcFn: (dice: Dice) => number, calcState: (dice: Dice, value: number) => RollState}
export type RollState = 'success' | 'failure' | 'normal';

type DiceState = {
    dices: Dice[],
    results: {dice: Dice, value: number}[]
    sum: number;
}

const calculateRoll = (dice: Dice) => {
    return Math.floor(Math.random() * dice.maxValue) + 1;
}

const calculateRollWithAdvantage = (dice: Dice) => {
    return Math.max(calculateRoll(dice), calculateRoll(dice))
}

const calculateRollWithDisadvantage = (dice: Dice) => {
    return Math.max(calculateRoll(dice), calculateRoll(dice))
}

const calculateRollState = (dice: Dice, value: number): RollState  => {
    if(dice.maxValue === value)
        return 'success'
    if(value === 1)
        return 'failure'

    return 'normal';
}

const initialState: DiceState = {
    dices: [
        {name: 'D4', maxValue: 4, amount: 0, state: 'normal', calcFn: calculateRoll, calcState: calculateRollState},
        {name: 'D6', maxValue: 6, amount: 0, state: 'normal', calcFn: calculateRoll, calcState: calculateRollState},
        {name: 'D10', maxValue: 10, amount: 0, state: 'normal', calcFn: calculateRoll, calcState: calculateRollState},
        {name: 'D12', maxValue: 12, amount: 0, state: 'normal', calcFn: calculateRoll, calcState: calculateRollState},
        {name: 'D20', maxValue: 20, amount: 0, state: 'normal', calcFn: calculateRoll, calcState: calculateRollState},
        {name: 'D20 advantage', maxValue: 20, amount: 0, state: 'normal', calcFn: calculateRollWithAdvantage, calcState: calculateRollState},
        {name: 'D20 disadvantage', maxValue: 20, amount: 0, state: 'normal', calcFn: calculateRollWithDisadvantage, calcState: calculateRollState},
    ],
    results: [],
    sum: 0,
}

const diceSlice = createSlice({
    name: 'dice',
    initialState,
    reducers: {
        updateDice(state, action: PayloadAction<{index: number, amount: number}>){
            const {index, amount} = action.payload;
            state.dices[index].amount = amount;
        },
        roll(state){
            let sum = 0;
            state.results = [];

            state.dices.forEach(dice => {
                for(let i = 0; i < dice.amount; i++){
                    const roll = dice.calcFn(dice);
                    sum += roll;
                    state.results.push({dice: {...dice, state: dice.calcState(dice, roll)}, value: roll})
                }
            })

            state.sum = sum;
        }
    }
})


export const {updateDice, roll } = diceSlice.actions;
export default diceSlice.reducer