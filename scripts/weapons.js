
import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT
} from './constants.js';

export let WeaponList = [];
/**
 * rapier jb2a.rapier.melee.01.white.5
 * 
 */
export function initWeapons() {
    WeaponList = [
        { //Bow v1
            name: game.i18n.localize("SAT.Weapons.Bow"),
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.arrow.physical.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/weapons/Projectile_Arrow_Impact01.ogg", active: true, delay: 500, volume: 1.0, duration: 500 }
            ],
            animationEffects: [
            ],
            activeEffects: [
            ],
        },
        { //sword v1
          name: game.i18n.localize("SAT.Weapons.Sword"),
          animationType: ANIMATIONTYPE.MELEE,
          animations: [
              {type: ANIMATIONTYPE.MELEE, file: "jb2a.greatsword.melee.standard.white", label: "Great Sword", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
              {type: ANIMATIONTYPE.MELEE, file: "jb2a.greatsword.melee.fire.black", label: "Shadow Sword (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },

          ],
          sounds: [ 
              { label: "Sword", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000  }
          ],
          animationEffects: [
              
          ],
          activeEffects: [
              
          ],
        },
        { //Monk Attack v1
            name: game.i18n.localize("SAT.Weapons.MonkAttack"),
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.flurry_of_blows.physical.blue",        label: "Blue", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.flurry_of_blows.physical.dark_purple", label: "Dark Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.flurry_of_blows.physical.dark_red", label: "Dark Red (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.flurry_of_blows.physical.green", label: "Green (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.flurry_of_blows.physical.pinkpurple", label: "Pink Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.flurry_of_blows.physical.yellow", label: "Yellow (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Punch", file: PATH.AUDIO + "/weapons/monk_attack.ogg", active: true, delay: 500, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { // Rapier v1
            name: game.i18n.localize("SAT.Weapons.Rapier"),
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.purple.0", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }

            ],
            sounds: [ 
                { label: "Sword", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Scimitar v1
            name: game.i18n.localize("SAT.Weapons.Scimitar"),
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.purple.0", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }
    
            ],
            sounds: [ 
                { label: "Sword", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Spear v1
            name: game.i18n.localize("SAT.Weapons.Spear"),
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.white.2", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.blue.2", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.orange.2", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.purple.2", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.dark_orangepurple.2", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }
    
            ],
            sounds: [ 
                { label: "Sword", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Warhammer v1
            name: game.i18n.localize("SAT.Weapons.Warhammer"),
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.purple.0", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }
    
            ],
            sounds: [ 
                { label: "Sword", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { //Dagger Attack v1
            name: game.i18n.localize("SAT.Weapons.Dagger"),
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.dagger.melee.fire.dark_purple", label: "Dark Purple", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.dagger.melee.fire.blue",        label: "Blue", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Punch", file: PATH.AUDIO + "/empty_audio.ogg", active: true, delay: 0, volume: 0.0,  duration: 0 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Claws Attack v1
            name: game.i18n.localize("SAT.Weapons.Claws"),
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.claws.400px.red", label: "Red", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.claws.400px.dark_red", label: "Dark Red (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.claws.400px.bright_blue", label: "Bright Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.claws.400px.brown", label: "Brown (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Zombie", file: PATH.AUDIO + "/weapons/claws/ZombieAggro.ogg", active: true, delay: 0, volume: 1.0,  duration: 1500 },
                { label: "Super Zombie", file: PATH.AUDIO + "/weapons/claws/SuperZombieAggro.ogg", active: false, delay: 0, volume: 1.0,  duration: 1500 },
                { label: "Bear", file: PATH.AUDIO + "/weapons/claws/MON_Kah-bear_Attack_01_180306.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Tiger", file: PATH.AUDIO + "/weapons/claws/MON_MechanicalTiger_Attack01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        }
    ];
}