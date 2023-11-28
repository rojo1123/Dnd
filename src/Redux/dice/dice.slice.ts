import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum RollTypes { roll, disadvantage, advantage};
export enum RollState {success = 'success',failure = 'failure',normal='normal'}
export type Dice = {name: string, maxValue: number, amount: number, state: RollState, rollType: RollTypes}

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

const calculateRollStrategy = {
    [RollTypes.roll]: calculateRoll,
    [RollTypes.advantage]: calculateRollWithAdvantage,
    [RollTypes.disadvantage]: calculateRollWithDisadvantage,
}

const calculateRollState = (dice: Dice, value: number): RollState  => {
    if(dice.maxValue === value)
        return RollState.success
    if(value === 1)
        return RollState.failure

    return RollState.normal
}

const initialState: DiceState = {
    dices: [
        {name: 'D4', maxValue: 4, amount: 0, state: RollState.success, rollType: RollTypes.roll},
        {name: 'D6', maxValue: 6, amount: 0, state: RollState.success,  rollType: RollTypes.roll},
        {name: 'D10', maxValue: 10, amount: 0, state: RollState.success,  rollType: RollTypes.roll },
        {name: 'D12', maxValue: 12, amount: 0, state: RollState.success,  rollType: RollTypes.roll },
        {name: 'D20', maxValue: 20, amount: 0, state: RollState.success,  rollType: RollTypes.roll},
        {name: 'D20 advantage', maxValue: 20, amount: 0, state: RollState.success,  rollType: RollTypes.advantage},
        {name: 'D20 disadvantage', maxValue: 20, amount: 0, state: RollState.success,  rollType: RollTypes.disadvantage},
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
                    const roll = calculateRollStrategy[dice.rollType](dice);
                    sum += roll;
                    state.results.push({dice: {...dice, state: calculateRollState(dice, roll)}, value: roll})
                }
            })

            state.sum = sum;
        }
    }
})


export const {updateDice, roll } = diceSlice.actions;
export default diceSlice.reducer