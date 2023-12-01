import { useState } from "react";
import { roll, setRollType } from "../Redux/dice/dice.slice";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { DicePool } from "./DicePool"
import { ResultScreen } from "./ResultScreen"
import { D20Scene } from "./D20Scene";
import { Skill, availableSkillList, skillList } from "../Redux/modifiers/modifier.types";
import { CalculateModifier } from "../Redux/modifiers/modifier.utils";
import { RollTypes } from "../Redux/dice/dice.types";

type ContainerStates = 'all dices' | 'd20'

export const DiceRollContainer = () => {
    const dispatch = useAppDispatch();
    const [diceContent, setDiceContent] = useState<ContainerStates>('all dices');
    const sum = useAppSelector(state => state.dice.sum)
    const rollType = useAppSelector(state => state.dice.rollType);
    const modifiers = useAppSelector(state => state.modifier.modifiers);
    const attackModifier = useAppSelector(state => state.class.selectedClass.attackModifier)
    const spellModifier = useAppSelector(state => state.class.selectedClass.spellModifier)
    const options: skillList = [
        {name: 'no Skill', modifier: undefined},
        ...availableSkillList, 
        {name: 'Attack', modifier: attackModifier},
    ]

    if(spellModifier){
        options.push({name: 'Cast Spell', modifier: spellModifier});
    }
        
    const [selectedSkill, setSelectedSkill] = useState<Skill>(options[0]);
      
    const handleRoll = () => {
        const modifier = CalculateModifier(modifiers.find(x => x.name === selectedSkill.modifier)?.value ?? 10);
        dispatch(roll({modifier}))
    }

    const handleSelectSkill = (index: number) => {
        setSelectedSkill(() => options[index]);
    }

    return (
        <>
            <select style={{height: '60px'}} onChange={(e) => setDiceContent(e.target.value as ContainerStates)} value={diceContent}>
                <option value="all dices">all dices</option>
                <option value="d20">d20</option>
            </select>
            {diceContent === 'd20' && <div>
                    <div style={{background: 'white', display: 'flex', alignItems:'center',justifyContent: 'space-between'}}>
                        <D20Scene/>
                    </div>
                </div>}
            {diceContent === 'all dices' && <>
                <DicePool/>
                <button style={{}} onClick={handleRoll}>Roll!</button>
                <select onChange={(e) => handleSelectSkill(Number(e.target.value))} style={{width: '100%', height: '60px', padding: '8px'}}>
                    {options.map((skill, index) => {
                        return <option key={skill.name} value={index}>{skill.name} {skill.modifier? `(${skill.modifier})` : ''}</option>
                    })}
                </select>
                <div style={{background:'white', display: 'flex', justifyContent: 'flex-start', alignItems:'start', gap:'16px', padding: '8px'}}>
                    <div style={{display: 'flex', gap:'8px'}}>
                        <p>Advantage</p>
                        <input checked={rollType === RollTypes.advantage} type="checkbox" onClick={() => dispatch(setRollType({rollType: RollTypes.advantage}))}/>
                    </div>
                    <div style={{display: 'flex', gap:'8px'}}>
                        <p>Disdvantage</p>
                        <input checked={rollType === RollTypes.disadvantage} type="checkbox" onClick={() => dispatch(setRollType({rollType: RollTypes.disadvantage}))}/>
                    </div>
                    <div style={{display: 'flex', gap:'8px'}}>
                        <p>Normal</p>
                        <input checked={rollType === RollTypes.roll} type="checkbox" onClick={() => dispatch(setRollType({rollType: RollTypes.roll}))}/>
                    </div>
                </div>
                <ResultScreen/>
                {Boolean(sum) && <div style={{background:'white', padding: '16px'}}><p>Total: {sum}</p></div>}
            </>}
        </>
    )
}