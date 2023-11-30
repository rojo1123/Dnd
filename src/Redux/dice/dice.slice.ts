import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum RollTypes { roll, disadvantage, advantage};
export enum RollState {success = 'success',failure = 'failure',normal='normal'}
export type Dice = {name: string, maxValue: number, amount: number, state: RollState, rollType: RollTypes}

type DiceState = {
    dices: Dice[],
    results: {dice: Dice, value: number, total: number, modifier: number[], extraRolls: number[]}[],
    rollType: RollTypes;
    sum: number;
    maxDice: number;
    usedDice: number;
}

const calculateRoll = (dice: Dice, rollState: RollTypes): {roll: number, extraRolls: number[]} => {
    switch(rollState){
        case RollTypes.advantage:{
            const roll1 = Math.floor(Math.random() * dice.maxValue) + 1;
            const roll2 = Math.floor(Math.random() * dice.maxValue) + 1;
            return {roll: Math.max(roll1, roll2), extraRolls: [Math.min(roll1, roll2)]};
        }
        case RollTypes.disadvantage:{
            const roll1 = Math.floor(Math.random() * dice.maxValue) + 1;
            const roll2 = Math.floor(Math.random() * dice.maxValue) + 1;
            return {roll: Math.min(roll1, roll2), extraRolls: [Math.max(roll1, roll2)]};
        }
        default: {
            return {roll: Math.floor(Math.random() * dice.maxValue) + 1, extraRolls: []}
        }
    }
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
                    state.results.push({dice: {...dice, state: calculateRollState(dice, roll)}, value: roll, total, extraRolls, modifier: [modifier]})
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