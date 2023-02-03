
import {
    MODULE,
    ANIMATIONTYPE,
    ROLLRESULT
} from "./constants.js"

export const RollResult = [{
    result: "",
    token: {}
}];

const Roll = {
    type: 0,
    result: 0
}

export function getRollResult(_roll, targets, origin) {
    let roll = Object.assign({},Roll);
    var rollResult = Object.assign({},RollResult);
    if(origin == MODULE.BR2) {
        roll = getBR2RollResult(_roll,targets);
    } else {
        roll = getSWADERollResult(_roll);
    }
    rollResult = isItHits(targets,roll);
    return rollResult;
}

function isItHits(targets, roll) {
    let rollResult = []; //Object.assign({},RollResult);
    console.log("isItHits");
    console.log(roll);
    if(roll.type == ANIMATIONTYPE.RANGED) {
        console.log("RANGED");
        let _result = ROLLRESULT.MISSED;
        if(roll.result >= 8) {
            _result = ROLLRESULT.RAISE;
        } else if(roll.result >= 4) {
            _result = ROLLRESULT.HIT;
        }
        for(let i = 0; i < targets.length; i++) {
            rollResult.push({ result: _result, token: targets[i] });
        }
        if(targets.length == 0) {
            rollResult.push({ result: _result, token: {} });
        }
    } else {
        let _result = ROLLRESULT.MISSED;
        if(roll.result >= 8) {
            _result = ROLLRESULT.RAISE;
        } else if(roll.result >= 4) {
            _result = ROLLRESULT.HIT;
        }
        for(let i = 0; i < targets.length; i++) {
            rollResult.push({ result: _result, token: targets[i] })
        }
        if(targets.length == 0) {
            rollResult.push({ result: _result, token: {} });
        }
    }
    return rollResult;
}

function getBR2RollResult(roll) {

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
    console.log("getSWADERollResult");
    let roll = Object.assign({},Roll);
    roll.result = _roll._total;
    if(_roll.terms[0].terms[0].includes("Fighting")) {
        roll.type = ANIMATIONTYPE.MELEE;
    } else {
        roll.type = ANIMATIONTYPE.RANGED;
    }
    console.log(roll);
    return roll;
    //let resultArray = Object.assign({},rollResultArray);
    /*let result = 0;
    let type = ACTIONTYPE.RANGED;
    if(roll.terms[0].terms[0].includes("Fighting")) {
        resultArray = getMeleeResult(roll.terms[0].results);
    } else {
        result = getRangedResult(roll.terms[0].results);
    }*/
        
/*    console.log(roll.terms[0].results[1].active);

    console.log(roll.terms[0].results[0].active);
    
    console.log();
    console.log(roll._total);*/
}

