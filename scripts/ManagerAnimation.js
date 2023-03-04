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
            debug("TEMPLATE: ",getNTemplate());
            if(getNTemplate()==0) {
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
    if(itemData.animationEffect.length > 0) {
        if(itemData.animationEffect[0].type == ANIMATIONTYPE.TEMPLATE) {
            setNTemplate(0);
        }
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
                await fly(target.token,item.animationEffect[0],item.sound[0],animationName,false);
            } else if(SwadeItem.name.toLowerCase().includes("burrow")) { 
                debug("burrowOn");
                await burrowOn(target.token,item.animationEffect[0],item.sound[0],animationName,true);
            }
        } else if(item.animationEffect[0].type == ANIMATIONTYPE.TEMPLATE) {
            debug("TEMPLATES: ",getNTemplate());
            if(getNTemplate()==0) {
                debug("playMeAnAnimation onToken",item);
                await playOnToken(target.token,item.animationEffect[0],EFFECTSOUND,animationName,false);
            } else {
                debug("playMeAnAnimation onTemplate",item);
                playOnTemplate(item.animationEffect[0],EFFECTSOUND, ROLLRESULT.HIT, animationName);
            }
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
