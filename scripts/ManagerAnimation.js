import {
    retrieveItemConfiguration,
    ItemConfigModel
} from './ManagerConfiguration.js';

import {
    iniIt
} from './items.js'

import {
    ANIMATIONTYPE,
    PATH
} from "./constants.js";

import {
    playRangedOrMeele,
    playOnToken,
    playOnArea
} from './animations.js';

export async function playMeAnAnimation(SwadeItem,source,targets,rolls) {

    /** AKI EU PEGO O ITEM CONFIG E MANDO PRA FRENTE so o itemConfig, source, target */
    // retrieveItemConfiguration agora deve receber item e dentro dele verificar o tipo

    // dependendo do tipo do config playonsource , playranged, playontarget
    // depois verifica se tem efeito.. efeito sempre no target

    let itemData = {};
    itemData = retrieveItemConfiguration(SwadeItem);
    console.log("PLAY ANIMATION FOR");
    console.log(itemData);
    if(itemData.isValid) {
        let animationName = "temp";
        
        if(itemData.animationType == ANIMATIONTYPE.RANGED || itemData.animationType == ANIMATIONTYPE.MELEE) {
            for(let i=0;i<targets.length;i++) {
                await playRangedOrMeele(source,targets[i],itemData.animation,itemData.sound,false,animationName);
            }
            
        } else if(itemData.animationType == ANIMATIONTYPE.TARGET) {
            await playOnToken(source,itemData.animation,itemData.sound,animationName);
        } else if(itemData.animationType == ANIMATIONTYPE.TEMPLATE) {
            console.log("PLAY A TEMPLATE");
            if(itemData.template == "cone") {
                let position = getConePoints();
                await playRangedOrMeele(position[0],position[1],itemData.animation,itemData.sound,false,animationName);
            } else if(itemData.template == 'circle') {
                let template = canvas.templates?.placeables?.[0]?.document;
                let target = { x: template.x, y: template.y };
                
                itemData.animationEffect.size = itemData.animationEffect.size*template.distance;
                itemData = Object.assign({},itemData);
                console.log(itemData.animationEffect.size);
                await playRangedOrMeele(source,target,itemData.animation,itemData.sound,false,animationName);
                targets = [template];
            }
            
            //console.log(itemData);
            //console.log(template);


        }

        if(rolls[0].result != 'missed') {
            applyEffect(itemData,targets,rolls);
        }
    }

    
    

}

export async function applyEffect(item,targets,rolls) {
    console.log("applyEffect");
    console.log(item.animationEffect);
    let animationName = "";
    
    //APPLY REAL EFFECT
    console.log("APLY EFFECT");
    console.log(item);
    if(item.activeEffects.length) {
        console.log("APPLY EFFECT");
        const folder = game.folders.getName("SWADEEffects");
        let content = folder.contents.concat(folder.getSubfolders(true).flatMap(f => f.contents));
        let allEffects = "";

        for(let i = 0; i< content.length; i++) {
            if(content[i].name.trim().toLowerCase()=="alleffects") {
                allEffects = Array.from(content[i].effects);
                break;
            }
        }
        let effectName = "";
        for(let j = 0; j < item.activeEffects.length; j++) {
            if(item.activeEffects[j].type == rolls[0].result) {
                effectName = item.activeEffects[j].label;
            }
        }
        console.log("APPLY EFFECT: "+effectName);
        let effectDoc = {};
        for(let n = 0; n < allEffects.length; n++) {
            if(allEffects[n].label == effectName) {
                effectDoc = allEffects[n];
                animationName = allEffects[n].label;
            }
        }
        console.log("APPLY EFFECT DOC: ");
        console.log(effectDoc);
        console.log(targets);

        for(let t = 0; t< targets.length; t++) {
            targets[t].actor.createEmbeddedDocuments('ActiveEffect', [effectDoc]);
        }
    }
    if(item.animationEffect.file != "") {
        for(let i=0;i<targets.length;i++) {
            if(item.animationEffect.attachTo) {
                await playOnToken(targets[i],item.animationEffect,{ file: PATH.AUDIO + "Empty_Audio.ogg", delay: 0, volume: 0.0 },animationName);
            } else {
                await playOnArea(targets[i],item.animationEffect,{ file: PATH.AUDIO + "Empty_Audio.ogg", delay: 0, volume: 0.0 },animationName);
            }
            
        }
    }
}

export function initAnimations() {
    iniIt();
}

function getConePoints() {
    let template = canvas.templates?.placeables?.[canvas.templates.placeables.length - 1]?.document;
    const location = { x: template.x, y: template.y }
    const toLocation = { x: template.x, y: location.y }

    let seno = [];
    seno[0] = 0.08715574;
    seno[1] = 0.17364818;
    seno[2] = 0.25881905;
    seno[3] = 0.34202014;
    seno[4] = 0.34202014; //20
    seno[5] = 0.42261826; //25
    seno[6] = 0.5; //30
    seno[7] = 0.57357644; //35
    seno[8] = 0.64278761; //40
    seno[9] = 0.70710678; //45
    seno[10] = 0.76604444; //50
    seno[11] = 0.81915204; //55
    seno[12] = 0.8660254; //60
    seno[13] =  0.90630779; //65
    seno[14] = 0.93969262; //70
    seno[15] = 0.96592583; //75
    seno[16] = 0.98480775;
    seno[17] = 0.9961947;
    seno[18] = 1;

    if(template.direction <= 90) {
        toLocation.x = template.x+(seno[(90-template.direction)/5]*(template.distance*100));
        toLocation.y = template.y+(seno[(template.direction)/5]*(template.distance*100));
        } else if(template.direction <= 180) {
        let angulo = template.direction - 90;
        toLocation.x = template.x-(seno[(90-angulo)/5]*(template.distance*100));
        toLocation.y = template.y+(seno[(angulo)/5]*(template.distance*100));
        } else if(template.direction <= 270) {
        let angulo = template.direction - 180;
        toLocation.x = template.x-(seno[(90-angulo)/5]*(template.distance*100));
        toLocation.y = template.y-(seno[(angulo)/5]*(template.distance*100));
        } else {
        let angulo = template.direction - 270;
        toLocation.x = template.x+(seno[(angulo)/5]*(template.distance*100));
        toLocation.y = template.y-(seno[(90-angulo)/5]*(template.distance*100));
        }

    canvas.scene.deleteEmbeddedDocuments('MeasuredTemplate',[template.id]);
    return [location, toLocation];

}