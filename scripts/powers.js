
import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT,
    debug
} from './constants.js';

export let PowerList = {};
/*
Arcane Protection [done]
Blind [done]
Burrow [done]
Fly [done]
Healing [done]
Bolt [done]
Deflection [in progress]
Burst [ok]
Protection [in progress]
Sound/Silence [in progress]

*/

export function initPowers() {
    PowerList = [
        {  //Bolt v1
            name: game.i18n.localize("SAT.Power.Bolt"),
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.fire_bolt.orange", label: "Fire",        active: true,  size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.lightning_bolt.narrow.blue", label: "Lightning",   active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.gust_of_wind.default", label: "Wind",   active: false, size: 0.5, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0  },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.energy_strands.range.standard.purple.01", label: "Purple Energy",   active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/powers/novice/bolt/FireBolt.ogg", active: true, delay: 0, duration: 1000, volume: 1.0 },
                { label: "Lightning", file: PATH.AUDIO + "powers/novice/bolt/LightningBolt.ogg", active: false, delay: 0, duration: 2000, volume: 1.0 },
                { label: "Air", file: PATH.AUDIO + "/powers/novice/bolt/AirBolt.ogg", active: false, delay: 0, duration: 2000, volume: 1.0 },
                { label: "Spirit", file: PATH.AUDIO + "/powers/novice/bolt/SpiritBolt.ogg", active: false, delay: 0, duration: 2000, volume: 1.0 },
                { label: "Shadow", file: PATH.AUDIO + "/powers/novice/bolt/ShadowBolt.ogg", active: false, delay: 0, duration: 3000, volume: 1.0 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Arcane Protection v1
            name: game.i18n.localize("SAT.Power.ArcaneProtection"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.spinning.blue.002", label: "Blue", active: true, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.spinning.orange.002", label: "Orange (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.spinning.purple.002", label: "Purple (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
            ],
            sounds: [
                { label: "Default", file: PATH.AUDIO + "powers/novice/protection/Spell_PA_Artifact_TyrsProtection_Cast_01.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Divine", file: PATH.AUDIO + "powers/novice/protection/DivineShield.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Light", file: PATH.AUDIO + "powers/novice/protection/FX_BurningLightBeam_Impact_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Fire", file: PATH.AUDIO + "powers/novice/protection/Hellfire_Raid_FX_Explosion01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Shadow", file: PATH.AUDIO + "powers/novice/protection/Spell_Corruption_Cast01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 }

            ],
            animationEffects: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.static.blue.002", label: "Blue", active: true, size:2, attachTo: true, persist: true, filter: "ColorMatrix", filterData: {},  startTime: 0  },    
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.static.orange.002", label: "Orange (Patreon)", active: false, size: 2, attachTo: true, persist: true, filter: "ColorMatrix", filterData: {},  startTime: 0  },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.static.purple.002", label: "Purple (Patreon)", active: false, size: 2, attachTo: true, persist: true, filter: "ColorMatrix", filterData: {},  startTime: 0  }
            ],
            activeEffects: [
                { label: game.i18n.localize("SAT.Effect.ArcaneProtectionNormal"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Effect.ArcaneProtectionRaise"), type: ROLLRESULT.RAISE }
            ]
        },
        {  // Blind v1
            name: game.i18n.localize("SAT.Power.Blind"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.markers.light.loop.blue", label: "Blue", active: true, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0 },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.markers.light.loop.green", label: "Green (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0 },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.markers.light.loop.yellow", label: "Yellow (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0 }
                
            ],
            sounds: [
                { label: "Default", file: PATH.AUDIO + "powers/novice/blind/Spell_RO_Blind_Cast_02.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Wind", file: PATH.AUDIO + "powers/novice/blind/SPELL_DK_HowlingBlast_Cast01.ogg", active: false, delay: 0, volume: 1.0,  duration: 2000 },
                { label: "Light", file: PATH.AUDIO + "powers/novice/blind/Spell_PA_BlindingLight_Cast.ogg", active: false, delay: 0, volume: 1.0,  duration: 2000 },
                { label: "Sand", file: PATH.AUDIO + "powers/novice/blind/FX_Sand_Cast02.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.eyes.01.dark_green.single.1", label: "Dark Green", active: true, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.eyes.01.dark_red.single.1", label: "Dark Red (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.eyes.01.dark_yellow.single.1", label: "Dark Yelow (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.eyes.01.orangered.single.1", label: "Orange Red (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.eyes.01.orangeyellow.single.1", label: "Orange Yellow (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   },
            ],
            activeEffects: [
                { label: game.i18n.localize("SAT.Effect.BlindNormal"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Effect.BlindRaise"), type: ROLLRESULT.RAISE }
            ]
        },
        { // Burrow v1
            name: game.i18n.localize("SAT.Power.Burrow"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [],
            sounds: [
                { label: "Rocks Falling 01", file: PATH.AUDIO + "powers/novice/burrow/FX_Rock_FallingSmall_01.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Rocks Falling 02", file: PATH.AUDIO + "powers/novice/burrow/FX_Rock_FallingSmall_02.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Rocks Falling 03", file: PATH.AUDIO + "powers/novice/burrow/FX_Rock_FallingSmall_03.ogg", active: true, delay: 0, volume: 1.0,  duration: 2000 },
                { label: "Rocks Falling 04", file: PATH.AUDIO + "powers/novice/burrow/FX_Rock_FallingSmall_04.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Rocks Falling 05", file: PATH.AUDIO + "powers/novice/burrow/FX_Rock_FallingSmall_05.ogg", active: true, delay: 0, volume: 1.0,  duration: 2000 }
            ],
            animationEffects: [
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.impact.ground_crack.orange.01", label: "Orange (Patreon)", active: true, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0, attachTo: true   },
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.impact.ground_crack.green.01", label: "Green (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0, attachTo: true   },
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.impact.ground_crack.blue.01", label: "Blue (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0, attachTo: true   },
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.impact.ground_crack.purple.01", label: "Purple (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0, attachTo: true   },
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.impact.ground_crack.white.01", label: "White (Patreon)", active: false, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0, attachTo: true   }
            ],
            activeEffects: [
                { label: game.i18n.localize("SAT.Effect.Burrow"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Effect.Burrow"), type: ROLLRESULT.RAISE }
            ]
        },
        { // Protection v1
            name: game.i18n.localize("SAT.Power.Protection"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.spinning.blue.001", label: "Blue", active: true, size: 2, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0   }
                
            ],
            sounds: [
                { label: "Default", file: PATH.AUDIO + "powers/novice/protection/Spell_PA_Artifact_TyrsProtection_Cast_01.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Divine", file: PATH.AUDIO + "powers/novice/protection/DivineShield.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Light", file: PATH.AUDIO + "powers/novice/protection/FX_BurningLightBeam_Impact_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Fire", file: PATH.AUDIO + "powers/novice/protection/Hellfire_Raid_FX_Explosion01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Shadow", file: PATH.AUDIO + "powers/novice/protection/Spell_Corruption_Cast01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.token_border.circle.static.blue.001", label: "Blue", active: true, size: 2, attachTo: true, persist: true, filter: "ColorMatrix", filterData: {},  startTime: 0  },    
            ],
            activeEffects: [
                { label: game.i18n.localize("SAT.Effect.ProtectionNormal"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Effect.ProtectionRaise"), type: ROLLRESULT.RAISE }
            ]
        },
        { // Burst v1
            name: game.i18n.localize("SAT.Power.Burst"),
            animationType: ANIMATIONTYPE.TEMPLATE,
            animations: [ ],
            sounds: [
                { label: "Fire", file: PATH.AUDIO + "powers/novice/burst/FX_PA_Fire_Large_Loop.ogg", active: true, delay: 500, duration: 4000, volume: 1.0 },
                { label: "Cloud", file: PATH.AUDIO + "powers/novice/burst/EnvelopingWindLoop.ogg", active: false, delay: 500, duration: 4000, volume: 1.0 },
                { label: "Nightmare", file: PATH.AUDIO + "powers/novice/burst/Spell_NightmareMagic_PreCast_SML_Loop_03.ogg", active: false, delay: 500, duration: 4000, volume: 1.0 }
                
                
            ],
            animationEffects: [
                { type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons.fire.cone.orange.01", label: "Fire", active: true, size: 1, persist: false,  filter: "ColorMatrix", filterData: {}, startTime: 3000 },
                { type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons.cold.cone.blue", label: "Cold", active: false, size: 1, persist: false,  filter: "ColorMatrix", filterData: {}, startTime: 3000 },
                { type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons.poison.cone.green", label: "Poison", active: false, size: 1, persist: false,  filter: "ColorMatrix", filterData: { hue: 100 }, startTime: 3000 }
            ],
            activeEffects: [
            ]
        },
        { // Healing v1
            name: game.i18n.localize("SAT.Power.Healing"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.healing_generic.burst.greenorange", label: "Green/Orange", active: true, attachTo: true, size: 1, persist: false, filter: "ColorMatrix", filterData: {}, startTime: 0  }
            ],
            sounds: [
                { label: "Default", file: PATH.AUDIO + "powers/novice/healing/HealingAura.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Holy", file: PATH.AUDIO + "powers/novice/healing/Spell_PR_Revamp_divine_star_cast_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 2000 },
                { label: "Nature", file: PATH.AUDIO + "powers/novice/healing/Spell_DR_Druid_Nature_Cast_Heavy03.ogg", active: false, delay: 0, volume: 1.0,  duration: 3000 },
                { label: "Shadow", file: PATH.AUDIO + "powers/novice/healing/SPELL_ShootTechGun_Impact_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 3000 }
            ],
            animationEffects: [],
            activeEffects: []
        },
        { // Deflection v1
            name: game.i18n.localize("SAT.Power.Deflection"),
            animationType: ANIMATIONTYPE.TARGET,
            template: '',
            animations: [                  
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.template_circle.symbol.normal.shield.green", label: "Green", active: true, size: 1, persist: false,  filter: "ColorMatrix", filterData: {}, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.template_circle.symbol.normal.shield.dark_red", label: "Dark Red (Patreon)", active: false, size: 1, persist: false,  filter: "ColorMatrix", filterData: {}, startTime: 0 }
            ],
            sounds: [
                { label: "Shield", file: PATH.AUDIO + "powers/novice/deflection/spellreflection_state_shield.ogg", active: true, delay: 0, volume: 1.0, duration: 4000 }
            ],
            animationEffects: [{
                active: true,
                type: ANIMATIONTYPE.SPECIAL,
                params:
                    [{
                        filterType: "blur",
                        filterId: "Deflection",
                        padding: 10,
                        quality: 4.0,
                        blur: 0,
                        blurX: 0,
                        blurY: 0,
                        animated:
                        {
                            blurX: 
                            { 
                               active: true, 
                               animType: "syncCosOscillation", 
                               loopDuration: 500, 
                               val1: 0, 
                               val2: 6
                            },
                            blurY: 
                            { 
                               active: true, 
                               animType: "syncCosOscillation", 
                               loopDuration: 750, 
                               val1: 0, 
                               val2: 6}
                        }
                    }]
            }],
            activeEffects: [
                { label: game.i18n.localize("SAT.Power.Deflection"), type: ROLLRESULT.HIT },
                { label: game.i18n.localize("SAT.Power.Deflection"), type: ROLLRESULT.RAISE }
            ]
        },
        { // Fly v1
            name: game.i18n.localize("SAT.Power.Fly"),
            animationType: ANIMATIONTYPE.SPECIAL,
            animations: [
                
            ],
            sounds: [ 
                { label: "WingFlap", file: PATH.AUDIO + "powers/novice/fly/BlackRockV2_Drake_WingFlap_05.ogg", active: true, delay: 0, volume: 1.0, duration: 5000 }
            ],
            animationEffects: [ 
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.whirlwind.bluegrey", label: "Blue", active: true,  persist: false,  size: 1, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 },
                {type: ANIMATIONTYPE.SPECIAL, file: "jb2a.whirlwind.purple", label: "Purple", active: false,  persist: false,  size: 1, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 }
            ],
            activeEffects: [
                { name: 'fly', label: game.i18n.localize("SAT.Effect.FlyNormal"), type: ROLLRESULT.HIT },
                { name: 'fly', label: game.i18n.localize("SAT.Effect.FlyRaise"), type: ROLLRESULT.RAISE }
            ],
        },
        { // Sound/Silence v1
            name: game.i18n.localize("SAT.Power.SoundSilence"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.template_circle.symbol.normal.music_note.blue", label: "Note Blue", active: true, attachTo: true, size: 1, persist: true, filter: "ColorMatrix", filterData: {}, startTime: 0  },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.template_circle.symbol.normal.music_note.dark_red", label: "Note Red", active: false, attachTo: true, size: 1, persist: true, filter: "ColorMatrix", filterData: {}, startTime: 0  },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.template_circle.symbol.normal.music_note.purple", label: "Note Purple", active: false, attachTo: true, size: 1, persist: true, filter: "ColorMatrix", filterData: {}, startTime: 0  }
            ],
            sounds: [
                { label: "Default", file: PATH.AUDIO + "powers/novice/silence/Spell_DH_Sigil_Silence_Cast_01.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Shadow", file: PATH.AUDIO + "powers/novice/silence/Spell_PR_Revamp_Shadow_Whipser_Cast_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 5000 }
            ],
            animationEffects: [],
            activeEffects: [
                { name: 'Silence', label: game.i18n.localize("SAT.Effect.SilenceNormal"), type: ROLLRESULT.HIT },
                { name: 'Silence', label: game.i18n.localize("SAT.Effect.SilenceRaise"), type: ROLLRESULT.RAISE }
            ]
        },
    ];
    Object.freeze(PowerList);
 
}