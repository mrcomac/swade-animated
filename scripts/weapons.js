
import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT
} from './constants.js';

export let WeaponList = [];
/**
 * rapier jb2a.rapier.melee.01.white.5
 * MonkAttack jb2a.melee_generic.bludgeoning.one_handed
 * dagger jb2a.dagger.throw.01.blue
 */
export function initWeapons() {
    WeaponList = [
        { 
            name: game.i18n.localize("SAT.Weapons.Bow"),
            animationType: ANIMATIONTYPE.RANGED,
            animations: [
                { file: "jb2a.arrow.physical.orange.05ft", label: "Orange", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { hue: -1 } }
            ],
            sounds: [ 
                { label: "Fire", file: PATH.AUDIO + "/weapons/Projectile_Arrow_Impact01.ogg", active: true, delay: 500, volume: 1.0 }
            ],
            animationEffects: [
                
            ],
            activeEffects: [
                
            ],
        },
        { 
          name: game.i18n.localize("SAT.Weapons.Sword"),
          animationType: ANIMATIONTYPE.MELEE,
          animations: [
              { file: "jb2a.greatsword.melee.standard.white", label: "Great Sword", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { } },
              { file: "jb2a.greatsword.melee.fire.black", label: "Shadow Sword (Patreon)", active: true, size: 1, persist: false, filter: "ColorMatrix", filterData: { } },

          ],
          sounds: [ 
              { label: "Sword", file: PATH.AUDIO + "/weapons/sword01.ogg", active: true, delay: 1200, volume: 1.0 }
          ],
          animationEffects: [
              
          ],
          activeEffects: [
              
          ],
      }
    ];
}