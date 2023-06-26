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
    getNTemplate,
    getHashName,
    CopyObj
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
    burrowOn
} from './animations.js';


let socket;
Hooks.once("ready", () => {
    socket = socketlib.registerModule("swade-animated");
    socket.register("applyDoc", applyDoc);
    
});


function isTargetMissed(rolls,target) {
   

}

export async function playMeAnAnimation(SwadeItem,source,rolls) {   
    let itemData = {};
    let animationName = "temp";
    itemData = retrieveItemConfiguration(SwadeItem);
    debug("playMeAnAnimation function", itemData);
    console.log("ROLL");
    console.log(rolls);
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
        animationName = itemData.animation[0].file+"-"+source.id
        
        if(itemData.animationType == ANIMATIONTYPE.RANGED || itemData.animationType == ANIMATIONTYPE.MELEE) {
            debug("Ranged or Melee animated");
            let notWait = false;
            if(rolls.targets.length > 0) {
                notWait = true;
            }
            for(let i=0;i<rolls.targets.length;i++) {
                debug("playMeAnAnimation rangedorMeele",itemData);
                
                //let missed = isTargetMissed(rolls, rolls.targets[i]);
                await playRangedOrMeele(source,rolls.targets[i].token,itemData.animation[0],itemData.sound[0],rolls.targets[i].result,animationName,notWait);
            }
            
        } else if(itemData.animationType == ANIMATIONTYPE.TARGET) {
            let notWait = false;
            if(rolls.targets.length > 1) {
                notWait = true;
            }
            for(let i = 0; i < rolls.targets.length; i++) {
                debug("playMeAnAnimation onToken",itemData);
                await playOnToken(rolls.targets[i].token,itemData.animation[0],itemData.sound[0],animationName,notWait);
            }
        } else if(itemData.animationType == ANIMATIONTYPE.TEMPLATE) {
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
            
        } else if(itemData.animationType == ANIMATIONTYPE.SPECIAL) {
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
        }
    }

    
    for(let j = 0; j < rolls.targets.length; j++) {
        if(rolls.targets[j].result != ROLLRESULT.MISSED)
            //console.log(`The GM client calculated: ${result}`);
            //game.socketlib..executeAsGM(handler, parameters...);
            applyEffect(itemData,rolls.targets[j],SwadeItem, animationName,source);
    }
    if(itemData.animationEffect.length > 0) {
        if(itemData.animationType == ANIMATIONTYPE.TEMPLATE) {
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

async function applyDoc(target_id, source_id, previous_id, effectName,animationName) {
    console.log("APPLY DOC");
    debug("there is an effect to apply");
    let target = game.scenes.current.tokens.filter(el => el.id === target_id)[0]
    console.log("TARGET PASSED")
    console.log(target)
    console.log(target.actor)
    let source = game.scenes.current.tokens.filter(el => el.id === source_id)[0]
    console.log("SOURCE PASSED")
    console.log(source)
    const compendium = await game.packs.find(p=>p.metadata.label=="SWADE Animated");
    if (!compendium) {
        debug( "Macros of SWADE: The compendium couldn't be found." );
        return;
    }
    let Citems = await compendium.getDocuments();
    let Eitems = await Citems.filter(p=> (p.type=='edge') && p.name=="AllEffects" );
    debug(Eitems);
    let allEffects = Array.from(Eitems[0].effects);

    let effectDoc = {};
    for(let n = 0; n < allEffects.length; n++) {
        console.log("EFFECT IN COMP")
        console.log(allEffects[n].name+"=="+effectName)
        if(allEffects[n].name == effectName) {
            effectDoc = CopyObj(allEffects[n]);
            //animationName = allEffects[n].name;
        }
    }
    
        
    console.log("Effect Doc BEFORE")
    console.log(effectDoc);
    
    effectDoc.flags.swadeanimated = {}
    effectDoc.flags.swadeanimated.animationName = getHashName(animationName)
    //effectDoc.update(Data);
    effectDoc.name = effectDoc.name + "("+source.name+")";
    console.log("Effect Doc AFTER",effectDoc);

    //return;
    if(previous_id != 0) {
        target.actor.deleteEmbeddedDocuments('ActiveEffect', [previous_id]);
    }
    target.actor.createEmbeddedDocuments('ActiveEffect', [effectDoc]);
}

export async function applyEffect(item,target,SwadeItem,animationName,source) {
    debug("applyEffect",item);
    //console.log("EFFECT",source)
    
    //animationName = "effect";
    let effectName = "";
    if(item.activeEffects.length) {
        for(let j = 0; j < item.activeEffects.length; j++) {
            if(item.activeEffects[j].type == target.result) {
                effectName = item.activeEffects[j].name;
            }
        }
        let previousEffect = target.token.actor.effects.filter(i => (i.name.toLowerCase().includes(effectDoc.name.toLowerCase().replace(/\s\(.*\)/, "")) ));
        debug("Applying this effect: "+effectName);
        let prev = Array.from(previousEffect)
        let previous_pass = 0
        if(prev.length > 0)  previous_pass = prev[0].id

        //effectDoc.label = effectDoc.label + "("+source.name+")"
        console.log("TARGET")
        console.log(target.token.id)
        await socket.executeAsGM("applyDoc", target.token.id, source.id, previous_pass, effectName,animationName ); //socket.executeAsGM("add", 5, 3);
           
        
        
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
