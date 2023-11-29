import { ModifierPool } from "./ModifierPool"
import { setClass } from "../Redux/class/class.slice";
import { useAppDispatch, useAppSelector } from "../Redux/store";


export const CharacterSheet = () => {
    const index = useAppSelector(state => state.class.selectedIndex);
    const availableClasses = useAppSelector(state => state.class.availableClasses);
    const dispatch = useAppDispatch();

    return <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', gap:'16px', height: '100%', background: 'brown', padding: '32px', color: 'white'}}>
        <select style={{width: '100%', height: '40px'}} onChange={(e) => {dispatch(setClass(Number(e.target.value)))}} value={index}>
            {availableClasses.map((rpgClass, index) => {
                return <option value={index}>
                    {rpgClass.name}
                </option>
            })}
        </select>
        <ModifierPool/>
    </div>
}