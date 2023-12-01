import { RPGClass } from "./class.types"

export const Rogue: RPGClass = {
    name: 'Rogue',
    color: 'DarkCyan',
    attackModifier: 'dexterity',
    spellModifier: 'inteligence',
    modifiers: [
        {name: 'strength', value: 10},
        {name: 'dexterity', value: 16},
        {name: 'constitution', value: 8},
        {name: 'inteligence', value: 12},
        {name: 'wisdow', value: 8},
        {name: 'charisma', value: 12},
    ]
}

export const Monk: RPGClass = {
    name: 'Monk',
    color: 'LightBlue',
    attackModifier: 'wisdow',
    spellModifier: 'wisdow',
    modifiers: [
        {name: 'strength', value: 18},
        {name: 'dexterity', value: 12},
        {name: 'constitution', value: 10},
        {name: 'inteligence', value: 8},
        {name: 'wisdow', value: 12},
        {name: 'charisma', value: 6},
    ]
}

export const Paladin: RPGClass = {
    name: 'Paladin',
    color: 'DarkOrange',
    attackModifier: 'dexterity',
    spellModifier: 'wisdow',
    modifiers: [
        {name: 'strength', value: 12},
        {name: 'dexterity', value: 8},
        {name: 'constitution', value: 12},
        {name: 'inteligence', value: 10},
        {name: 'wisdow', value: 12},
        {name: 'charisma', value: 10},
    ]
}

export const Bard: RPGClass = {
    name: 'bard',
    color: 'lightpink',
    attackModifier: 'dexterity',
    spellModifier: 'charisma',
    modifiers: [
        {name: 'strength', value: 8},
        {name: 'dexterity', value: 12},
        {name: 'constitution', value: 10},
        {name: 'inteligence', value: 12},
        {name: 'wisdow', value: 8},
        {name: 'charisma', value: 16},
    ]
}

export const Warlock: RPGClass = {
    name: 'Warlock',
    attackModifier: 'dexterity',
    spellModifier: 'wisdow',
    color: 'purple',
    modifiers: [
        {name: 'strength', value: 6},
        {name: 'dexterity', value: 8},
        {name: 'constitution', value: 8},
        {name: 'inteligence', value: 14},
        {name: 'wisdow', value: 18},
        {name: 'charisma', value: 16},
    ]
}

export const Warrior: RPGClass = {
    name: 'Warrior',
    color: 'brown',
    attackModifier: 'strength',
    modifiers: [
        {name: 'strength', value: 12},
        {name: 'dexterity', value: 10},
        {name: 'constitution', value: 16},
        {name: 'inteligence', value: 8},
        {name: 'wisdow', value: 10},
        {name: 'charisma', value: 10},
    ]
}
