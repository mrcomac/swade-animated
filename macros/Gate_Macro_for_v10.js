//Last Updated: 02/18/23
//Author: Carnage Asada#3647

//MAKE SURE YOU HAVE A TOKEN SELECTED BEFORE USING THIS MACRO

let config = {
    size: 4,
    icon: 'icons/magic/symbols/circled-gem-pink.webp',
    label: 'Gate',
    tag: 'Gate',
    drawIcon: true,
    drawOutline: true,
    interval: 0
}

//Set the location of the gate based on where the user selects
let position = await warpgate.crosshairs.show(config);

var saturation = 0;
var hue = 0;

//Build Destination list 
const destinationList = [
	{label:'First World', value:'First World'},
	{label:'Astral Plane', value:'Astral Plane'},
	{label:'Ethereal Plane', value:'Ethereal Plane'},
	{label:'Shadow Plane', value:'Shadow Plane'},
	{label:'Plane of Air', value:'Plane of Air'},
	{label:'Plane of Earth', value:'Plane of Earth'},
	{label:'Plane of Fire', value:'Plane of Fire'},
	{label:'Plane of Water', value:'Plane of Water'},
	{label:'Negative Energy Plane', value:'Negative Energy Plane'},
	{label:'Positive Energy Plane', value:'Positive Energy Plane'},
	{label:'Heaven', value:'Heaven'},
	{label:'Nirvana', value:'Nirvana'},
	{label:'Elysium', value:'Elysium'},
	{label:'Axis', value:'Axis'},
	{label:'Boneyard', value:'Boneyard'},
	{label:'Maelstrom', value:'Maelstrom'},
	{label:'Hell', value:'Hell'},
	{label:'Abaddon', value:'Abaddon'},
	{label:'Abyss', value:'Abyss'}
];

//Open Destination menu
const results = await warpgate.menu({
  inputs: [{
    label: 'Destination: ',
    type: 'select',
	options: destinationList}]},
	{title: 'Select a Destination',
	options: {
		width: '100px',
		height: '100%',    
  }
});
//console.log('Results: ' + results.inputs)
const destination  = results.inputs;
	
//First World
if (destination == "First World"){
portalColor = 'green'
circleColor = 'green'
castColor = 'green'
planeImage = 'https://i.imgur.com/nilqRZB.png'
pulseColor = 'green'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#feb4fb"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#cf8ee6"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1}}]); 
}  

