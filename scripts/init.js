//CONFIG.debug.hooks = true
// re-implementar a animacao proton
import {
    MODULE, 
    ROLLRESULT,
    getHashName,
    debug,
    TMFXEffectsList,
    ANIMATIONTYPE,
    setNTemplate,
    getNTemplate
} from "./constants.js"

import {
    getRollResult
} from "./ManagerRoll.js";

import {
    playMeAnAnimation,
    initAnimations,
    applyEffect
} from "./ManagerAnimation.js";

import {
    shapeChangeOff
} from './shape_change.js';

import {
    my_open_item_config,
    registerSettings
} from './ManagerConfiguration.js';

import {
    burrowOff,
    stopFly
} from './animations.js';

let ready = false;
Hooks.once('init', () => {
    registerSettings();
    debug("INIT MODULE");
    CONFIG.debug.hooks = false;
    Handlebars.registerHelper('clean', function (aString) {
        return aString.replaceAll("'","");
    });
    
});

/**
 * Basic Hooks
 */
Hooks.once('ready', () => {
    debug("Hooks on ready");
    ready = true;
    initAnimations();
});

/**
 * SWADE Hooks
 */

Hooks.on('swadeAction', (swadeActor, swadeItem, actionType, roll, id) => {
    if(actionType != 'formula') return;
    debug("Hooks on swadeAction",actionType);
    debug(swadeItem);
    const token = swadeActor.parent?.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(swadeItem.id))
    let targets =Array.from(game.user.targets);
    let rolls = getRollResult(roll, targets, MODULE.SWADE);
    debug("Final Roll Result",rolls);
    
    playMeAnAnimation(swadeItem,token,rolls);
    
});

/**
 * Item Hooks
 */


Hooks.on('getItemSheetHeaderButtons', (sheet, buttons) => {
    debug("Hooks on getItemSheetHeaderButtons");
    buttons.unshift({
        class: 'swadeaimated_config_button',
        label: 'ANI',
        icon: 'fas fa-video',
        onclick: () => my_open_item_config(sheet.item)
    });
});

Hooks.on('swadeConsumeItem', (swadeItem, charges, usage) => {
    debug("Hooks on  swadeConsumeItem");
    if(swadeItem.type !== "consumable") return;

    const token = swadeItem.parent?.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(swadeItem.id));
    let rolls = {
        targets: [ { token: token, result: ROLLRESULT.HIT } ],
        type: ANIMATIONTYPE.TARGET,
        rawValue: 0
    };
    playMeAnAnimation(swadeItem,token,rolls);
});

/**
 * Effect Hooks
 */

Hooks.on("createActiveEffect", (effect, data, userId) => {
    debug("Hooks on  getItemSheetHeaderButtons");
});

async function disableEffect(effect,token_item) {
    if(token_item?.id) {
        debug("Token ID: "+token_item.id);
        if(TMFXEffectsList.includes(effect.label)) {
            debug("DISABLE TMFX EFFECT");
            token_item.TMFXdeleteFilters(effect.label);
        } else {
            //let label = getHashName(effect.label);
            if(effect.flags?.swadeanimated?.animation) {
                if(effect.flags.swadeanimated?.animationType == ANIMATIONTYPE.RANGED || effect.flags.swadeanimated?.animationType == ANIMATIONTYPE.STREAM)
                    await Sequencer.EffectManager.endEffects({ name: String(effect.flags.swadeanimated.animation) });
                else
                await Sequencer.EffectManager.endEffects({ name: String(effect.flags.swadeanimated.animation), object: token_item });
            }
        }
        if(effect.label.toLowerCase().includes("fly")) {
            await Sequencer.EffectManager.endEffects({ name: String(effect.flags.swadeanimated.animation)});
            stopFly(token_item);
        } else if(effect.label.toLowerCase().includes("burrow")) {
            burrowOff(token_item);
        } else if(effect.label.toLowerCase().includes("shape change")) {
            shapeChangeOff(token_item);
        }
    }
}


Hooks.on("preDeleteActiveEffect", (effect, data, userId) => {
    debug("Hooks on  preDeleteActiveEffect");
    const token = canvas.tokens.placeables.find(token => token.actor?.effects?.get(effect.id))
    
    disableEffect(effect,token);

});

Hooks.on("dropCanvasData", async  (data1, data2) => {
    debug("dropCanvasData");

});

/**
 * Support to better rolls
 */
Hooks.on("BRSW-RollItem", async (data, html) => {
    debug("Hooks on BRSW-RollItem");
    const token = data.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(data.item_id))
    const swadeItem = data.item;
    let targets =Array.from(game.user.targets);
    let rolls = getRollResult(data.message, targets, MODULE.BR2);
    debug("Final Roll Result",rolls);
    playMeAnAnimation(swadeItem,token,rolls);
    
});
Hooks.on("BRSW-BeforePreviewingTemplate", async (template, data, ev) => {
    debug("Hooks on BRSW-BeforePreviewingTemplate");
})
Hooks.on("BRSW-CreateItemCardNoRoll", async (data) => {
    debug("Hooks on BRSW-CreateItemCardNoRoll");
});

/*
Hooks.on('renderChatMessage', (message, html) => {

});
*/

Hooks.on("createMeasuredTemplate", (template, temp, id) => {
    setNTemplate(getNTemplate()+1);

});

Hooks.on("targetToken", (SwadeUser, target, selected) => {
    
    
});
