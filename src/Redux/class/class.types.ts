import { ModifierSet } from "../modifiers/modifier.types";

export interface RPGClass {
    name: string;
    color: string;
    attackModifier: ModifierSet[number]['name'];
    modifiers: ModifierSet;
    spellModifier?: ModifierSet[number]['name'];
}

