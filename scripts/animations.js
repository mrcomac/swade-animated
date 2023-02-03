import { 
    getHashName
} from './new_constants.js';

//templates play ranged using template as base (for cone)
// //let template = canvas.templates?.placeables?.[0]?.document;
// for circle templates the power plays a ranged animation and on the template after that using playOnArea

// 
export async function playOnToken(token, animation, sound,animationName) {
    console.log("playOnToken");
    console.log(token);
    console.log(animation);
    if(animation.persist) {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
        .effect()
            .name(String(getHashName(animationName)))
            .attachTo(token)
            .file(animation.file)
            .size(animation.size,  { gridUnits: true })
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
        .play();

    } else {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
        .effect()
            .name(String(getHashName(animationName)))
            .attachTo(token)
            .file(animation.file)
            .size(animation.size,  { gridUnits: true })
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .waitUntilFinished()
        .play();
    }
    
}

export async function playOnArea(target, animation, sound,animationName) {
    console.log("playOnArea");
    console.log(animation);
    if(animation.persist) {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
        .effect()
        .name(String(getHashName(animationName)))
            .atLocation(target)
            .file(animation.file)
            .size(animation.size,  { gridUnits: true })
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
        .play();
    } else {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
        .effect()
        .name(String(getHashName(animationName)))
            .atLocation(target)
            .file(animation.file)
            .size(animation.size,  { gridUnits: true })
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .waitUntilFinished()
        .play();
    }
    
}

export async function playRangedOrMeele(source,target,animation,sound,missed = false,animationName) {
    console.log("playRangedOrMeele");
    console.log(animation);
    if(animation.persist) {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
        .effect()
            .name(String(getHashName(animationName)))
            .atLocation(source)
            .stretchTo(target)
            .file(animation.file)
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .missed(missed)
        .play();
    } else {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
        .effect()
            .name(String(getHashName(animationName)))
            .atLocation(source)
            .stretchTo(target)
            .file(animation.file)
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .waitUntilFinished()
            .missed(missed)
        .play();
    }
    
}