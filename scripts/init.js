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
    my_open_item_config
} from './ManagerConfiguration.js';

import {
    burrowOff,
    stopFly
} from './animations.js';

let ready = false;
Hooks.once('init', () => {
    debug("INIT MODULE");
    CONFIG.debug.hooks = false;
    Handlebars.registerHelper('clean', function (aString) {
        return aString.replaceAll("'","");
    });
    //registerSettings();
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
    debug("Hooks on swadeAction");
    debug(swadeItem);
    const token = swadeActor.parent?.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(swadeItem.id))
    let targets =Array.from(game.user.targets);
    let rolls = getRollResult(roll, targets, MODULE.SWADE);
    
    playMeAnAnimation(swadeItem,token,targets,rolls);
    
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
    debug("DISABLE TMFX EFFECT");
    debug("Token ID: "+token_item.id);
    if(TMFXEffectsList.includes(effect.label)) {
        token_item.TMFXdeleteFilters(effect.label);
    } else {
        let label = getHashName(effect.label);
        await Sequencer.EffectManager.endEffects({ name: String(label), object: token_item });
    }
    
    if(effect.label.toLowerCase().includes("fly")) {
        stopFly(token_item);
    } else if(effect.label.toLowerCase().includes("burrow")) {
        burrowOff(token_item);
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
    debug("ROLLS",rolls);
    playMeAnAnimation(swadeItem,token,rolls);
    
});
Hooks.on("BRSW-BeforePreviewingTemplate", async (template, data, ev) => {
    debug("Hooks on BRSW-BeforePreviewingTemplate");
})
Hooks.on("BRSW-CreateItemCardNoRoll", async (data) => {
    debug("Hooks on BRSW-CreateItemCardNoRoll");
});

Hooks.on('renderChatMessage', (message, html) => {

});


Hooks.on("createMeasuredTemplate", (template, temp, id) => {
    setNTemplate(getNTemplate()+1);

});