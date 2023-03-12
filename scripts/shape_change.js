import { playOnToken } from './animations.js';
import {
    getShapeChangeCompendium
} from './constants.js';

let officialClass = '<div>'

export async function shape_change(target_token, animation, sound, animationName, notWait) {
    if (game.modules.get("swpf-core-rules")?.active) { officialClass = '<div class="swade-core">' }
    else if (game.modules.get("deadlands-core-rules")?.active) { officialClass = '<div class="swade-core">' }
    else if (game.modules.get("sprawl-core-rules")?.active) { officialClass = '<div class="sprawl-core">' }
    else if (game.modules.get("swade-core-rules")?.active) { officialClass = '<div class="swade-core">' }

    let creatures = await get_creatures();
    let shapeChangeConfig = target_token.actor.items.find(p => p.name.toLowerCase() == "shape change");
    let the_buttons;
    if (shapeChangeConfig.flags?.swadeanimated?.shapechange) {
        the_buttons = {
            one: {
                label: `<i class="fas fa-paw"></i>Shape Change`,
                callback: async (html) => {
                    const scID = html.find(`#selected_sc`)[0].value;
                    await apply_shape(target_token, scID, html.find(`#raise`)[0].checked, shapeChangeConfig.flags.swadeanimated.shapechange.active,animation,sound,animationName);
                }
            }
        }

        //}
    }
    let creatureOptions;
    for (let each of creatures) {
        let size = each.system.stats.size;
        let maxSize = 0;
        if (target_token.actor.system.advances?.value < 4) { maxSize = -1 }
        else if (target_token.actor.system.advances?.value < 8) { maxSize = 0 }
        else if (target_token.actor.system.advances?.value < 12) { maxSize = 2 }
        else if (target_token.actor.system.advances?.value < 16) { maxSize = 4 }
        else if (target_token.actor.system.advances?.value >= 16) { maxSize = 10 }


        if (size <= maxSize) {
            creatureOptions = creatureOptions + `<option value="${each.id}">${each.name}</option>`;
        }
    }

    let cc_message = `${officialClass}
        <p>You are casting Shape Change.</p>
        <p>Please select a creature to change into:</p>
        <div class="form-group">
            <label for="selected_sc">Target form: </label>
            <select id="selected_sc">${creatureOptions}</select>
        </div>
        <div class="form-group">
            <label for="raise">Cast with a raise: </label>
            <input id="raise" name="raiseBox" type="checkbox"></input>
        </div>
        </div>`;

    new Dialog({
        title: 'Shape Change',
        content: cc_message,
        buttons: the_buttons,
        default: "one",
    }).render(true);

}

export async function shapeChangeOff(token) {
    let shapeChangeConfig = token.actor.items.find(p => p.name.toLowerCase() == "shape change");
    if (shapeChangeConfig.flags?.swadeanimated?.shapechange.active) {
        revert_form(token);
    }
}
async function revert_form(token) {
    let shapeChangeConfig = token.actor.items.find(p => p.name.toLowerCase() == "shape change");
    let shapeChange = {
        'active': false,
        'attributes': '',
        'stats': '',
        'items': '',
        'img': '',
        'name': '',
        'scale': ''
    };

    let updateData = {
        "system.attributes.agility.die.sides": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.agility_side,
        "system.attributes.agility.die.modifier": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.agility_mod,
        "system.attributes.strength.die.sides": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.strength_side,
        "system.attributes.strength.die.modifier": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.strength_mod,
        "system.attributes.vigor.die.sides": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.vigor_side,
        "system.attributes.vigor.die.modifier": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.vigor_mod,
        "system.stats.size": shapeChangeConfig.flags?.swadeanimated?.shapechange.scale,
    };

    token.document.update(
        {
            'img': shapeChangeConfig.flags?.swadeanimated?.shapechange.img,
            'name': shapeChangeConfig.flags?.swadeanimated?.shapechange.name
        });

    token.actor.update(shapeChangeConfig.flags?.swadeanimated?.shapechange.stats);
    token.actor.update(updateData);
    await set_token_size(token, shapeChangeConfig.flags?.swadeanimated?.shapechange.scale);

    let actual_skills = token.actor.items.filter(item => item.type === "skill")
    let original_skills = shapeChangeConfig.flags?.swadeanimated?.shapechange.items;
    for (let skill of actual_skills) {
        let has_skill = original_skills.find(s => (s.name.toLowerCase() === skill.name.toLowerCase()))
        if (has_skill) {
            await skill.update({
                "system.die.sides": has_skill.side,
                "system.die.modifier": has_skill.modifier
            });
        } else {
            token.actor.deleteEmbeddedDocuments('Item', [skill._id]);
        }
    }

    let itemsToRemove = shapeChangeConfig.flags?.swadeanimated?.shapechange.toRemove;
    let itemList = token.actor.items.filter(i => (i.type === "edge" || i.type === "hindrance"));
    for (let itemName of itemsToRemove) {
        let item = itemList.find(i => (i.name.toLowerCase() === itemName.toLowerCase()));
        if (item) {
            await token.actor.deleteEmbeddedDocuments('Item', [item._id]);
        }
    }

    const Data = {
        flags: {
            swadeanimated: {
                shapechange: shapeChange
            }
        }
    }
    try {
        shapeChangeConfig.update(Data);
    } catch (err) {
        console.log(err);
    }
}

