import './App.css';
import { useAppDispatch, useAppSelector } from './Redux/dice/dice.hooks';
import { roll, updateDice } from './Redux/dice/dice.slice';


function App() {
  const dices = useAppSelector((state) => state.dice.dices)
  const results = useAppSelector((state) => state.dice.results)

  const dispatch = useAppDispatch();
  const handleChange = (index: number, amount: number) => {
    dispatch(updateDice({index, amount}))
  }

  const handleRoll = () => {
    dispatch(roll())
  }

  return (
    <div className="App">
      <div style={{display: 'grid', gridTemplateRows: '1fr 1fr', height: '100vh', width: '100vw'}}>
        <div style={{display: 'flex', gap:'16px', flexWrap: 'wrap', width: '100vw', height:'100%', padding: '16px', position: 'relative'}}>
          {dices.map((dice, index) => {
            return <div key={dice.name}>
              <p>{dice.name}</p>
              <input type='number' maxLength={20} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, Number(e.target.value))} defaultValue={0}/>
            </div>
          })}
          <button style={{position: 'absolute', bottom: '16px'}} onClick={handleRoll}>Roll Initiative</button>
        </div>
        <div style={{display: 'flex', gap:'16px', flexWrap: 'wrap', width: '100vw', height:'100%', padding: '16px', position: 'relative', overflow: 'auto'}}>
        {results.length > 0 && results.map(({dice, value}, indx) => {
            return <div key={dice.name + indx.toString()}>
              <p>{dice.name}</p>
              <p className={dice.state}>{value}</p>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
