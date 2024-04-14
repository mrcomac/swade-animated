import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT,
    CopyObj,
    debug
} from './constants.js';

import {
    PowerList,
    initPowers
} from './powers.js'

import {
    ConsumableList,
    initConsumables
} from './consumables.js';

import {
    WeaponList,
    initWeapons
} from './weapons.js';

export let ItemData =  { 
        name: "",
        animationType: -1,
        animations: [
            { file: "", label: "", active: false, size: 1, persist: false, filter: "ColorMatrix", filterData: {}  }
        ],
        sounds: [
            { label: "No Audio", file: PATH.AUDIO + "Empty_Audio.ogg", active: true, delay: 0, volume: 1.0 }
        ],
        animationEffects: [
            { file: "", label: "", active: false, size: 0, attachTo: true, persist: false, filter: "ColorMatrix", filterData: {}  }  
        ],
        activeEffects: [
            { label: "", type: ROLLRESULT.HIT },
            { label: "", type: ROLLRESULT.RAISE }
        ]
    };

export function iniIt() {
    initPowers();
    initWeapons();
    initConsumables();
}

const escapeRegExpMatch = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
const isExactMatch = function(str, match) {
  return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str)
}

export function getItem(item) {
    debug("GETITEM");
    console.log(item);
    let itemData ={};
    if(item.type == "consumable") {
        debug("Consumable");
        for(let i=0;i<ConsumableList.length;i++) {
            if(item.name.trim().toLocaleLowerCase().includes(ConsumableList[i].name.trim().toLocaleLowerCase())) {
                itemData = ConsumableList[i];
                break;
            }
        }
    } else if(item.type == "power") {
        for(let i=0;i<PowerList.length;i++) {
            if(item.name.trim().toLocaleLowerCase().includes(PowerList[i].name.trim().toLocaleLowerCase())) {
                debug("Power",PowerList[i]);
                itemData = PowerList[i];
                break;
            }
        }
    } else if(item.type == "weapon") {
        if(item.system.category.trim().length > 0) {
            for(let i=0;i<WeaponList.length;i++) {
                if(WeaponList[i].category.trim().toLocaleLowerCase() === item.system.category.trim().toLocaleLowerCase()) {
                    debug("Weapon",WeaponList[i]);
                    itemData = WeaponList[i];
                    break;
                }
            }
        }
        if(Object.keys(itemData).length === 0) {
            debug("SEARCH BY NAME")
            for(let i=0;i<WeaponList.length;i++) {
                if(new RegExp("(\\s|\\(|,)\\b"+WeaponList[i].name.trim().toLowerCase()+"\\b(\\s|\\)|,)").test(" "+item.name.trim().toLowerCase()+" ")) {
                    debug("Weapon",WeaponList[i]);
                    itemData = WeaponList[i];
                    break;
                }
            }

            if(Object.keys(itemData).length === 0) {
                debug("SEARCH BY ALTERNATIVES")
                for(let i=0;i<WeaponList.length;i++) {
                    if(WeaponList[i]?.alternatives) {
                        let alternativeNames = WeaponList[i].alternatives;
                        for(let j = 0; j < alternativeNames.length; j++) {
                            if(new RegExp("(\\s|\\(|,)\\b"+alternativeNames[j].trim().toLowerCase()+"\\b(\\s|\\)|,)").test(" "+item.name.trim().toLowerCase()+" ")) {
                                debug("Alternative Weapon",WeaponList[i]);
                                itemData = WeaponList[i];
                            }
                        }
                    }
                    if(Object.keys(itemData).length) {
                        break;
                    }
                }   
            }
        }
    }
    // no object found, return the default
    if(Object.keys(itemData).length === 0) {
        if(item.type == "weapon") {
            if(item.system.actions.trait == game.i18n.localize("SAT.Trait.Melee")) {
                itemData = WeaponList[0]
            } else {
                itemData = WeaponList[1]
            }
        } else if(item.type == "power") {
            itemData = PowerList[0]
        } else if(item.type == "consumable") {
            itemData = ConsumableList[0]
        }
    }
    debug("OBJECT ITEM", itemData)
    return  CopyObj(itemData);
}


export function getElementItem(item,elementName,elementType) {
    debug("GETELEMENT");
    let itemData = getItem(item);
    let elementData = [];

    if(elementType == 'animation') {
        debug("IS ANIMATION");
        debug(elementName);
        for(let i = 0; i < itemData.animations.length;i++) {
            if(itemData.animations[i].label == elementName) {
                elementData = itemData.animations[i];
                break;
            }
        }
    } else if(elementType == "animationEffect") {
        for(let i = 0; i < itemData.animationEffects.length;i++) {
            if(itemData.animationEffects[i].label == elementName) {
                elementData = itemData.animationEffects[i];
                break;
            }
        }

    } else if(elementType == "sound") {
        debug("WHERE IS MY SOUND");
        debug(elementName);
        for(let i = 0; i < itemData.sounds.length;i++) {
            if(itemData.sounds[i].label == elementName) {
                elementData = itemData.sounds[i];
                break;
            }
        }

    }
    debug(elementData);
    return CopyObj(elementData);
}