export const MODULE = {
    SWADE: 1,
    BR2:   2
};

export const ANIMATIONTYPE = {
    NONE: 0,
    MELEE:  1,
    RANGED: 2,
    TARGET: 3,
    TEMPLATE: 4,
    ITEMBASED: 5, //the type if template, ranged or melee will be decided by the item behaviour
    STREAM: 7,
    SPECIAL: 10
};

export const ROLLRESULT = {
    MISSED: "missed",
    HIT:    "hit",
    RAISE:  "raise"
};

export const moduleName = "swade-animated";
const MODS = 'modules/';

export let SHAPECHANGECOMPENDIUM = "";

export function getShapeChangeCompendium() {
    SHAPECHANGECOMPENDIUM = game.settings.get(moduleName, "shape_change_folder");
    if(SHAPECHANGECOMPENDIUM.length == 0) {
        SHAPECHANGECOMPENDIUM = "SWADE Bestiary";
    }
    return SHAPECHANGECOMPENDIUM;
}


export function setShapeChangeCompendium(value) {
    debug("Changing compendium folder for Shape Change: "+value);
    SHAPECHANGECOMPENDIUM = value;
}

export const PATH = {
    AUDIO : MODS + moduleName + '/sounds/',
    VIDEO : MODS + moduleName + '/videos/',
    TEMPLATE: MODS + moduleName + '/templates/',
};

export const NOSOUND = { file: PATH.AUDIO + "Empty_Audio.ogg", delay: 0, volume: 0.0, duration: 0 };

let ntemplates = 0;

export function setNTemplate(value) {
    ntemplates = value;
}

export function getNTemplate() {
    return ntemplates;
}

export const SETTING_PREFIX = 'SAT.Settings.';

