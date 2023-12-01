
export enum RollTypes { roll, disadvantage, advantage};
export enum RollState {success = 'success',failure = 'failure',normal='normal'}
export type Dice = {name: string, maxValue: number, amount: number, state: RollState, rollType: RollTypes}
