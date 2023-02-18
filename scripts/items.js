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

export function getItem(item) {
    debug("GETITEM");
    debug(item);
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
                debug("INTERNO");
                debug(PowerList[i]);
                itemData = PowerList[i];
                break;
            }
        }
    } else if(item.type == "weapon") {
        for(let i=0;i<WeaponList.length;i++) {
            if(item.name.trim().toLocaleLowerCase().includes(WeaponList[i].name.trim().toLocaleLowerCase())) {
                debug(WeaponList[i]);
                itemData = WeaponList[i];
                break;
            }
        }
    }
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