async function revert_statuses(token) {
    let shapeChangeConfig = token.actor.items.find(p => p.name.toLowerCase() == "shape change");

    let updateData = {
        "system.attributes.agility.die.sides": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.agility_side,
        "system.attributes.agility.die.modifier": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.agility_mod,
        "system.attributes.strength.die.sides": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.strength_side,
        "system.attributes.strength.die.modifier": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.strength_mod,
        "system.attributes.vigor.die.sides": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.vigor_side,
        "system.attributes.vigor.die.modifier": shapeChangeConfig.flags?.swadeanimated?.shapechange.attributes.vigor_mod,
        "system.stats.size": shapeChangeConfig.flags?.swadeanimated?.shapechange.scale,
    };

    await token.document.update(
        {
            'name': shapeChangeConfig.flags?.swadeanimated?.shapechange.name
        });

    await token.actor.update(shapeChangeConfig.flags?.swadeanimated?.shapechange.stats);
    await token.actor.update(updateData);
    await set_token_size(token, shapeChangeConfig.flags?.swadeanimated?.shapechange.scale);

    let actual_skills = token.actor.items.filter(item => item.type === "skill")
    let original_skills = shapeChangeConfig.flags?.swadeanimated?.shapechange.items;
    for (let skill of actual_skills) {
        let has_skill = original_skills.find(s => (s.name.toLowerCase() === skill.name.toLowerCase()))
        if (has_skill) {
            await skill.update({
                "system.die.sides": has_skill.side,
                "system.die.modifier": has_skill.modifier
            });
        } else {
            token.actor.deleteEmbeddedDocuments('Item', [skill._id]);
        }
    }

    let itemsToRemove = shapeChangeConfig.flags?.swadeanimated?.shapechange.toRemove;
    let itemList = token.actor.items.filter(i => (i.type === "edge" || i.type === "hindrance"));
    for (let itemName of itemsToRemove) {
        let item = itemList.find(i => (i.name.toLowerCase() === itemName.toLowerCase()));
        if (item) {
            await token.actor.deleteEmbeddedDocuments('Item', [item._id]);
        }
    }
}

