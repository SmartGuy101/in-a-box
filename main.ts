controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Bullet`, MyPlayer, -100, 0)
    projectile.startEffect(effects.fire, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MyPlayer.overlapsWith(Note_1)) {
        Note1()
    }
})
controller.combos.attachCombo("b left", function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Bullet`, MyPlayer, -100, 0)
    projectile.startEffect(effects.fire, 500)
})
function AI_Talk_1 () {
    game.showLongText("Hello there.", DialogLayout.Bottom)
    game.showLongText("I am Your Ai. You can call me Opix.", DialogLayout.Bottom)
    game.showLongText("You Just collected a Shooting Power Up", DialogLayout.Bottom)
    game.showLongText("This will allow you to shoot five bullets", DialogLayout.Bottom)
    game.showLongText("Make sure to use them wisely", DialogLayout.Bottom)
}
controller.combos.attachCombo("b down", function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Bullet`, MyPlayer, 0, 100)
    projectile.startEffect(effects.fire, 500)
})
function SetPositions () {
    tiles.placeOnTile(MyPlayer, tiles.getTileLocation(7, 8))
    tiles.placeOnTile(Note_1, tiles.getTileLocation(9, 6))
}
controller.combos.attachCombo("b right", function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Bullet`, MyPlayer, 100, 0)
    projectile.startEffect(effects.fire, 500)
})
controller.combos.attachCombo("b up", function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Bullet`, MyPlayer, 0, -100)
    projectile.startEffect(effects.fire, 500)
})
function InitializeVariables () {
    Read = 0
    Ai_Talk_1 = 0
    Note_1 = sprites.create(assets.image`Note1`, SpriteKind.Player)
    MyPlayer = sprites.create(assets.image`Player`, SpriteKind.Player)
}
function Note1 () {
    if (Read == 0) {
        Note_1.say("")
        game.setDialogFrame(assets.image`Note Frame`)
        game.showLongText("Hi", DialogLayout.Bottom)
        game.showLongText("You're probably wondering where you are . . .", DialogLayout.Bottom)
        game.showLongText("Or why you are here     . . .", DialogLayout.Bottom)
        game.showLongText("Well, I can't answer that yet.", DialogLayout.Bottom)
        game.showLongText("I've implanted an Ai in your brain that will help you out.", DialogLayout.Bottom)
        game.showLongText("Find notes and hints, and when you are strong enough . . .", DialogLayout.Bottom)
        game.showLongText("FIND ME", DialogLayout.Bottom)
        pause(400)
        game.setDialogFrame(assets.image`Mission Frame`)
        game.showLongText("Mission: Break out of this room", DialogLayout.Top)
        pause(400)
        Shooting_Power_up = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 2 2 2 2 4 . . . . . 
            . . . . . 4 2 4 4 4 4 . . . . . 
            . . . . . 4 4 4 4 2 4 . . . . . 
            . . . . . 4 2 2 2 2 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Player)
        Shooting_Power_up.startEffect(effects.fire, 500)
        tiles.placeOnTile(Shooting_Power_up, tiles.getTileLocation(5, 5))
        Read = 1
    } else {
        game.showLongText("Mission: Break out of this room", DialogLayout.Top)
    }
}
let Shooting_Power_up: Sprite = null
let Ai_Talk_1 = 0
let Read = 0
let projectile: Sprite = null
let Note_1: Sprite = null
let MyPlayer: Sprite = null
tiles.setTilemap(tilemap`level1`)
InitializeVariables()
SetPositions()
controller.moveSprite(MyPlayer)
scene.cameraFollowSprite(MyPlayer)
Note_1.say("A")
game.onUpdate(function () {
    if (Read == 1) {
        if (MyPlayer.overlapsWith(Shooting_Power_up)) {
            MyPlayer.say("Power Up Collected", 4000)
            Shooting_Power_up.destroy()
            if (Ai_Talk_1 == 0) {
                AI_Talk_1()
            }
        }
    }
})
