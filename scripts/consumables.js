
import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT
} from './new_constants.js';

export let ConsumableList = [];

export function initConsumables() {
    ConsumableList = [
        { 
            name: game.i18n.localize("SAT.Consumable.Healing"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                { file: "jb2a.healing_generic.400px.blue", label: "Healing", active: true, size: 2, persist: false, filter: "ColorMatrix", filterData: { hue: 150 } }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/consumables/healing.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [
                { file: "jb2a.token_border.circle.static.purple.002", label: "Purple", active: true, size: 2, attachTo: true, persist: true, filter: "ColorMatrix", filterData: {}  },
            ],
            activeEffects: [
                { name: 'prrotection', label: game.i18n.localize("SAT.Effect.ProtectionNormal"), type: ROLLRESULT.HIT },
                { name: 'prrotection', label: game.i18n.localize("SAT.Effect.ProtectionRaise"), type: ROLLRESULT.RAISE }
            ],
        },
        { 
            name: game.i18n.localize("SAT.Consumable.Speed"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                { file: "jb2a.markers.runes.orange.03", label: "Speed", active: true,  persist: false,  size: 2, filter: "ColorMatrix", filterData: { hue: 100 } }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/consumables/healing.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [],
            activeEffects: [
                { name: 'prrotection', label: game.i18n.localize("SAT.Effect.ProtectionNormal"), type: ROLLRESULT.HIT },
                { name: 'prrotection', label: game.i18n.localize("SAT.Effect.ProtectionRaise"), type: ROLLRESULT.RAISE }
            ],
        }
    ];
}