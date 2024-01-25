
import {
    MODULE,
    ANIMATIONTYPE,
    ROLLRESULT,
    CopyObj,
    debug
} from "./constants.js"

export const TheRoll = {
    targets: [],
    type: "",
    rawValue: 0
};



export function getRollResult(_roll, targets, origin) {
    let _theroll = CopyObj(TheRoll);

    if(origin == MODULE.BR2) {
        _theroll = getBR2RollResult(_roll);
    } else {
        _theroll = getSWADERollResult(_roll);
    }
    debug("getRollResult",_theroll)
    _theroll = isItHits(targets,_theroll);
    return _theroll;
}

function isItHits(targets, roll) {
    if(roll.type == ANIMATIONTYPE.RANGED) {
        let _result = ROLLRESULT.MISSED;
        if(roll.rawValue >= 8) {
            _result = ROLLRESULT.RAISE;
        } else if(roll.rawValue >= 4) {
            _result = ROLLRESULT.HIT;
        }
        for(let i = 0; i < targets.length; i++) {
            roll.targets.push({ token: targets[i], result: _result })
        }
    } else if(roll.type == ANIMATIONTYPE.MELEE) {
        let _result = ROLLRESULT.MISSED;

        for(let i = 0; i < targets.length; i++) {
            if(roll.rawValue >= (targets[i].document.actor.system.stats.parry.value+targets[i].document.actor.system.stats.parry.modifier)) {
                if((roll.rawValue-(targets[i].document.actor.system.stats.parry.value+targets[i].document.actor.system.stats.parry.modifier)) >= 4) {
                    roll.targets.push({ token: targets[i], result: ROLLRESULT.RAISE })    
                } else {
                    roll.targets.push({ token: targets[i], result: ROLLRESULT.HIT })
                }
            } else {
                roll.targets.push({ token: targets[i], result: ROLLRESULT.MISSED })
            }  
        }
    }
    debug("isItHits",roll);
    return roll;
}

function getBR2RollResult(_roll) {
    let _theroll = CopyObj(TheRoll);
    debug(_roll.flags['betterrolls-swade2']?.render_data.skill_title);

    
    let modifier = 0;
    let rangedAttack = ["shooting", "atlhetics" ];
    if(_roll.flags['betterrolls-swade2']?.render_data.skill_title.toLowerCase().includes("fighting")) {
        _theroll.type = ANIMATIONTYPE.MELEE;
    } else if(rangedAttack.includes(_roll.flags['betterrolls-swade2']?.render_data.skill_title.toLowerCase().replace(/d[0-9]{1,2}/g, "").trim())) {
        _theroll.type = ANIMATIONTYPE.RANGED;
    } else {
        _theroll.type = ANIMATIONTYPE.RANGED;
    }
    if(_roll.flags['betterrolls-swade2']?.render_data.damage_rolls.length > 0) {
        debug("ERROR","BETTER ROLLS no Data");
        return _theroll;
    } else {
        let rolls = _roll.flags['betterrolls-swade2'].render_data.trait_roll.dice;
        if(rolls.length > 0) {
            let r1 = 0;
            let r2 = 0;
            for(let b = 0; b<rolls[0].results.length; b++) {
                r1 += rolls[0].results[b];
            }
            if(rolls.length > 1 ){
                for(let b = 0; b<rolls[1].results.length; b++) {
                    r2 += rolls[1].results[b];
                }
            }
            if(r1 > r2) {
                _theroll.rawValue = r1;
            } else {
                _theroll.rawValue = r2;
            }
        } 

        let modifiers = _roll.flags['betterrolls-swade2']?.render_data.trait_roll.modifiers;
        
        for(let i=0;i<modifiers.length;i++) {
            modifier += modifiers[i].value;
        }
    }
    _theroll.rawValue += modifier;
    debug("getBR2RollResult", _theroll);
    return _theroll;

}

function getMeleeResult(results) {
    let result_number = 0;
    for(let i = 0; i < results.length; i++) {
        if(results[i].active == true) {
            result_number = results[i];
        }
    }
    return result_number;
}

function getSWADERollResult(_roll) {
    let roll = CopyObj(TheRoll);
    roll.rawValue = _roll._total;
    if(_roll.terms[0].options.flavor == "Fighting") {
        roll.type = ANIMATIONTYPE.MELEE;
    } else {
        roll.type = ANIMATIONTYPE.RANGED;
    }
    debug("getSWADERollResult",roll);
    return roll;
}