//Astral Plane
else if (destination == "Astral Plane"){
portalColor = 'purple'
circleColor = 'purple'
castColor = 'purple'
planeImage = 'https://i.imgur.com/iqkmZHK.png'
pulseColor = 'purple'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#feb4fb"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#cf8ee6"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1}}]);}

//Ethereal Plane
else if (destination == "Ethereal Plane"){
portalColor = 'green'
circleColor = 'green'
castColor = 'green'
planeImage = 'https://i.imgur.com/xhjyhbf.png'
portalColor = 'green' 
pulseColor = 'green'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#b4fede"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#b1f2d9"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1,"red":0.6941176470588235,"green":0.9490196078431372,"blue":0.8509803921568627}}]);} 

//Shadow Plane
else if (destination == "Shadow Plane"){
portalColor = 'purple'
circleColor = 'purple'
castColor = 'purple'
planeImage = 'https://i.imgur.com/TjMKbrj.png'
pulseColor = 'purple'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#000000"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#b5b5b5"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1}}]);} 
 
//Plane of Air
else if (destination == "Plane of Air"){
portalColor = 'purple'
circleColor = 'purple'
castColor = 'purple'
planeImage = 'https://i.imgur.com/aiXrfBa.png'
pulseColor = 'blue'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#ffffff"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#beebee"},"saturation":1.1,"contrast":1,"brightness":1.2,"gamma":1}}]);} 

//Plane of Earth
else if (destination == "Plane of Earth"){
portalColor = 'green'
circleColor = 'green'
castColor = 'green'
planeImage = 'https://i.imgur.com/sOEc80k.png'
pulseColor = 'green'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#3ac200"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#bce788"},"saturation":1.1,"contrast":1,"brightness":1,"gamma":1}}]);} 

//Plane of Fire
else if (destination == "Plane of Fire"){
portalColor = 'orange'
circleColor = 'yellow'
castColor = 'yellow'
planeImage = 'https://i.imgur.com/uCSWfpK.png'
pulseColor = 'yellow'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#ff9500"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#e3bc68"},"saturation":1.1,"contrast":1,"brightness":1.1,"gamma":1,"red":0.8901960784313725,"green":0.7372549019607844,"blue":0.40784313725490196}}]);} 

//Plane of Water
else if (destination == "Plane of Water"){
portalColor = 'blue'
circleColor = 'blue'
castColor = 'blue'
planeImage = 'https://i.imgur.com/M7ge7ba.png'
pulseColor = 'blue'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#00d5ff"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#687de3"},"saturation":1.1,"contrast":1,"brightness":1,"gamma":1,"red":0.40784313725490196,"green":0.49019607843137253,"blue":0.8901960784313725}}]);} 

//Negative Energy Plane
else if (destination == "Negative Energy Plane"){
portalColor = 'purple'
circleColor = 'dark_purple'
castColor = 'purple'
planeImage = 'https://i.imgur.com/vbHQrhx.png'
pulseColor = 'purple'
saturation = -1
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#bfbfbf"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#b5b5b5"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1}}]);}

//Positive Energy Plane
else if (destination == "Positive Energy Plane"){
portalColor = 'yellow'
circleColor = 'dark_yellow'
castColor = 'yellow'
planeImage = 'https://i.imgur.com/jAPMC6E.png'
pulseColor = 'yellow'
saturation = -0.25
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#ffffff"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#ffffff"},"saturation":1.1,"contrast":1.1,"brightness":1.2,"gamma":1}}]);}

//Heaven
else if (destination == "Heaven"){
portalColor = 'yellow'
circleColor = 'yellow'
castColor = 'yellow'
planeImage = 'https://i.imgur.com/CPmQviZ.png'
pulseColor = 'yellow'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#fbc41e"}}}]);
FXMASTER.filters.setFilters([{"type":"bloom","options":{"blur":1,"bloomScale":0.2,"threshold":0.5}},{"type":"color","options":{"color":{"apply":true,"value":"#fefce1"},"saturation":1.1,"contrast":1,"brightness":1.3,"gamma":1}}]);}

//Nirvana
else if (destination == "Nirvana"){
portalColor = 'red'
circleColor = 'red'
castColor = 'white'
planeImage = 'https://i.imgur.com/6fOXEiB.png'
pulseColor = 'red'
saturation = -0.45
hue = -20
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#febebe"}}}]);
FXMASTER.filters.setFilters([{"type":"bloom","options":{"blur":1,"bloomScale":0.1,"threshold":0.5}},{"type":"color","options":{"color":{"apply":true,"value":"#fee1e1"},"saturation":1.1,"contrast":1,"brightness":1.3,"gamma":1,"red":0.996078431372549,"green":0.8823529411764706,"blue":0.8823529411764706}}]);}

//Elysium
else if (destination == "Elysium"){
portalColor = 'green'
circleColor = 'green'
castColor = 'green'
planeImage = 'https://i.imgur.com/sQE9mdV.png'
pulseColor = 'green'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#febebe"}}}]);
FXMASTER.filters.setFilters([{"type":"bloom","options":{"blur":1,"bloomScale":0.1,"threshold":0.5}},{"type":"color","options":{"color":{"apply":true,"value":"#fee1e1"},"saturation":1.1,"contrast":1,"brightness":1.3,"gamma":1,"red":0.996078431372549,"green":0.8823529411764706,"blue":0.8823529411764706}}]);}

//Axis
else if (destination == "Axis"){
portalColor = 'yellow'
circleColor = 'yellow'
castColor = 'yellow'
planeImage = 'https://i.imgur.com/9659xZV.png'
pulseColor = 'yellow'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#fbf050"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#e8bf5e"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1}}]);}

//Boneyard
else if (destination == "Boneyard"){
portalColor = 'blue'
circleColor = 'blue'
castColor = 'blue'
planeImage = 'https://i.imgur.com/Mp620An.png'
pulseColor = 'blue'
saturation = -0.5
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#c2b7fb"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#78aee8"},"saturation":0.9,"contrast":1.1,"brightness":1,"gamma":1,"red":0.47058823529411764,"green":0.6823529411764706,"blue":0.9098039215686274}}]);}

//Maelstrom
else if (destination == "Maelstrom"){
portalColor = 'blue'
circleColor = 'blue'
castColor = 'blue'
planeImage = 'https://i.imgur.com/xjcZLpj.png'
pulseColor = 'blue'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#50d1fb"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#955ee8"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1}}]);}

//Hell
else if (destination == "Hell"){
portalColor = 'red'
circleColor = 'red'
castColor = 'yellow'
planeImage = 'https://i.imgur.com/7IFdFh6.png'
pulseColor = 'red'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#000000"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#da7272"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1,"red":0.8549019607843137,"green":0.4470588235294118,"blue":0.4470588235294118}}]);}

//Abaddon
else if (destination == "Abaddon"){
portalColor = 'green'
circleColor = 'green'
castColor = 'green'
planeImage = 'https://i.imgur.com/J8QPuFk.png'
pulseColor = 'green'
saturation = -0.5
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#000000"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#72dab7"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1,"red":0.4470588235294118,"green":0.8549019607843137,"blue":0.7176470588235294}}]);}

//Abyss
else if (destination == "Abyss"){
portalColor = 'purple'
circleColor = 'purple'
castColor = 'purple'
planeImage = 'https://i.imgur.com/fBApWFK.png'
pulseColor = 'purple'
Hooks.call('fxmaster.updateParticleEffects', [{"type":"stars","options":{"scale":1,"speed":3,"lifetime":3,"density":0.5,"tint":{"apply":true,"value":"#000000"}}}]);
FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#d372da"},"saturation":1.1,"contrast":1.1,"brightness":1,"gamma":1,"red":0.8274509803921568,"green":0.4470588235294118,"blue":0.8549019607843137}}]);}


//Add Effects
new Sequence()

.effect()
.file(`jb2a.magic_signs.circle.02.conjuration.loop.${circleColor}`)
.atLocation(position)
.opacity(0.35)
.size({ width: 5, height: 5 }, {gridUnits: true})
.fadeIn(5000, {ease: "easeInExpo"})
.loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 180000})
.filter("ColorMatrix", {saturate:`${saturation}`})
.belowTokens()
.persist()

.effect()
.file(`jb2a.sacred_flame.source.${castColor}`)
.atLocation(position)
.anchor({ x: 0.5, y: 0.6 })
.scale(1.2)
.fadeOut(2000, {ease: "easeInBack"})
.filter("ColorMatrix", {saturate:`${saturation}`})
.waitUntilFinished(-1500)

.effect()
.file(`modules/animated-spell-effects-cartoon/spell-effects/cartoon/energy/energy_pulse_${pulseColor}_CIRCLE.webm`)
.atLocation(position)
.opacity(0.6)
.scale(2)

.effect()
.file(`jb2a.portals.vertical.vortex_masked.${portalColor}`)
.atLocation(position)
.persist()
.anchor({ x: 0.5, y: 0.57 })
.rotateTowards(token)
.size({ width: 5, height: 5 }, {gridUnits: true})
.animateProperty("sprite", "scale.x", { from: 0, to: 5.25, duration: 750, delay:100, ease: "easeOutExpo"})
.animateProperty("sprite", "scale.y", { from: 6, to: 5.25, duration: 50, delay:100, ease: "easeOutExpo"})
.filter("ColorMatrix", {hue: `${hue}`, saturate:`${saturation}`})
.rotate(90)
.zIndex(2)

.effect()
.file(`jb2a.wall_of_force.sphere.${portalColor}`)
.atLocation(position)
.persist()
.anchor({ x: 0.5, y: 0.6 })
.rotateTowards(token)
.size({ width: 5, height: 5 }, {gridUnits: true})
.animateProperty("sprite", "scale.x", { from: 0, to: 3, duration: 750, delay:100, ease: "easeOutExpo"})
.animateProperty("sprite", "scale.y", { from: 1.5, to: 0.87, duration: 50, delay:100, ease: "easeOutExpo"})
.filter("ColorMatrix", {hue: `${hue}`, saturate:`${saturation}`})
.rotate(90)
.zIndex(1)

.effect()
.file(`${planeImage}`)
.atLocation(position)
.persist()
.anchor({ x: 0.5, y: 0.6 })
.rotateTowards(token)
.opacity(1)
.delay(50)
.size({ width: 5, height: 5 }, {gridUnits: true})
.animateProperty("sprite", "scale.x", { from: 0, to: 1.8, duration: 750, delay:200, ease: "easeOutExpo"})
.animateProperty("sprite", "scale.y", { from: 1.5, to: 0.75, duration: 50, delay:200, ease: "easeOutExpo"})
.rotate(90)
.zIndex(0)

.play();