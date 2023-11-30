import { setModifier } from "../Redux/modifiers/modifier.slice"
import { useAppDispatch, useAppSelector } from "../Redux/store"



export const ModifierPool = () => {
    const modifier = useAppSelector((state) => state.modifier.modifiers)
    const dispatch = useAppDispatch()

    return <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        {modifier.map((mod, index) => {
            return <div key={mod.name} style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>{mod.name}</h2>
                <input style={{width: '50px', textAlign: 'center'}} type="number" onChange={(e) => dispatch(setModifier({index, value: Number(e.target.value)}))} value={mod.value}/>
            </div>
        })}
    </div>
}