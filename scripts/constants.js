export const MODULE = {
    SWADE: 1,
    BR2:   2
};

export const ANIMATIONTYPE = {
    MELEE:  1,
    RANGED: 2,
    TARGET: 3,
    TEMPLATE: 4
};

export const ROLLRESULT = {
    MISSED: "missed",
    HIT:    "hit",
    RAISE:  "raise"
};

export const moduleName = "swade-animated";
const MODS = 'modules/';

export const PATH = {
    AUDIO : MODS + moduleName + '/sounds/',
    VIDEO : MODS + moduleName + '/videos/',
    TEMPLATE: MODS + moduleName + '/templates/',
};

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