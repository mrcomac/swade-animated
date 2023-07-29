import { 
    getHashName,
    debug,
    ROLLRESULT
} from './constants.js';

//Select Wing Speed: Default = 0, Max = 2499
let wingSpeed = 0;
let wingHeight = 0;
//Define Wing Image
let wingDefinition = [];

export async function playOnToken(token, animation, sound,animationName, notWait=false) {
    animationName = animationName +","+animation.label+","+token.id;
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
    animationName = animationName +","+animation.label+","+target.id;
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

export async function playStream(target, source, animation, sound, animationName) {
    debug("PLAY STREAM")
    animationName = animationName +","+animation.label+","+target.id;
    if(animation?.timeRange) {
        return  await new Sequence()
            .sound()
            .file(sound.file)
            .volume(sound.volume)
            .effect()       
        .file(animation.file)
            .atLocation(source)
            .stretchTo(target)
            .waitUntilFinished(animation.waitUntilFinished)
        .effect()
            .name(String(getHashName(animationName)))
            .file(animation.file)
            .atLocation(source)
            .stretchTo(target,  animation.stretchTo)
            .persist(true)
            .timeRange(animation.timeRange.start, animation.timeRange.end)
            .play();
    }

}

export async function playRangedOrMeele(source,target,animation,sound,_missed = ROLLRESULT.MISSED,animationName,byUnit) {
    animationName = animationName +","+animation.label+","+target.id;
    debug("playRangedOrMeele",animation,sound);
    let repeat = { times: 1, randomInit: 0, randomEnd: 0 };
    let stretchToConfig = {}
    let attachTo = false;
    if(animation?.repeat) {
        repeat = animation?.repeat
    }

    if(animation?.attachTo) {
        attachTo = true;
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
        return await new Sequence()
            .sound()
            .file(sound.file)
            .delay(sound.delay)
            .volume(sound.volume)
            .duration(sound.duration)
            .fadeOutAudio(500)
            .effect()
            .name(String(getHashName(animationName)))
            .timeRange(animation.startTime, animation.endTime)
            .atLocation(source)
            .stretchTo(target, stretchToConfig)
            .file(animation.file)
            .filter(animation.filter, animation.filterData)
            .persist(animation.persist)
            .size(animation.size, { gridUnits: true })
            .missed(missed)
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

//Fly Animation
//Author: EskieMoh#2969
//Tweaked by: BashfulBob#8687
//Select Wing Type: Celestial, Infernal, Avian, Dragon

export async function stopFly(token) {
    endFlying(token)
}


let wingType = "";

export function fly(token,animation,sound,animationName,notWait) {
    animationName = animationName +","+animation.label+","+token.id;
    wingHeight = 0.9-(token.document.width*0.05);
    debug("fly: ",token,animation,sound,animationName);
    assignWingType(animation.label)
    var wingSequence = new Sequence();
	wingDefinition.forEach(wingType => { AddWing(wingSequence, wingType[0], wingType[1], wingType[2], wingType[3], wingType[4], token,animationName); });  // img, wingId, side
	AddFloating(wingSequence, token, animation, sound, animationName);
	wingSequence.play();
}
function assignWingType(wingType) {
    wingDefinition = [];
    
	switch(wingType) {
		
		case "Celestial":
			wingSpeed = 0;
			wingDefinition.push([`2biyKFk.png`,1,'left',-10,1]);
			wingDefinition.push([`2biyKFk.png`,1,'right',-10,1]);
			wingDefinition.push([`uN33sO6.png`,2,'left',-10,1]);
			wingDefinition.push([`uN33sO6.png`,2,'right',-10,1]);
			break;
		case "Infernal":
			wingSpeed = 250;
			wingDefinition.push([`rO2JCPz.png`,1,'left',-10,1]);
			wingDefinition.push([`rO2JCPz.png`,1,'right',-10,1]);
			wingDefinition.push([`cBF4IIR.png`,2,'left',-10,1]);
			wingDefinition.push([`cBF4IIR.png`,2,'right',-10,1]);
			break;
		case "Avian":
			wingSpeed = 0;
			wingDefinition.push([`sR4Ur8h.png`,1,'left',-10,1]);
			wingDefinition.push([`sR4Ur8h.png`,1,'right',-10,1]);
			wingDefinition.push([`9iqdmjZ.png`,2,'left',-10,1]);
			wingDefinition.push([`9iqdmjZ.png`,2,'right',-10,1]);
			break;
		case "Red Dragon":
			wingSpeed = 0;
			wingDefinition.push([`xAmFxhW.png`,1,'left',-10, 1.5]);
			wingDefinition.push([`xAmFxhW.png`,1,'right',-10, 1.5]);
			wingDefinition.push([`3PCV7YP.png`,2,'left',-10, 1.5]);
			wingDefinition.push([`3PCV7YP.png`,2,'right',-10, 1.5]);
			break;
		case "Blue Dragon":
			wingSpeed = 1000;
			wingDefinition.push([`A5DAUp3.png`,1,'left',-10, 1.5]);
			wingDefinition.push([`A5DAUp3.png`,1,'right',-10, 1.5]);
			wingDefinition.push([`atlIrtl.png`,2,'left',-10, 1.5]);
			wingDefinition.push([`atlIrtl.png`,2,'right',-10, 1.5]);
			break;
		case "Green Dragon":
			wingSpeed = 0;
			wingDefinition.push([`q82GHFf.png`,1,'left',-10, 1.5]);
			wingDefinition.push([`q82GHFf.png`,1,'right',-10, 1.5]);
			wingDefinition.push([`g2GK7NW.png`,2,'left',-10, 1.5]);
			wingDefinition.push([`g2GK7NW.png`,2,'right',-10, 1.5]);
			break;
		case "White Dragon":
			wingSpeed = 0;
			wingDefinition.push([`Sac1174.png`,1,'left',-10, 1.5]);
			wingDefinition.push([`Sac1174.png`,1,'right',-10, 1.5]);
			wingDefinition.push([`hfzupc7.png`,2,'left',-10, 1.5]);
			wingDefinition.push([`hfzupc7.png`,2,'right',-10, 1.5]);
			break;
		case "Black Dragon":
			wingSpeed = 0;
			wingDefinition.push([`VotClWQ.png`,1,'left',-10, 1.5]);
			wingDefinition.push([`VotClWQ.png`,1,'right',-10, 1.5]);
			wingDefinition.push([`fgzxRd0.png`,2,'left',-10, 1.5]);
			wingDefinition.push([`fgzxRd0.png`,2,'right',-10, 1.5]);
			break;

		default:	// No Wings
		        	break;
	}
}

function AddFloating(Sequence, token, animation, sound, animationName) {
    
	Sequence
		.effect()
		.file(animation.file)
		.atLocation(token)
		.scaleToObject(1.75)
		.belowTokens()

		.animation()
		.on(token)
		.opacity(0)
		.rotate(0);	
	
	// Shadow
	Sequence
		.effect()
		.from(token)
		.name(String(getHashName(animationName)))
		.atLocation(token)
		.scaleToObject(token.document.texture.scaleX-0.1)
		.duration(1000)
		.opacity(0.5)
		.belowTokens()
		.filter("ColorMatrix", { brightness: -1 })
		.filter("Blur", { blurX: 5, blurY: 10 })
		.attachTo(token, {bindAlpha: false})
		.zIndex(1)
		.persist()
		.private()	
	
	// Float
	Sequence
		.effect()
		.from(token)
		.name(String(getHashName(animationName)))
		.atLocation(token)   
		.opacity(1)
		.duration(800)
		.anchor({ x: 0.55, y: 0.9 })
		.loopProperty("sprite", "position.y", {  from:0 ,to:-0.25, duration: 2500-wingSpeed, pingPong: true, delay:500-wingSpeed, ease: "easeInOutCubic", gridUnits:true})
		.attachTo(token, {bindAlpha: false, followRotation: false})
		.zIndex(10)
		.persist()
		.waitUntilFinished()
		//.thenDo(endFlying);
}

async function endFlying(token) {
	new Sequence()
	
		.animation()
		.on(token)
		.opacity(1)
		
		.effect()
		.file("jb2a.extras.tmfx.border.circle.outpulse.01.fast")
		.atLocation(token)
		.scaleToObject(2)
		.opacity(0.15)


		.play();	
}

function AddWing(Sequence, fileWingImg, wingId, sideId, rotationVal, wingSize, token,animationName) {
	// wingId = 1 -> Inner wing pivot, ie shoulder
	// wingId = 2 -> Outer wing pivot, ie pinfeathers
	// wingId = 3 -> Lower wing pivot, ie tail
	// sideId = 'left', 'right'
	
	let wingImg = 'modules/swade-animated/images/fly/' + fileWingImg;
	let anchorScaleX = (sideId == 'left') ? token.document.texture.scaleX-0.15 : -token.document.texture.scaleX+1.25;
	let tokenAlignment = (sideId == 'left') ? "top-left" : "top-right";
	let mirrorVal = (sideId == 'left') ? 1 : -1;

	let durationVal = (wingId==2) ? 10 : 10000;
	let rotationAdj  = (wingId==2) ? 3 : 1;
	//		from: (42 + rotationAdj)*mirrorVal, 
	//		to: ((-15 * rotationAdj)*mirrorVal), 

	let rotateFrom = rotationVal*rotationAdj*-1*mirrorVal;
	let rotateTo = rotationVal*rotationAdj*mirrorVal;
	let wingHeightAdj = (wingId==3) ? -1*wingHeight : wingHeight;
	let size = wingSize*(token.document.texture.scaleX*0.8)
	
	var SeqEffect = Sequence
		.effect()
		.name(String(getHashName(animationName)))
		.file(wingImg)
		.persist()
		.atLocation(token)
		.scaleToObject(size)
		.duration(durationVal)
		.anchor({ x: anchorScaleX, y: wingHeightAdj-((wingSize-1)/2)})
		.rotate(rotationVal*mirrorVal)
		.attachTo(token, {align: tokenAlignment, bindAlpha: false, bindVisibility: false, followRotation: false});

	if(sideId == 'right') {		SeqEffect.mirrorX();	}
	
	if(wingId==2) {
		SeqEffect
			.loopProperty("sprite", "position.x", { 
				from: -0.0, 
				to: 0.17*(token.w / canvas.grid.size)*mirrorVal, 
				duration: 2500-wingSpeed, 
				ease: "easeInOutCubic", 
				pingPong: true, 
				gridUnits:true})
	}

	SeqEffect
		//Flying Movement
		.loopProperty("sprite", "position.y", {  
			from:0 ,
			to:-0.25, 
			duration: 2500-wingSpeed, 
			pingPong: true, 
			delay:500-wingSpeed, 
			gridUnits: true})
		//Wing Flap
		.loopProperty("sprite", "rotation", { 
			from: (42 + rotationAdj)*mirrorVal, 
			to: ((-15 * rotationAdj)*mirrorVal), 
			duration: 2500-wingSpeed, 
			ease: "easeInOutCubic", 
			pingPong: true})
		.loopProperty("sprite", "position.y", { 
			from: 0, 
			to: 0.25, 
			duration: 2500-wingSpeed, 
			ease: "easeInOutCubic", 
			pingPong: true, 
			gridUnits:true})
		.zIndex(8+rotationAdj)
		.private();
}

export function  playOnTemplate(animation,sound, _missed, animationName="nonPersistent", token) {
    animationName = animationName +","+animation.label+","+token.id;
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

