import { useState } from "react";
import { roll } from "../Redux/dice/dice.slice";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { DicePool } from "./DicePool"
import { ResultScreen } from "./ResultScreen"

type ContainerStates = 'all dices' | 'd20'

export const DiceRollContainer = () => {
    const dispatch = useAppDispatch();
    const [diceContent, setDiceContent] = useState<ContainerStates>('all dices');
    const sum = useAppSelector(state => state.dice.sum)
      
    const handleRoll = () => {
      dispatch(roll())
    }

    return (
        <>
            <select style={{height: '60px'}} onChange={(e) => setDiceContent(e.target.value as ContainerStates)} value={diceContent}>
                <option value="all dices">all dices</option>
                <option value="d20">d20</option>
            </select>
            {diceContent === 'd20' && <div>
                </div>}
            {diceContent === 'all dices' && <>
                <DicePool/>
                <button style={{}} onClick={handleRoll}>Roll!</button>
                <ResultScreen/>
                {Boolean(sum) && <div style={{background:'white', padding: '16px'}}><p>Total: {sum}</p></div>}
            </>}
        </>
    )
}