async function apply_shape(token, scID, raise, doNotSave,animation,sound,animationName) {
    

    if(doNotSave) {
        await revert_statuses(token);
    }

    let shapeChangeConfig = token.actor.items.find(p => p.name.toLowerCase() == "shape change");
    let creatures = await get_creatures();
    let scPreset = creatures.find(a => (a.id === scID)).toObject();
    let items = token.actor.items.filter(item => item.type === "skill")
    let original_skills = [];
    for (let i = 0; i < items.length; i++) {
        original_skills.push({ 'name': items[i].name, 'side': items[i].system.die.sides, 'modifier': items[i].system.die.modifier })
    }

    let new_skills = scPreset.items.filter(item => item.type === "skill");

    for (let skill of new_skills) {
        let has_skill = items.find(s => (s.name.toLowerCase() === skill.name.toLowerCase()
            && s.name.toLowerCase() != "untrained"
            && s.name.toLowerCase() != "unskilled"))
        if (has_skill) {
            if (has_skill.system.die.sides < skill.system.die.sides) {
                await has_skill.update({
                    "system.die.sides": skill.system.die.sides,
                    "system.die.modifier": skill.system.die.modifier
                });
            } else if (has_skill.system.die.sides == skill.system.die.sides) {
                if (has_skill.system.die.modifier < skill.system.die.modifier) {
                    await has_skill.update({
                        "system.die.modifier": skill.system.die.modifier
                    });
                }
            }
        } else {
            if (skill.name.toLowerCase() != "untrained" && skill.name.toLowerCase() != "unskilled") {
                token.actor.createEmbeddedDocuments('Item', [skill], { renderSheet: null });

            }
        }
    }

    let itemsToCreate = scPreset.items.filter(i => (i.type === "edge" || i.type === "hindrance"));
    let itemsAlreadyThere = token.actor.items.filter(i => (i.type === "edge" || i.type === "hindrance"));

    let itemsToRemove = [];
    for (let item of itemsToCreate) {
        let has_item = itemsAlreadyThere.find(i => (i.name.toLowerCase() === item.name.toLowerCase()));
        if (!has_item) {
            await token.actor.createEmbeddedDocuments('Item', [item]);
            itemsToRemove.push(item.name);
        }

    }

    let attributes = {
        'agility_side': token.actor.system.attributes.agility.die.sides,
        'agility_mod': token.actor.system.attributes.agility.die.modifier,
        'strength_side': token.actor.system.attributes.strength.die.sides,
        'strength_mod': token.actor.system.attributes.strength.die.modifier,
        'vigor_side': token.actor.system.attributes.vigor.die.sides,
        'vigor_mod': token.actor.system.attributes.vigor.die.modifier,
    };

    let shapeChange = {
        'active': true,
        'attributes': attributes,
        'stats': token.actor.system.stats,
        'items': original_skills,
        'toRemove': itemsToRemove,
        'img': token.document.texture.src,
        'name': token.document.name,
        'scale': token.actor.system.stats.size
    };

    let updateStr = scPreset.system.attributes.strength.die.sides;
    let updateVig = scPreset.system.attributes.vigor.die.sides;
    if (raise === true) {
        updateStr = updateStr + 2;
        updateVig = updateVig + 2;
    }
    let updateData = {
        "system.attributes.agility.die.sides": scPreset.system.attributes.agility.die.sides,
        "system.attributes.agility.die.modifier": scPreset.system.attributes.agility.die.modifier,
        "system.attributes.strength.die.sides": updateStr,
        "system.attributes.strength.die.modifier": scPreset.system.attributes.strength.die.modifier,
        "system.attributes.vigor.die.sides": updateVig,
        "system.attributes.vigor.die.modifier": scPreset.system.attributes.vigor.die.modifier,
        "system.stats.size": scPreset.system.stats.size,
    };
    await playOnToken(token,animation,sound,animationName,true);
    await token.document.update({ 'img': scPreset.prototypeToken.texture.src });
    await token.document.update({ 'name': scPreset.name + " (" + token.document.name + ")" });
    await token.actor.update(scPreset.system.stats);
    await token.actor.update(updateData);
    await set_token_size(token, scPreset.system.stats.size);

    const Data = {
        flags: {
            swadeanimated: {
                shapechange: shapeChange
            }
        }
    }

    if (!doNotSave) {
        try {
            shapeChangeConfig.update(Data);
            // Fallback that deletes all AEs that are marked as temporary:

        } catch (err) {
            console.log(err);
        }
    }
}

async function set_token_size(scCopy, scSize) {
    if (scSize <= 2 && scSize >= 0) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 1 })
    } else if (scSize <= 5 && scSize >= 3) {
        await scCopy.document.update({ "height": 2, "width": 2, "scale": 1 })
    } else if (scSize <= 8 && scSize >= 6) {
        await scCopy.document.update({ "height": 4, "width": 4, "scale": 1 })
    } else if (scSize <= 11 && scSize >= 9) {
        await scCopy.document.update({ "height": 8, "width": 8, "scale": 1 })
    } else if (scSize > 11) {
        await scCopy.document.update({ "height": 16, "width": 16, "scale": 1 })
    } else if (scSize === -1) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.85 })
    } else if (scSize === -2) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.75 })
    } else if (scSize === -3) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.6 })
    } else if (scSize <= -4) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.5 })
    }
}

async function get_creatures() {
    console.log("DASDSD");
    const compendium = await game.packs.find(p => p.metadata.label == getShapeChangeCompendium());
    console.log(compendium);
    console.log("DASDSD");
    console.log(getShapeChangeCompendium());

    if (!compendium) {
        ui.notifications.warn("The compendium couldn't be found!");
        debug("The compendium couldn't be found.");
        return;
    } else {
        let allItems = await compendium.getDocuments();
        let npcs = await allItems.filter(p => (p.type == 'npc'));
        let creatures = [];

        for (let i = 0; i < npcs.length; i++) {
            creatures.unshift(npcs[i]);
        }
        return creatures;
    }
}
