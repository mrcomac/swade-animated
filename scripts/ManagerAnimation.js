import {
    retrieveItemConfiguration
} from './ManagerConfiguration.js';

import {
    iniIt
} from './items.js'

import {
    ANIMATIONTYPE,
    debug,
    TMFXEffectsList,
    NOSOUND,
    ROLLRESULT,
    setNTemplate,
    getNTemplate,
    getHashName,
    CopyObj,
    effectsList
} from "./constants.js";

import {
    shape_change
} from './shape_change.js';

import {
    playRangedOrMeele,
    playOnToken,
    playOnArea,
    fly,
    playOnTemplate,
    burrowOn,
    playStream
} from './animations.js';

function isTargetMissed(rolls,target) {
    console.log("Not supported yet");

}
export async function playMeAnAnimation(SwadeItem,source,rolls) {
    let animationName = String(source.id); 
    let itemData = {};
    itemData = retrieveItemConfiguration(SwadeItem);
    debug("playMeAnAnimation function", itemData);
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
        if(itemData.animation[0].type == ANIMATIONTYPE.RANGED || itemData.animation[0].type == ANIMATIONTYPE.MELEE) {
            debug("Ranged or Melee animated");
            let notWait = false;
            if(rolls.targets.length > 0) {
                notWait = true;
            }
            for(let i=0;i<rolls.targets.length;i++) {
                debug("playMeAnAnimation rangedorMeele",itemData);
                
                let missed = isTargetMissed(rolls, rolls.targets[i]);
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
                playOnTemplate(itemData.animation[0],itemData.sound[0], ROLLRESULT.HIT, animationName,source);
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
            } else if(SwadeItem.name.toLowerCase().includes("shape change")) {   
                for(let i = 0; i < rolls.targets.length; i++) {
                    debug("playMeAnAnimation Shape Change",itemData);
                    await shape_change(rolls.targets[i].token,itemData.animation[0],itemData.sound[0],animationName,notWait);
                }
            }
        } else if(itemData.animation[0].type == ANIMATIONTYPE.STREAM) {
            debug("PLAY STREAM")
            for(let i = 0; i < rolls.targets.length; i++) {
                debug("playMeAnAnimation Shape Change",itemData);
                await playStream(rolls.targets[i].token, source, itemData.animation[0],itemData.sound[0],animationName);
            }
        }
    }

    
    for(let j = 0; j < rolls.targets.length; j++) {
        if(rolls.targets[j].result != ROLLRESULT.MISSED)
            applyEffect(itemData,rolls.targets[j],SwadeItem,animationName,source);
    }
    if(itemData.animationEffect.length > 0) {
        if(itemData.animationEffect[0]?.type == ANIMATIONTYPE.TEMPLATE) {
            setNTemplate(0);
        }
    }
    
}

let socket;

Hooks.once("socketlib.ready", () => {
	socket = socketlib.registerModule("swade-animated");
	socket.register("applyEffectDoc", applyEffectDoc);
});

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

async function applyEffectDoc(actor_id,effectName,animationName,sourceName,animationType) {
    let token = game.canvas.tokens.get(actor_id);

    let effectDoc = {};
    for(let n = 0; n < effectsList.length; n++) {
        if(effectsList[n].label == effectName) {
            effectDoc = CopyObj(effectsList[n]);
        }
    }
    let Data = {
        label: effectDoc.label+"("+sourceName+")"
    };
    effectDoc.name = effectDoc.name+"("+sourceName+")";
    
    if(effectDoc.flags?.swadeanimated?.animation) {
        effectDoc.flags.swadeanimated.animation = String(getHashName(animationName));
        effectDoc.flags.swadeanimated.animationType = animationType;
    } else {
        effectDoc.flags["swadeanimated"] = {
            animation: String(getHashName(animationName)),
            animationType: animationType
        }
    }

    debug("Effect Doc",effectDoc);
    let previousEffect = token.actor.effects.filter(i => (i.name.toLowerCase().includes(effectDoc.name.toLowerCase().replace(/\s\(Raise\)|\(Normal\)/, "")) ));
    if(previousEffect.length > 0) {
        token.actor.deleteEmbeddedDocuments('ActiveEffect', [Array.from(previousEffect)[0].id]);
    }
    token.actor.createEmbeddedDocuments('ActiveEffect', [effectDoc]);

}

export async function applyEffect(item,target,SwadeItem,animationName,source) {
    debug("applyEffect",item);
    
    //let animationName = "effect";
    let effectName = "";
    if(item.activeEffects.length) {
        debug("there is an effect to apply");
        
        
        for(let j = 0; j < item.activeEffects.length; j++) {
            if(item.activeEffects[j].type == target.result) {
                effectName = item.activeEffects[j].label;
            }
        }
        debug("Applying this effect: "+effectName);
        socket.executeAsGM("applyEffectDoc", target.token.id,effectName,animationName +","+item.animationEffect[0].label+","+target.token.id,source.name, item.animationType);
        
    }

    if(item.animationEffect.length > 0) {
        let EFFECTSOUND = NOSOUND;
        if(item.animation.length  == 0 || item.animation[0]?.type == ANIMATIONTYPE.NONE) {
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
            } else if(SwadeItem.name.toLowerCase().includes("shape change")) {   
                debug("playMeAnAnimation Shape Change");
                await shape_change(target.token,item.animationEffect[0],item.sound[0],animationName,true);
            }
        } else if(item.animationEffect[0].type == ANIMATIONTYPE.TEMPLATE) {
            debug("TEMPLATES: ",getNTemplate());
            if(getNTemplate()==0) {
                debug("playMeAnAnimation onToken",item);
                await playOnToken(target.token,item.animationEffect[0],EFFECTSOUND,animationName,false);
            } else {
                debug("playMeAnAnimation onTemplate",item);
                playOnTemplate(item.animationEffect[0],EFFECTSOUND, ROLLRESULT.HIT, animationName,target.token);
            }
        } else if(item.animationEffect[0].type == ANIMATIONTYPE.RANGED) {
            playRangedOrMeele(source,target.token,item.animationEffect[0],EFFECTSOUND,ROLLRESULT.HIT,animationName,true)
        } else if(item.animationEffect[0].type == ANIMATIONTYPE.STREAM) {
            await playStream(target.token, source, item.animationEffect[0],item.sound[0],animationName);
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

