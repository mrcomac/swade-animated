import { 
    getHashName,
    debug,
    ROLLRESULT
} from './constants.js';

export async function playOnToken(token, animation, sound,animationName, notWait=false) {
    debug("playOnToken: ",animation,sound);
    if(animation.persist || notWait) {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
            .duration(sound.duration)
        .effect()
            .name(String(getHashName(animationName)))
            .attachTo(token)
            .startTime(animation.startTime)
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
            .duration(sound.duration)
        .effect()
            .name(String(getHashName(animationName)))
            .startTime(animation.startTime)
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
    debug("playOnArea: ",animation,sound);
    if(animation.persist) {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
            .duration(sound.duration)
        .effect()
        .name(String(getHashName(animationName)))
            .atLocation(target)
            .startTime(animation.startTime)
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
            .duration(sound.duration)
        .effect()
        .name(String(getHashName(animationName)))
            .startTime(animation.startTime)
            .atLocation(target)
            .file(animation.file)
            .size(animation.size,  { gridUnits: true })
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .waitUntilFinished()
        .play();
    }
    
}

export async function playRangedOrMeele(source,target,animation,sound,_missed = ROLLRESULT.MISSED,animationName,byUnit) {
    console.log("playRangedOrMeele",animation,sound);
    console.log("ANIMATION HASH", animationName);
    console.log("ANIMATION HASH", getHashName(animationName));
    let repeat = { times: 1, randomInit: 0, randomEnd: 0 };
    let stretchToConfig = {}
    if(animation?.repeat) {
        repeat = animation?.repeat
    }

    if(animation?.stretchTo) {
        stretchToConfig = animation.stretchTo;
    }

    let missed = true;
    if(_missed != ROLLRESULT.MISSED) {
        debug("Attack Missed");
        missed = false;
    }
    debug(sound);
    if(animation.persist) {
        let persist = true
        if(missed) persist = false
        
        if(animation?.persistBehaviour?.type === "rangedAfter") {
            return await new Sequence()
            .sound()
                .file(sound.file)
                .delay(sound.delay)
                .volume(sound.volume)
                .duration(sound.duration)
                .fadeOutAudio(500)
            .effect()
                .startTime(animation.startTime)
                .atLocation(source)
                .stretchTo(target, stretchToConfig)
                .file(animation.file)
                .filter(animation.filter, animation.filterData)
                .waitUntilFinished(animation.persistBehaviour.waitUntilFinished)
                .size(animation.size,  { gridUnits: true })
                .missed(missed)
            .effect()
                .name(String(getHashName(animationName)))
                .file(animation.file)
                .atLocation(source)
                .stretchTo(target, stretchToConfig)
                .persist(persist)
                .timeRange(animation.persistBehaviour.startTime,animation.persistBehaviour.endTime)
            .play();
        } else {
            return await new Sequence()
            .sound()
                .file(sound.file)
                .delay(sound.delay)
                .volume(sound.volume)
                .duration(sound.duration)
                .fadeOutAudio(500)
            .effect()
                .name(String(getHashName(animationName)))
                .startTime(animation.startTime)
                .atLocation(source)
                .stretchTo(target, stretchToConfig)
                .file(animation.file)
                .filter(animation.filter, animation.filterData)
                .persist(persist)
                .size(animation.size,  { gridUnits: true })
                .missed(missed)
            .play();
        }
    } else {
        return await new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
            .duration(sound.duration)
            .fadeOutAudio(500)
        .effect()
            .name(String(getHashName(animationName)))
            .atLocation(source)
            .startTime(animation.startTime)
            .stretchTo(target,stretchToConfig)
            .file(animation.file)
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .size(animation.size,  { gridUnits: true })
            .repeats(repeat["times"], repeat["randomInit"], repeat["randomEnd"])
            .waitUntilFinished()
            .missed(missed)
        .play();
    }
}
export async function burrowOff(token) {
    new Sequence()
        .effect()
            .file("jb2a.impact.ground_crack.orange.01")
            .size(1,  { gridUnits: true })
            .atLocation(token)
            .belowTokens()
            .size(2,  { gridUnits: true })
            .waitUntilFinished(-4000)
        .animation()
            .on(token)
            .opacity(1)
        .play();    
}
export async function burrowOn(token,animation,sound,animationName) {
    new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
            .duration(sound.duration)
            .fadeOutAudio(500)
        .effect()
            .file(animation.file)
            .filter(animation.filter, animation.filterData)
            .size(animation.size,  { gridUnits: true })
            .startTime(animation.startTime)
            .atLocation(token)
        .animation()
            .on(token)
            .opacity(0)
        .effect()
            .name(String(getHashName(animationName)))
            .from(token, { offset: { y: 0 } })
            .atLocation(token)
            .scaleToObject(0.9)
            .duration(1000)
            .opacity(0.5)
            .belowTokens()
            .filter("ColorMatrix", { brightness: -1 })
            .filter("Blur", { blurX: 5, blurY: 10 })
            .attachTo(token, {bindAlpha: false})
            .zIndex(1)
            .persist()
    .play();
}

export async function stopFly(token) {
    //await Sequencer.EffectManager.endEffects({ name: "Fly", object: token });
    new Sequence()
        .animation()
            .on(token)
            .opacity(1)
        .play();
}

export function  fly(token,animation,sound,animationName,notWait) {
    debug("fly: ",token,animation,sound,animationName);
    new Sequence()
        .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
            .duration(sound.duration)
            .fadeOutAudio(500)
        .effect()
            .file(animation.file)
            .size(animation.size,  { gridUnits: true })
            .atLocation(token)
            //.scaleToObject(1.75)
            .belowTokens()
            //.waitUntilFinished()
        .animation()
            .on(token)
            .opacity(0)

        .effect()
            .from(token)
            .name( String(getHashName(animationName)) )
            .atLocation(token)   
            .opacity(1)
            .duration(800)
            .anchor({ x: 0.55, y: 0.9 })
            .animateProperty("sprite", "position.y", { from: 50, to: 0, duration: 500})
            .loopProperty("sprite", "position.y", {  from:0 ,to:-50, duration: 2500, pingPong: true, delay:500})
            .attachTo(token, {bindAlpha: false})
            .zIndex(2)
            .persist()
        .effect()
            .from(token, { offset: { y: 0 } })
            .name(String(getHashName(animationName)))
            .atLocation(token)
            .scaleToObject(0.9)
            .duration(1000)
            .opacity(0.5)
            .belowTokens()
            .filter("ColorMatrix", { brightness: -1 })
            .filter("Blur", { blurX: 5, blurY: 10 })
            .attachTo(token, {bindAlpha: false})
            .zIndex(1)
            .persist()
    .play();
}

export function  playOnTemplate(animation,sound, _missed, animationName="nonPersistent") {
    debug("playOnTemplate",animationName,animation,sound)

    let template = canvas.templates?.placeables?.[canvas.templates.placeables.length - 1]?.document;
    let missed = true;
    if(_missed == ROLLRESULT.HIT || _missed == ROLLRESULT.RAISE) {
        missed = false;
    }
    let trueSize;
    let scaleX;
    let scaleY;

    if(template.t == 'cone' || template.t == 'ray') {
        const trueHeight = template.t === 'cone' ? template.distance : template.width * 2;
        const scaleX = template.t === 'cone' ? 1 : 1;
        const scaleY = template.t === 'cone' ? 0.5 : 1;
        if(animation.persist) {
            new Sequence()
            .sound()
                .file(sound.file)
                .delay(sound.delay)
                .volume(sound.volume)
                .duration(sound.duration)
                .fadeOutAudio(500)
            .effect()
                .name(String(getHashName(animationName)))
                .startTime(animation.startTime)
                .atLocation(template, { cacheLocation: true })
                .rotateTowards(template, {cacheLocation: true})
                .file(animation.file)
                .missed(missed)
                .mask(template)
                .persist()
                .waitUntilFinished()
                .size({
                        width: (canvas.grid.size * (template.distance / canvas.dimensions.distance)) * scaleX,
                        height:(canvas.grid.size * (trueHeight / canvas.dimensions.distance)) * scaleY,
                })
        .play()
        } else {
            new Sequence()
            .sound()
                .file(sound.file)
                .delay(sound.delay)
                .volume(sound.volume)
                .duration(sound.duration)
                .fadeOutAudio(500)
            .effect()
                .name(String(getHashName(animationName)))
                .startTime(animation.startTime)
                .atLocation(template, { cacheLocation: true })
                .rotateTowards(template, {cacheLocation: true})
                .file(animation.file)
                .missed(missed)
                .mask(template)
                .waitUntilFinished()
                .size({
                        width: (canvas.grid.size * (template.distance / canvas.dimensions.distance)) * scaleX,
                        height:(canvas.grid.size * (trueHeight / canvas.dimensions.distance)) * scaleY,
                })
        .play()
        //canvas.scene.deleteEmbeddedDocuments('MeasuredTemplate',[template.id]);
        }
        
    } else if (template.t === 'circle' || template.t === 'rect') {           
        trueSize = template.t === 'circle' ? template.distance * 2 : Math.sqrt(Math.pow(template.distance, 2)/2);
        if(animation.persist) {
            new Sequence()
            .sound()
                .file(sound.file)
                .delay(sound.delay)
                .volume(sound.volume)
                .duration(sound.duration)
                .fadeOutAudio(500)
            .effect()
                .name(String(getHashName(animationName)))
                .startTime(animation.startTime)
                .attachTo(template, { followRotation: true })
                //.atLocation(template, { cacheLocation: true })
                .persist()
                .file(animation.file)
                .mask(template)
                .size({
                    width: canvas.grid.size * (trueSize / canvas.dimensions.distance) * 1,
                    height: canvas.grid.size * (trueSize / canvas.dimensions.distance) * 1,
                })
        .play()
        } else {
            new Sequence()
            .sound()
                .file(sound.file)
                .delay(sound.delay)
                .volume(sound.volume)
                .duration(sound.duration)
                .fadeOutAudio(500)
            .effect()
                .name(String(getHashName(animationName)))
                .startTime(animation.startTime)
                .attachTo(template, { followRotation: true })
                //.atLocation(template, { cacheLocation: true })
                .file(animation.file)
                .mask(template)
                .size({
                    width: canvas.grid.size * (trueSize / canvas.dimensions.distance) * 1,
                    height: canvas.grid.size * (trueSize / canvas.dimensions.distance) * 1,
                })
        .play()
        }
        
        
    }
    
}

