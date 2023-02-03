
import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT
} from './constants.js';

export let PowerList = {};
/**
 * light
 * bolt
 * deflection
 * protection
 * burst
 * 
 */

export function initPowers() {
    PowerList = [
        { 
            name: game.i18n.localize("SAT.Power.Bolt"),
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                { file: "jb2a.fire_bolt.orange", label: "Fire (Orange)",        active: true,  size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 } },
                { file: "jb2a.fire_bolt.orange", label: "Holy (White/Green)",   active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: 150 } }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/powers/bolt/bolt_fire.ogg", active: true, delay: 0, volume: 1.0 },
                { label: "Holy", file: PATH.AUDIO + "/powers/bolt/bolt_holy.ogg", active: false, delay: 0, volume: 1.0 },
                { label: "Shadow", file: PATH.AUDIO + "/powers/bolt/bolt_shadow.ogg", active: false, delay: 0, volume: 1.0 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { 
            name: game.i18n.localize("SAT.Power.Protection"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                { file: "jb2a.markers.shield.dark_red.01", label: "Dark Red", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: {} },
                { file: "jb2a.markers.shield.blue.01", label: "Blue", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: {} },
                { file: "jb2a.markers.shield.green.01", label: "Green", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: {}  }                     
            ],
            sounds: [
                { label: "No Audio", file: PATH.AUDIO + "Empty_Audio.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [
                { file: "jb2a.token_border.circle.static.blue.001", label: "Blue", active: true, size: 2, attachTo: true, persist: true, filter: "ColorMatrix", filterData: {}  },    
            ],
            activeEffects: [
                { label: game.i18n.localize("SAT.Effect.ProtectionNormal"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Effect.ProtectionRaise"), type: ROLLRESULT.RAISE }
            ]
        },
        { 
            name: "Burst",
            animationType: ANIMATIONTYPE.TEMPLATE,
            template: 'cone',
            animations: [                  
                { file: "jb2a.breath_weapons02.burst.line.fire.orange.01", label: "Orange", active: true, size: 1, persist: false,  filter: "ColorMatrix", filterData: {} },
                { file: "jb2a.breath_weapons02.burst.cone.arcana.purple.02", label: "Purple", active: false, size: 1, persist: false,  filter: "ColorMatrix", filterData: {} }
                
            ],
            sounds: [
                { label: "No Audio", file: PATH.AUDIO + "Empty_Audio.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
            ]
        },
        { 
            name: "Sound/Silence",
            animationType: ANIMATIONTYPE.TEMPLATE,
            template: 'circle',
            animations: [                  
                { file: "jb2a.spell_projectile.music_note.greenyellow.05ft", label: "Orange", active: true, size: 1, persist: false,  filter: "ColorMatrix", filterData: {} }
                
            ],
            sounds: [
                { label: "No Audio", file: PATH.AUDIO + "Empty_Audio.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [
                { file: "jb2a.template_circle.symbol.normal.music_note.blue", label: "Orange", active: true, attachTo: true, size: 2, persist: true,  filter: "ColorMatrix", filterData: {} }
            ],
            activeEffects: [
            ]
        }];
        Object.freeze(PowerList);
        /*,
        { 
            name: game.i18n.localize("SAT.Power.Protection"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                { file: "jb2a.markers.shield.dark_red.01", label: "Dark Red", active: true, size: 0.5 },
                { file: "jb2a.markers.shield.blue.01", label: "Blue", active: false, size: 0.5 },
                { file: "jb2a.markers.shield.green.01", label: "Green", active: false, size: 0.5  }                     
            ],
            sounds: [
                { label: "No Audio", label: "No Audio", file: PATH.AUDIO + "Empty_Audio.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: staticCircles02,
            activeEffects: [
                { label: game.i18n.localize("SAT.Effect.ProtectionNormal"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Effect.ProtectionRaise"), type: ROLLRESULT.RAISE }
            ]
        },
        { 
            name: "Burst",
            animationType: ANIMATIONTYPE.TEMPLATE,
            templates: ['cone'],
            animations: [                  
                { file: "jb2a.breath_weapons02.burst.line.fire.orange.01", label: "Orange", active: true, size: 0.5 },
                { file: "jb2a.breath_weapons02.burst.cone.arcana.purple.02", label: "Purple", active: true, size: 0.5 }
                
            ],
            sounds: [
                { label: "No Audio", file: PATH.AUDIO + "Empty_Audio.ogg", active: true, delay: 0, volume: 1.0 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
            ]
        }*/
 
}