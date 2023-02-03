//dependencies
/**
 * advanced macros
 *   - lib-wrapper
 *   - socketlib
 * sequencer
 * JBA
 */

import {
    MODULE, 
    ROLLRESULT,
    getHashName
} from "./constants.js"

import {
    getRollResult,
    //RollResult,
} from "./ManagerRoll.js";

import {
    playMeAnAnimation,
    initAnimations,
    applyEffect
} from "./ManagerAnimation.js";

import {
    my_open_item_config
} from './ManagerConfiguration.js';


Hooks.once('init', () => {
    console.log("INIT MODULE");
    Handlebars.registerHelper('clean', function (aString) {
        return aString.replaceAll("'","");
    });
    //registerSettings();
});

/**
 * Basic Hooks
 */
Hooks.once('ready', () => {
    console.log("Hooks on ready");
    initAnimations();
});

/**
 * SWADE Hooks
 */

Hooks.on('swadeAction', (swadeActor, swadeItem, actionType, roll, id) => {
    console.log("Hooks on swadeAction");
    console.log(swadeItem);
    const token = swadeActor.parent?.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(swadeItem.id))
    let targets =Array.from(game.user.targets);
    let rolls = getRollResult(roll, targets, MODULE.SWADE);
    
    playMeAnAnimation(swadeItem,token,targets,rolls);
    //
});

/**
 * Item Hooks
 */


Hooks.on('getItemSheetHeaderButtons', (sheet, buttons) => {
    console.log("Hooks on  getItemSheetHeaderButtons");
    buttons.unshift({
        class: 'swadeaimated_config_button',
        label: 'ANI',
        icon: 'fas fa-video',
        onclick: () => my_open_item_config(sheet.item)
    });
});

Hooks.on('swadeConsumeItem', (swadeItem, charges, usage) => {
    console.log("Hooks on  swadeConsumeItem");
    const token = swadeItem.parent?.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(swadeItem.id));
    let rolls = [];
    rolls[0] = {};
    rolls[0].result = ROLLRESULT.HIT;
    playMeAnAnimation(swadeItem,token,[token],rolls);
});

/**
 * Effect Hooks
 */

Hooks.on("createActiveEffect", (effect, data, userId) => {
    console.log("Hooks on  getItemSheetHeaderButtons");
});

async function disableEffect(effectName,token_item) {
    console.log("DISABLE EFFECT");
    let label = getHashName(effectName);
    console.log(label);
    await Sequencer.EffectManager.endEffects({ name: String(label), object: token_item });
}


Hooks.on("preDeleteActiveEffect", (effect, data, userId) => {
    console.log("Hooks on  preDeleteActiveEffect");
    const token = effect.parent?.token || canvas.tokens.placeables.find(token => token.actor?.effects?.get(effect.id))
    
    disableEffect(effect.label,token);

});

Hooks.on("dropCanvasData", async  (data1, data2) => {
    console.log("dropCanvasData");
    console.log(data1);
    console.log(data2);

});

/**
 * Support to better rolls
 */

Hooks.on("BRSW-RollItem", async (data, html) => {
    console.log("Hooks on BRSW-RollItem");
});
Hooks.on("BRSW-BeforePreviewingTemplate", async (template, data, ev) => {
    console.log("Hooks on BRSW-BeforePreviewingTemplate");
})
Hooks.on("BRSW-CreateItemCardNoRoll", async (data) => {
    console.log("Hooks on BRSW-CreateItemCardNoRoll");
});