//Last Updated: 11/09/2022
//Author: EskieMoh#2969

let target = Array.from(game.user.targets)[0];

let config = {
    size:target.w / canvas.grid.size,
    icon: 'icons/magic/air/wind-vortex-swirl-blue.webp',
    label: 'Vortex Warp',
    tag: 'Vortex Warp',
    drawIcon: true,
    drawOutline: true,
    interval: target.data.width % 2 === 0 ? 1 : -1,
    rememberControlled: true,
}

let position = await warpgate.crosshairs.show(config);

new Sequence()

.effect()
.from(target)
.duration(1500)
.scaleOut(0, 500, {ease: "easeInOutElastic"})
.rotateOut(180, 300, {ease: "easeOutCubic"})
.animateProperty("sprite", "position.y", {  from:0 , to: -0.25, gridUnits:true, duration: 100, delay:1000})
.animateProperty("sprite", "position.y", {  from:-0.25 , to: 0, gridUnits:true, duration: 100, delay:1100})

.animation()
.delay(100)
.on(target)
.opacity(0)

.effect()
.file("jb2a.particles.outward.white.01.02")
.scaleIn(0, 500, {ease: "easeOutQuint"})
.delay(1000)
.fadeOut(1000)
.atLocation(target)
.duration(1000)
.size(1.35, {gridUnits: true})
.animateProperty("spriteContainer", "position.y", {  from:0 , to: -0.5, gridUnits:true, duration: 1000})
.zIndex(1)

.effect()
.file("jb2a.portals.horizontal.vortex.purple")
.atLocation(target)
.scaleToObject(0.5)
.rotateIn(-360, 500, {ease: "easeOutCubic"})
.rotateOut(360, 500, {ease: "easeOutCubic"})
.scaleIn(0, 600, {ease: "easeInOutCirc"})
.scaleOut(0, 600, {ease: "easeOutCubic"})
.opacity(1)
.duration(1500)
.belowTokens()
.zIndex(0)

.effect()
.file("jb2a.extras.tmfx.outflow.circle.04")
.atLocation(target)
.scaleToObject(2.5)
.rotateIn(-360, 500, {ease: "easeOutCubic"})
.rotateOut(360, 500, {ease: "easeOutCubic"})
.scaleIn(0, 600, {ease: "easeInOutCirc"})
.scaleOut(0, 600, {ease: "easeOutCubic"})
.fadeOut(1000)
.opacity(0.2)
.belowTokens()
.zIndex(0)

.effect()
.file("jb2a.template_circle.vortex.intro.purple")
.atLocation(target)
.scaleToObject(1.9)
.rotateIn(-360, 500, {ease: "easeOutCubic"})
.rotateOut(360, 500, {ease: "easeOutCubic"})
.scaleIn(0, 600, {ease: "easeInOutCirc"})
.scaleOut(0, 600, {ease: "easeOutCubic"})
.opacity(1)
.belowTokens()
.zIndex(1)
.waitUntilFinished()

.animation()
.on(target)
.teleportTo(position)
.snapToGrid()
.offset({ x: -1, y: -1 })
.waitUntilFinished(200)

.effect()
.file("jb2a.portals.horizontal.vortex.purple")
.atLocation(target)
.scaleToObject(0.5)
.rotateIn(-360, 500, {ease: "easeOutCubic"})
.rotateOut(360, 500, {ease: "easeOutCubic"})
.scaleIn(0, 600, {ease: "easeInOutCirc"})
.scaleOut(0, 600, {ease: "easeOutCubic"})
.opacity(1)
.duration(1500)
.belowTokens()
.zIndex(0)

.effect()
.file("jb2a.template_circle.vortex.outro.purple")
.atLocation(target)
.scaleToObject(1.9)
.rotateIn(-360, 500, {ease: "easeOutCubic"})
.rotateOut(360, 500, {ease: "easeOutCubic"})
.scaleIn(0, 500, {ease: "easeInOutCirc"})
.scaleOut(0, 500, {ease: "easeOutCubic"})
.opacity(1)
.belowTokens()
.zIndex(1)

.effect()
.file("jb2a.extras.tmfx.outflow.circle.04")
.atLocation(target)
.scaleToObject(2.5)
.rotateIn(-360, 500, {ease: "easeOutCubic"})
.rotateOut(360, 500, {ease: "easeOutCubic"})
.scaleIn(0, 500, {ease: "easeInOutCirc"})
.scaleOut(0, 500, {ease: "easeOutCubic"})
.opacity(0.2)
.fadeOut(1000)
.belowTokens()
.zIndex(0)

.effect()
.file("jb2a.particles.outward.white.01.02")
.delay(250)
.scaleIn(0, 500, {ease: "easeOutQuint"})
.fadeOut(1000)
.atLocation(target)
.duration(1000)
.size(1.35, {gridUnits: true})
.animateProperty("spriteContainer", "position.y", {  from:0 , to: -0.5, gridUnits:true, duration: 1000})
.zIndex(1)

.effect()
.from(target)
.delay(250)
.atLocation(target)
.duration(1500)
.scaleIn({ x: 0.2, y: 0 }, 1000, {ease: "easeOutElastic"})
.rotateIn(360, 500, {ease: "easeOutCubic"})
.animateProperty("spriteContainer", "position.y", {  from:0 , to: -0.5, gridUnits:true, duration: 200})
.animateProperty("spriteContainer", "position.y", {  from:-0.5 , to: 0, gridUnits:true, duration: 200, delay:200})
.waitUntilFinished(-200)

.animation()
.on(target)
.opacity(1)

.play();