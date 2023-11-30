
export type ModifierSet  = [
    {name: 'strength', value: number},
    {name: 'dexterity', value: number},
    {name: 'constitution', value: number},
    {name: 'inteligence', value: number},
    {name: 'wisdow', value: number},
    {name: 'charisma', value: number}
]

export type Modifier = ModifierSet[number]['name'];
export type Skill = {name: string, modifier: Modifier | undefined}
export type skillList = Skill[]

export const availableSkillList: skillList = [
    {name: 'Initiative', modifier: 'dexterity'},
    {name: 'Acrobatics', modifier: 'dexterity'},
    {name: 'Athetics', modifier: 'strength'},
    {name: 'Arcana', modifier: 'inteligence'},
    {name: 'History', modifier: 'inteligence'},
    {name: 'Investigation', modifier: 'inteligence'},
    {name: 'Nature', modifier: 'inteligence'},
    {name: 'Religion', modifier: 'inteligence'},
    {name: 'Stealth', modifier: 'dexterity'},
    {name: 'Sleight of Hand', modifier: 'dexterity'},
    {name: 'Animal Handling', modifier: 'wisdow'},
    {name: 'Insight', modifier: 'wisdow'},
    {name: 'Medicine', modifier: 'wisdow'},
    {name: 'Perception', modifier: 'wisdow'},
    {name: 'Survival', modifier: 'wisdow'},
    {name: 'Deception', modifier: 'charisma'},
    {name: 'Intimidation', modifier: 'charisma'},
    {name: 'Performance', modifier: 'charisma'},
    {name: 'Persuasion', modifier: 'charisma'},
]