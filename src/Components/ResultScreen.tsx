import { useAppSelector } from "../Redux/store"



export const ResultScreen = () => {
    const results = useAppSelector(state => state.dice.results)

    return (<div style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr', background:'white', padding:'16px'}}>
        {results.length > 0 && results.map(({dice, value}, indx) => {
        return <div key={dice.name + indx.toString()} style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
          <p>{dice.name}</p>
          <p className={dice.state}>{value}</p>
        </div>
      })}
    </div>)
}