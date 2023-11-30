import { useAppSelector } from "../Redux/store"



export const ResultScreen = () => {
    const results = useAppSelector(state => state.dice.results)

    return (<div style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr', background:'white', padding:'16px'}}>
        {results.length > 0 && results.map(({dice, total, value, extraRolls, modifier}, indx) => {
        return <div key={dice.name + indx.toString()} style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
          <p>{dice.name}</p>
          <div style={{display: 'flex', gap:'2px'}}>
            <p className={dice.state}>{value}</p>
            {extraRolls.length > 0 && <p>{extraRolls.join(', ')}</p>}
            <p>({modifier.join(', ')})</p>
          </div>
          <h4>{total}</h4>
        </div>
      })}
    </div>)
}