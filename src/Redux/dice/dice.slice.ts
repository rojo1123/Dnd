import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum RollTypes { roll, disadvantage, advantage};
export enum RollState {success = 'success',failure = 'failure',normal='normal'}
export type Dice = {name: string, maxValue: number, amount: number, state: RollState, rollType: RollTypes}

type DiceState = {
    dices: Dice[],
    results: {dice: Dice, value: number}[]
    sum: number;
    maxDice: number;
    usedDice: number;
}

const calculateRoll = (dice: Dice) => {
    return Math.floor(Math.random() * dice.maxValue) + 1;
}

const calculateRollWithAdvantage = (dice: Dice) => {
    return Math.max(calculateRoll(dice), calculateRoll(dice))
}

const calculateRollWithDisadvantage = (dice: Dice) => {
    return Math.min(calculateRoll(dice), calculateRoll(dice))
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

const createDice = (name: string, faces: number) => {
    return {name, maxValue: faces,amount: 0, state: RollState.success, rollType: RollTypes.roll}}

const initialState: DiceState = {
    dices: [
        createDice('D4', 4),
        createDice('D6', 6),
        createDice('D10', 10),
        createDice('D12', 12),
        createDice('D20', 20),
    ],
    results: [],
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
        },
        setRollType(state, action: PayloadAction<{index: number, rollType: RollTypes}>){
            const {index, rollType} = action.payload;
            state.dices[index].rollType = rollType;
        }
    }
})


export const {updateDice, roll, setRollType } = diceSlice.actions;
export default diceSlice.reducer