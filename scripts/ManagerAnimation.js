import {
    retrieveItemConfiguration,
    ItemConfigModel
} from './ManagerConfiguration.js';

import {
    iniIt
} from './items.js'

import {
    ANIMATIONTYPE,
    PATH,
    debug,
    TMFXEffectsList,
    NOSOUND,
    ROLLRESULT,
    setNTemplate,
    getNTemplate
} from "./constants.js";

import {
    playRangedOrMeele,
    playOnToken,
    playOnArea,
    fly,
    playOnTemplate,
    burrowOn
} from './animations.js';

export async function playMeAnAnimation(SwadeItem,source,rolls) {    
    let itemData = {};
    itemData = retrieveItemConfiguration(SwadeItem);
    if(rolls.targets.length == 0) {
        if(rolls.rawValue >= 8) {
            rolls.targets = [ { token: source, result: ROLLRESULT.RAISE } ];
        } else if(rolls.rawValue >= 4) {
            rolls.targets = [ { token: source, result: ROLLRESULT.HIT } ];
        } else {
            rolls.targets = [ { token: source, result: ROLLRESULT.MISSED } ];
        }
    }

    if(itemData.isValid && itemData.animation.length > 0) {
        let animationName = "temp";
        if(itemData.animation[0].type == ANIMATIONTYPE.RANGED || itemData.animation[0].type == ANIMATIONTYPE.MELEE) {
            let notWait = false;
            if(rolls.targets.length > 0) {
                notWait = true;
            }
            for(let i=0;i<rolls.targets.length;i++) {
                debug("playMeAnAnimation rangedorMeele",itemData);
                await playRangedOrMeele(source,rolls.targets[i].token,itemData.animation[0],itemData.sound[0],rolls.targets[i].result,animationName,notWait);
            }
            
        } else if(itemData.animation[0].type == ANIMATIONTYPE.TARGET) {
            let notWait = false;
            if(rolls.targets.length > 1) {
                notWait = true;
            }
            for(let i = 0; i < rolls.targets.length; i++) {
                debug("playMeAnAnimation onToken",itemData);
                await playOnToken(rolls.targets[i].token,itemData.animation[0],itemData.sound[0],animationName,notWait);
            }
        } else if(itemData.animation[0].type == ANIMATIONTYPE.TEMPLATE) {
            if(getNTemplate() == canvas.templates.placeables.length) {
                for(let i = 0; i < rolls.targets.length; i++) {
                    debug("playMeAnAnimation onToken",itemData);
                    await playOnToken(rolls.targets[i].token,itemData.animation[0],itemData.sound[0],animationName,true);
                }
            } else {
                debug("playMeAnAnimation onTemplate",itemData);
                playOnTemplate(itemData.animation[0],itemData.sound[0], ROLLRESULT.HIT, animationName);
            }
            setNTemplate(0);
            
        } else if(itemData.animation[0].type == ANIMATIONTYPE.SPECIAL) {
            let notWait = false;
            if(SwadeItem.name.toLowerCase().includes("fly")) {   
                for(let i = 0; i < rolls.targets.length; i++) {
                    debug("playMeAnAnimation onToken",itemData);
                    await playOnToken(rolls.targets[i].token,itemData.animation[0],itemData.sound[0],animationName,notWait);
                }
            } else if(SwadeItem.name.toLowerCase().includes("burrow")) {   
                for(let i = 0; i < rolls.targets.length; i++) {
                    debug("playMeAnAnimation onToken",itemData);
                    await playOnToken(rolls.targets[i].token,itemData.animation[0],itemData.sound[0],animationName,notWait);
                }
            }
        }
    }

    
    for(let j = 0; j < rolls.targets.length; j++) {
        if(rolls.targets[j].result != ROLLRESULT.MISSED)
            applyEffect(itemData,rolls.targets[j],SwadeItem);
    }
    
}

/*
(async) <PlaceableObject>.TMFXaddFilters(<params array>)
(async) <PlaceableObject>.TMFXupdateFilters(<params array>)
(async) <PlaceableObject>.TMFXaddUpdateFilters(<params array>)
(async) <PlaceableObject>.TMFXdeleteFilters(optional <filterId>)
<PlaceableObject>.TMFXhasFilterType(<filterType>)
<PlaceableObject>.TMFXhasFilterId(<filterId>)
*/
function applyEffectTMFX(token,effect) {
    debug("applyEffectTMFX",effect);
    token.TMFXaddFilters(effect.params);
}


export async function applyEffect(item,target,SwadeItem) {
    debug("applyEffect",item);
    
    let animationName = "effect";
    let effectName = "";
    if(item.activeEffects.length) {
        debug("there is an effect to apply");
        const compendium = await game.packs.find(p=>p.metadata.label=="SWADE Animated");
        if (!compendium) {
            debug( "Macros of SWADE: The compendium couldn't be found." );
            return;
          }
          let Citems = await compendium.getDocuments();
        let Eitems = await Citems.filter(p=> (p.type=='edge') && p.name=="AllEffects" );
        debug(Eitems);
        let allEffects = Array.from(Eitems[0].effects);
        
        for(let j = 0; j < item.activeEffects.length; j++) {
            if(item.activeEffects[j].type == target.result) {
                effectName = item.activeEffects[j].label;
            }
        }
        debug("Applying this effect: "+effectName);
        let effectDoc = {};
        for(let n = 0; n < allEffects.length; n++) {
            if(allEffects[n].label == effectName) {
                effectDoc = allEffects[n];
                animationName = allEffects[n].label;
            }
        }
        debug("Effect Doc",effectDoc);
        
        //effectDoc.flags.swadeanimated = {};
        //effectDoc.flags.swadeanimated.actorId= target.token.id; //actorId
        target.token.actor.createEmbeddedDocuments('ActiveEffect', [effectDoc]);
        
    }

    if(item.animationEffect.length > 0) {
        let EFFECTSOUND = NOSOUND;
        if(item.animation.length  == 0) {
            EFFECTSOUND = item.sound[0];
        }
        if(item.animationEffect[0].type == ANIMATIONTYPE.SPECIAL) {
            if(TMFXEffectsList.includes(effectName) && item.animationEffect.length > 0) {
                applyEffectTMFX(target.token,item.animationEffect[0]);            
            } else if(SwadeItem.name.toLowerCase().includes("fly")) { 
                await fly(target.token,item.animationEffect[0],item.sound[0],animationName,true);
            } else if(SwadeItem.name.toLowerCase().includes("burrow")) { 
                debug("burrowOn");
                await burrowOn(target.token,item.animationEffect[0],item.sound[0],animationName,true);
            }
        } else if(item.animationEffect[0].type == ANIMATIONTYPE.TEMPLATE) {
            playOnTemplate(item.animationEffect[0],EFFECTSOUND, ROLLRESULT.HIT, animationName);
        } else {
            if(item.animationEffect[0].attachTo) {
                await playOnToken(target.token,item.animationEffect[0],EFFECTSOUND,animationName);
            } else {
                await playOnArea(target.token,item.animationEffect[0],EFFECTSOUND,animationName);
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

    //canvas.scene.deleteEmbeddedDocuments('MeasuredTemplate',[template.id]);
    return [location, toLocation];

}