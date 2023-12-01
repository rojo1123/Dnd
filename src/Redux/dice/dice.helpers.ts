import { Dice, RollState, RollTypes } from "./dice.types";

export const calculateRoll = (dice: Dice, rollState: RollTypes): {roll: number, extraRolls: number[]} => {
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

export const calculateRollState = (dice: Dice, value: number): RollState  => {
    if(dice.maxValue === value)
        return RollState.success
    if(value === 1)
        return RollState.failure

    return RollState.normal
}

export const createDice = (name: string, faces: number) => {
    return {name, maxValue: faces,amount: 0, state: RollState.success, rollType: RollTypes.roll}}