export function getHashName(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function CopyObj(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = CopyObj(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = CopyObj(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export const TMFXEffectsList = ["Deflection"];

let DEBUG = false;
export function setDebug(value) {
    console.log("Setting debug");
    DEBUG = value;
}
export function debug(msg, ...args) {
    DEBUG = game.settings.get(moduleName, "debug_mode");
  if (DEBUG) {
    console.log("[SWADE-Animated]",msg, ...args);
  }
}

export const effectsList = [
    {
      "label": "Arcane Protection (Normal)",
      "name": "Arcane Protection (Normal)",
      "icon": "modules/swade-animated/icons/protection/BTN_ArcaneProtection.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": "yYqIIQYdbw8kHtxA",
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "mHAgxe3y0wJlH0vu",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Protection (Normal)",
      "name": "Protection (Normal)",
      "icon": "modules/swade-animated/icons/protection/BTNProtection.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": "R1OFLdBGePElJAOA",
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [
        {
          "key": "system.stats.toughness.armor",
          "mode": 2,
          "value": "2",
          "priority": null
        }
      ],
      "transfer": true,
      "_id": "pm44fuCLiEgopfDw",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Protection (Raise)",
      "name": "Protection (Raise)",
      "icon": "modules/swade-animated/icons/protection/BTNProtection.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": "R1OFLdBGePElJAOA",
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [
        {
          "key": "system.stats.toughness.value",
          "mode": 2,
          "value": "2",
          "priority": null
        }
      ],
      "transfer": true,
      "_id": "andlx4HWjWyX46Yg",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Deflection",
      "name": "Deflection",
      "icon": "modules/swade-animated/icons/deflection/BTNProtection.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": "nBBI0vjX1f3Ogz8A",
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "71p9ELCA9Jsvncdc",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Fly (Normal)",
      "name": "Fly (Normal)",
      "icon": "modules/swade-animated/icons/fly/BTNWing.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [
        {
          "key": "system.stats.speed.value",
          "mode": 5,
          "value": "12",
          "priority": null
        }
      ],
      "transfer": true,
      "_id": "lmt9f6nZ3SbBwjSk",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Fly (Raise)",
      "name": "Fly (Raise)",
      "icon": "modules/swade-animated/icons/fly/BTNWing.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [
        {
          "key": "system.stats.speed.value",
          "mode": 5,
          "value": "24",
          "priority": null
        }
      ],
      "transfer": true,
      "_id": "XIlAyEgyhVsz1uGo",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Arcane Protection (Raise)",
      "name": "Arcane Protection (Raise)",
      "icon": "modules/swade-animated/icons/protection/BTN_ArcaneProtection.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "qFKr3xri4s3cdmHR",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Blind (Normal)",
      "name": "Blind (Normal)",
      "icon": "modules/swade-animated/icons/blind/BTNPBlindEye.png",
      "duration": {
        "rounds": 1,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": null,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "kZm6LWkyPpRrM4ig",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Blind (Raise)",
      "name": "Blind (Raise)",
      "transfer": true,
      "_id": "fUxMKOUHYsnqEY6C",
      "changes": [],
      "disabled": false,
      "duration": {
        "startTime": null,
        "seconds": null,
        "combat": null,
        "rounds": 1,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "icon": "modules/swade-animated/icons/blind/BTNPBlindEye.png",
      "origin": null,
      "tint": null,
      "flags": {
        "swade": {
          "expiration": null,
          "loseTurnOnHold": false
        }
      }
    },
    {
      "label": "Burrow",
      "name": "Burrow",
      "icon": "modules/swade-animated/icons/burrow/burrow.jpg",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "VFdcejmcyrR2Q950",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Sloth/Speed (Normal)",
      "name": "Sloth/Speed (Normal)",
      "transfer": true,
      "_id": "C8dhvdTMdwMk8cn7",
      "changes": [],
      "disabled": false,
      "duration": {
        "startTime": null,
        "seconds": null,
        "combat": null,
        "rounds": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "icon": "modules/swade-animated/icons/speed/BTNSpeed%20buff.png",
      "origin": null,
      "tint": null,
      "flags": {
        "swade": {
          "expiration": null,
          "loseTurnOnHold": false
        }
      }
    },
    {
      "label": "Sloth/Speed (Raise)",
      "name": "Sloth/Speed (Raise)",
      "transfer": true,
      "_id": "JtAGgERoWWJwF9bB",
      "changes": [],
      "disabled": false,
      "duration": {
        "startTime": 4644,
        "seconds": null,
        "combat": null,
        "rounds": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "icon": "modules/swade-animated/icons/speed/BTNSpeed%20buff.png",
      "origin": null,
      "tint": null,
      "flags": {
        "swade": {
          "expiration": null,
          "loseTurnOnHold": false
        }
      }
    },
    {
      "label": "Silence (Normal)",
      "name": "Silence (Normal)",
      "icon": "modules/swade-animated/icons/silence/BTNINV_Misc_Ear_Human_01.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [
        {
          "key": "@Skill{Notice}[system.die.modifier]",
          "mode": 2,
          "value": "-4",
          "priority": null
        }
      ],
      "transfer": true,
      "_id": "Ao6gfeFa2NK4Qv2d",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Silence (Raise)",
      "name": "Silence (Raise)",
      "icon": "modules/swade-animated/icons/silence/BTNGluttony.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": null,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "QdUYtqlK7yXP4gtp",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Shape Change (Normal)",
      "name": "Shape Change (Normal)",
      "icon": "modules/swade-animated/icons/shape-change/BTNVortexOfUnreal.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "Dm71u2ThmWHITTgJ",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "label": "Shape Change (Raise)",
      "name": "Shape Change (Raise)",
      "icon": "modules/swade-animated/icons/shape-change/BTNVortexOfUnreal.png",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "_id": "pVC1Y40bQJHV0ALe",
      "disabled": false,
      "origin": null,
      "tint": null
    },
    {
      "icon": "systems/swade/assets/icons/active-effect.svg",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "name": "Proton Stream (Normal)",
      "label": "Proton Stream (Normal)",
      "_id": "oboWqlJrCfZLVnd1",
      "disabled": false,
      "description": "",
      "origin": null,
      "statuses": [],
      "tint": null
    },
    {
      "icon": "systems/swade/assets/icons/active-effect.svg",
      "duration": {
        "rounds": 5,
        "startTime": null,
        "seconds": null,
        "combat": null,
        "turns": null,
        "startRound": null,
        "startTurn": null
      },
      "flags": {
        "swade": {
          "expiration": 2,
          "loseTurnOnHold": false
        }
      },
      "changes": [],
      "transfer": true,
      "name": "Proton Stream (Raise)",
      "label": "Proton Stream (Raise)",
      "_id": "mZrWFfcMxqfIH4JN",
      "disabled": false,
      "description": "",
      "origin": null,
      "statuses": [],
      "tint": null
    }
  ]
  