
import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT
} from './constants.js';
import { getItem } from './items.js';

import {
    PowerList
} from './powers.js';

export let ConsumableList = [];

export function initConsumables() {
    ConsumableList = [
        { 
            name: game.i18n.localize("SAT.Consumable.Speed"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.markers.runes.orange.03", label: "Speed", active: true,  persist: false,  size: 2, filter: "ColorMatrix", filterData: { hue: 100 }, startTime: 0 }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/consumables/healing.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [],
            activeEffects: [
                {type: ANIMATIONTYPE.TARGET, name: 'protection', label: game.i18n.localize("SAT.Effect.ProtectionNormal"), type: ROLLRESULT.HIT },
                {type: ANIMATIONTYPE.TARGET, name: 'protection', label: game.i18n.localize("SAT.Effect.ProtectionRaise"), type: ROLLRESULT.RAISE }
            ],
        },
        { 
            name: game.i18n.localize("SAT.Power.Healing"), //v1
            animationType: ANIMATIONTYPE.TARGET,
            animations: [],
            sounds: [
                { label: "Default", file: PATH.AUDIO + "powers/novice/healing/Spell_SH_Resto_Revamp_HealingRain_Loop.ogg", active: true, delay: 0, volume: 1.0,  duration: 3000 }
            ],
            animationEffects: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.healing_generic.burst.greenorange", label: "Green/Orange", active: true, attachTo: true, size: 1, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0  }
            ],
            activeEffects: []
        },
        { 
            name: game.i18n.localize("SAT.Power.Fly"),
            animationType: ANIMATIONTYPE.SPECIAL,
            animations: [],
            sounds: [ 
                { label: "Healing", file: PATH.AUDIO + "/consumables/healing.ogg", active: true, delay: 0, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [ {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.token_stage.round.green.01.04", label: "Speed", active: true,  persist: false,  size: 1, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 }
            ],
            activeEffects: [
                { name: 'fly', label: game.i18n.localize("SAT.Effect.FlyNormal"), type: ROLLRESULT.HIT },
                { name: 'fly', label: game.i18n.localize("SAT.Effect.FlyRaise"), type: ROLLRESULT.RAISE }
            ],
        }
    ];
}