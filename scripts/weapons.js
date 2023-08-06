
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
        { //Knife v1
            name: game.i18n.localize("SAT.Weapons.Knife"),
            category: "",
            alternatives: ['Bayonet'],
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.dagger.melee.fire.dark_purple", label: "Dark Purple", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.dagger.melee.fire.blue",        label: "Blue", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/knife.mp3", active: true, delay: 500, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Breath Weapon v1
            name: game.i18n.localize("SAT.Weapons.Breath"),
            category: "",
            alternatives: [],
            animationType: ANIMATIONTYPE.TEMPLATE,
            animations: [
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons02.burst.cone.fire.orange.01", label: "Fire", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons02.burst.cone.arcana.dark_black.01", label: "Arcana Black (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons02.burst.cone.fire.green.01", label: "Acid Green (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons02.burst.cone.holy.yellow.01", label: "Holy Yellow (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TEMPLATE, file: "jb2a.breath_weapons02.burst.cone.ice.01", label: "Ice (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                

            ],
            sounds: [ 
                { label: "Fire (Dragon)", file: PATH.AUDIO + "/weapons/breath_dragon_fire.mp3", active: true, delay: 0, volume: 1.0,  duration: 5000 },
                { label: "Ice (Dragon)", file: PATH.AUDIO + "/weapons/breath_dragon_ice.mp3", active: false, delay: 0, volume: 1.0,  duration: 2000 },
                { label: "Ice (wind)", file: PATH.AUDIO + "/weapons/breath_wind_artic.mp3", active: false, delay: 0, volume: 1.0,  duration: 5000 },
                { label: "Frost", file: PATH.AUDIO + "/weapons/breath_frost.ogg", active: false, delay: 0, volume: 1.0,  duration: 5000 },
                { label: "Nightmare", file: PATH.AUDIO + "/weapons/breath_nightmare.ogg", active: false, delay: 0, volume: 1.0,  duration: 5000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Dynamite v1
            name: game.i18n.localize("SAT.Weapons.Dynamite"),
            category: "Dynamite",
            alternatives: ["Dynamite/Nitro"],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.throwable.throw.dynamite.01.orange", label: "Orange (Patreon)", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }
                

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/explosion.ogg", active: true, delay: 2000, volume: 1.0,  duration: 3000 }
            ],
            animationEffects: [ 
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.explosion.01.orange", label: "Orange", active: true, size: 3, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }
            ],
            activeEffects: [
                
            ],
        },
        { //Bow v1
            name: game.i18n.localize("SAT.Weapons.Bow"),
            category: "",
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.arrow.physical.white", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.arrow.physical.orange", label: "Orange", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.arrow.physical.blue", label: "Blue", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0 }
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/Projectile_Arrow_Impact01.ogg", active: true, delay: 500, volume: 1.0, duration: 500 }
            ],
            animationEffects: [
            ],
            activeEffects: [
            ],
        },
        { //sword v1
          name: game.i18n.localize("SAT.Weapons.Sword"),
          category: "",
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
            category: "",
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
            animationEffects: [],
            activeEffects: [],
        },
        { // Rapier v1
            name: game.i18n.localize("SAT.Weapons.Rapier"),
            category: "",
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.purple.0", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.rapier.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Scimitar v1
            name: game.i18n.localize("SAT.Weapons.Scimitar"),
            category: "",
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.purple.0", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.scimitar.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Spear v1
            name: game.i18n.localize("SAT.Weapons.Spear"),
            category: "",
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.white.2", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.blue.2", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.orange.2", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.purple.2", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.spear.melee.01.dark_orangepurple.2", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/Spear_Sound_Effect.ogg", active: true, delay: 1200, volume: 2.0, duration: 1000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { // Warhammer v1
            name: game.i18n.localize("SAT.Weapons.Warhammer"),
            category: "",
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.purple.0", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.warhammer.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0  }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/Hammer.ogg", active: true, delay: 200, volume: 1.0, duration: 4000 }
            ],
            animationEffects: [],
            activeEffects: [],
        },
        { //Club v1
            name: game.i18n.localize("SAT.Weapons.Club"),
            category: "",
            alternatives: ["Club, War"],
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.club.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.club.melee.01.white.1", label: "White Version 2", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.club.melee.01.dark_orangepurple.0", label: "Dark Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/club.mp3", active: true, delay: 1200, volume: 1.0,  duration: 600 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Dagger v1
            name: game.i18n.localize("SAT.Weapons.Dagger"),
            category: "",
            animationType: ANIMATIONTYPE.MELEE,
            animations: [
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.dagger.melee.fire.dark_purple", label: "Dark Purple", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.MELEE, file: "jb2a.dagger.melee.fire.blue",        label: "Blue", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/KnifeStab.ogg", active: true, delay: 700, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Claws v1
            name: game.i18n.localize("SAT.Weapons.Claws"),
            category: "",
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
        },
        { //Bite v1
            name: game.i18n.localize("SAT.Weapons.Bite"),
            category: "",
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.bite.400px.red", label: "Red", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.bite.400px.green", label: "Green (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.bite.400px.blue", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.bite.400px.purple", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/bite/BiteMediumA.ogg", active: true, delay: 0, volume: 1.0,  duration: 900 },
                { label: "Small", file: PATH.AUDIO + "/weapons/bite/Spell_NPC_Bite_Dinosaur_Small_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Plant", file: PATH.AUDIO + "/weapons/bite/Spell_NPC_Bite_Eat_Plant_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Worm", file: PATH.AUDIO + "/weapons/bite/LavaWorm_Attack_01.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Mace v1
            name: game.i18n.localize("SAT.Weapons.Mace"),
            category: "",
            animationType: ANIMATIONTYPE.TARGET,
            animations: [
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.mace.melee.01.white.0", label: "White", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.mace.melee.01.dark_orangepurple.0", label: "Orange Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.mace.melee.01.blue.0", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.TARGET, file: "jb2a.mace.melee.01.orange.0", label: "Orange (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/Hammer.ogg", active: true, delay: 200, volume: 1.0, duration: 4000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Laser v1
            name: game.i18n.localize("SAT.Weapons.Laser"),
            category: "",
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.lasershot.blue", label: "Blue", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.lasershot.green", label: "Green", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.lasershot.orange", label: "Orange", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.lasershot.red", label: "Red", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/laser/LaserBlastQuick.mp3", active: true, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //Pistol v1
            name: game.i18n.localize("SAT.Weapons.Pistol"),
            category: "",
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.01.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/fire/automatic.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { // Revolver Single v1
            name: game.i18n.localize("SAT.Weapons.RevolverSingle"),
            category: "Single Action Revolver",
            alternatives: [ "Colt Army", "Colt Buntline Special", "Colt Dragoon", "Colt Navy", "Colt Peacemaker", "LeMat Revolver" ],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.01.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/fire/revolver-single-action.ogg", active: true, delay: 0, volume: 1.0,  duration: 2000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        }, 
        { // Revolver Double v1
            name: game.i18n.localize("SAT.Weapons.RevolverDouble"),
            category: "Double Action Revolver",
            alternatives: ["Colt Frontier", "Colt Lightning", "Colt Rainmaker", "Colt Thunderer", "Starr Revolver" ],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.01.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, startTime: 0 }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/fire/revolver-double-action.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { //ProtonSteam v1
            name: game.i18n.localize("SAT.Weapons.ProtonStream"),
            category: "",
            animationType: ANIMATIONTYPE.STREAM,
            animations: [

            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/proton-stream.mp3", active: true, delay: 0, volume: 1.0, duration: 500 }
            ],
            animationEffects: [
                {name: game.i18n.localize("SAT.Weapons.ProtonStream"), type: ANIMATIONTYPE.STREAM, file: "jb2a.scorching_ray.01.red", label: "Red", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 },waitUntilFinished: -700, startTime: 0, stretchTo: { attachTo: true }, timeRange: { start: 500, end: 700 } },
                {name: game.i18n.localize("SAT.Weapons.ProtonStream"), type: ANIMATIONTYPE.STREAM, file: "jb2a.scorching_ray.01.orange", label: "Orange", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 },waitUntilFinished: -700, startTime: 0, stretchTo: { attachTo: true }, timeRange: { start: 500, end: 700 } },
                {name: game.i18n.localize("SAT.Weapons.ProtonStream"), type: ANIMATIONTYPE.STREAM, file: "jb2a.scorching_ray.01.yellow", label: "Yellow", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 },waitUntilFinished: -700, startTime: 0, stretchTo: { attachTo: true }, timeRange: { start: 500, end: 700 } },
                {name: game.i18n.localize("SAT.Weapons.ProtonStream"), type: ANIMATIONTYPE.STREAM, file: "jb2a.scorching_ray.01.green", label: "Green", active: false, size: 1, persist: false, stretchTo: { attachTo: true }, waitUntilFinished: -700, filter: "ColorMatrix", filterData: { hue: -1 }, startTime: 0, stretchTo: { attachTo: true }, timeRange: { start: 500, end: 700 } }
            ],
            activeEffects: [
                { name: game.i18n.localize("SAT.Effect.ProtonStreamNormal"), label: game.i18n.localize("SAT.Effect.ProtonStreamNormal"), type: ROLLRESULT.HIT },
                { name: game.i18n.localize("SAT.Effect.ProtonStreamRaise"), label: game.i18n.localize("SAT.Effect.ProtonStreamRaise"), type: ROLLRESULT.RAISE },
            ],
        },
        { // Shotgun v1
            name: game.i18n.localize("SAT.Weapons.Shotgun"),
            category: "",
            alternatives: [ "Sawed-off Winchester" ],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.2}, repeat: { times: 3, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.blue", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.2}, repeat: { times: 3, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.green", label: "Green (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.2}, repeat: { times: 3, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.purple", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.2}, repeat: { times: 3, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.red", label: "Red (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.2}, repeat: { times: 3, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.orange", label: "Orange (Carbine Mode)", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 }
    
            ],
            sounds: [ 
                { label: "Shotgun", file: PATH.AUDIO + "/weapons/fire/shotgun.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 },
                { label: "Carbine", file: PATH.AUDIO + "/weapons/fire/carbine.ogg", active: false, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { // Rifle v1
            name: game.i18n.localize("SAT.Weapons.Rifle"),
            category: "Rifle",
            alternatives: [ "ballard ’72", "bullard express", "Winchester ‘73", "Evans Old Model Sporter", "Musket", "Winchester ‘76", "Colt-Paterson Model ’36", "Sawed-off Winchester", "Sharp’s Big 50" ],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.03.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 }
    
            ],
            sounds: [ 
                { label: "Rifle", file: PATH.AUDIO + "/weapons/fire/rifle.ogg", active: true, delay: 0, volume: 1.0,  duration: 2000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { // Carabine v1
            name: game.i18n.localize("SAT.Weapons.Carbine"),
            category: "",
            alternatives: [ "Gatling Carbine", "Sharps ’55", "Spencer", "Bullard Express", "LeMat Carbine & Underbarrel Shotgun" ],
            weaponCategory: "Carbine",
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.blue", label: "Blue (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.green", label: "Green (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.purple", label: "Purple (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 },
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.02.red", label: "Red (Patreon)", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 }

    
            ],
            sounds: [ 
                { label: "Carbine", file: PATH.AUDIO + "/weapons/fire/carbine.ogg", active: true, delay: 0, volume: 1.0,  duration: 3000 },
                { label: "Shotgun", file: PATH.AUDIO + "/weapons/fire/shotgun.ogg", active: false, delay: 0, volume: 1.0,  duration: 2000 },
                { label: "Rifle", file: PATH.AUDIO + "/weapons/fire/rifle.ogg", active: false, delay: 0, volume: 1.0,  duration: 2000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { // Derringer v1
            name: game.i18n.localize("SAT.Weapons.Derringer"),
            category: "",
            alternatives: [ "English 1840 Model", "Rupertus Pepperbox", "Wesson Dagger-Pistol" ],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.01.orange", label: "Orange", active: true, size: 0.5, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 1, randomInit: 0, randomEnd: 0 }, startTime: 0 }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/fire/derringer.ogg", active: true, delay: 0, volume: 1.0,  duration: 1000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { // Gatling v1
            name: game.i18n.localize("SAT.Weapons.Machinegun"),
            category: "gatling",
            alternatives: [ "Gatling Gun", "Steam Gatling", "Gatling Carbine" ],
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                {type: ANIMATIONTYPE.RANGED, file: "jb2a.bullet.03.orange", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { }, stretchTo: {randomOffset: 0.5}, repeat: { times: 10, randomInit: 50, randomEnd: 100 }, startTime: 0 }
    
            ],
            sounds: [ 
                { label: "Default", file: PATH.AUDIO + "/weapons/fire/gatling.ogg", active: true, delay: 0, volume: 1.0,  duration: 3000 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        }
    ];
    
    Object.freeze(WeaponList);
}