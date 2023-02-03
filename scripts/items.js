import {
    PATH,
    ANIMATIONTYPE,
    ROLLRESULT,
    CopyObj
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
    initConsumables();
    initWeapons();
}

export function getItem(item) {
    console.log("GETITEM");
    console.log(item);
    let itemData ={};
    if(item.type == "consumable") {
        console.log("Consumable");
        for(let i=0;i<ConsumableList.length;i++) {
            if(item.name.trim().toLocaleLowerCase().includes(ConsumableList[i].name.trim().toLocaleLowerCase())) {
                itemData = ConsumableList[i];
                break;
            }
        }
    } else if(item.type == "power") {
        for(let i=0;i<PowerList.length;i++) {
            if(item.name.trim().toLocaleLowerCase().includes(PowerList[i].name.trim().toLocaleLowerCase())) {
                console.log("INTERNO");
                console.log(PowerList[i]);
                itemData = PowerList[i];
                break;
            }
        }
    } else if(item.type == "weapon") {
        for(let i=0;i<WeaponList.length;i++) {
            if(item.name.trim().toLocaleLowerCase().includes(WeaponList[i].name.trim().toLocaleLowerCase())) {
                console.log(WeaponList[i]);
                itemData = WeaponList[i];
                break;
            }
        }
    }
    return  CopyObj(itemData);
}


export function getElementItem(item,elementName,elementType) {
    console.log("GETELEMENT");
    let itemData = getItem(item);
    let elementData = [];

    if(elementType == 'animation') {
        console.log("IS ANIMATION");
        console.log(elementName);
        for(let i = 0; i < itemData.animations.length;i++) {
            if(itemData.animations[i].label == elementName) {
                elementData = itemData.animations[i];
            }
        }
    } else if(elementType == "animationEffect") {
        for(let i = 0; i < itemData.animationEffects.length;i++) {
            if(itemData.animationEffects[i].label == elementName) {
                elementData = itemData.animationEffects[i];
            }
        }

    } else if(elementType == "sound") {
        console.log("WHERE IS MY SOUND");
        console.log(elementName);
        for(let i = 0; i < itemData.sounds.length;i++) {
            if(itemData.sounds[i].label == elementName) {
                elementData = itemData.sounds[i];
            }
        }

    }
    console.log(elementData);
    return CopyObj(elementData);
}