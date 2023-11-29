import { roll, updateDice } from "../Redux/dice/dice.slice"
import { useAppDispatch, useAppSelector } from "../Redux/store"



export const DicePool = () => {
    const dices = useAppSelector((state) => state.dice.dices)
    const maxDice = useAppSelector((state) => state.dice.maxDice)
    const usedDice = useAppSelector((state) => state.dice.usedDice)
    const diceLimitReached = usedDice === 10

    const dispatch = useAppDispatch()
  
    const handleChange = (index: number, amount: number) => {
      dispatch(updateDice({index, amount}))
    }

    return (<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap:'16px'}}>
        {dices.map((dice, index) => {
        return <div key={dice.name} style={{display: 'grid', gridTemplateColumns: '1fr', justifyItems:' center', background: 'white'}}>
            <p>{dice.name}</p>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <input style={{width: '35px', height: '35px'}} type='button' onClick={() => handleChange(index, Number(-1))} value="-" disabled={dice.amount === 0}/>
                <p>{dice.amount}</p>
                <input style={{width: '35px', height: '35px'}} type='button' onClick={() => handleChange(index, Number(1))} value="+" disabled={diceLimitReached || dice.amount === maxDice}/>
            </div>
        </div>
        })}
    </div>)
}