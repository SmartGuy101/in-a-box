namespace SpriteKind {
    export const Hint = SpriteKind.create()
    export const Note = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MyPlayer.overlapsWith(Note_1)) {
        Note1()
    }
})
function AI_Talk_1 () {
    game.showLongText("Hello there.", DialogLayout.Bottom)
    game.showLongText("I am Your Ai. You can call me Opix.", DialogLayout.Bottom)
    game.showLongText("You Just collected a Shooting Power Up", DialogLayout.Bottom)
    game.showLongText("This gives you five rockets", DialogLayout.Bottom)
    game.showLongText("Make sure to use them wisely", DialogLayout.Bottom)
}
function SetPositions () {
    tiles.placeOnTile(MyPlayer, tiles.getTileLocation(7, 8))
    tiles.placeOnTile(Note_1, tiles.getTileLocation(9, 6))
}
function FirstNoteRead () {
    pause(10000)
    Hint = sprites.create(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Hint)
    Hint.startEffect(effects.ashes, 500)
    tiles.placeOnTile(Hint, tiles.getTileLocation(5, 5))
    animation.runMovementAnimation(
    Hint,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    Read = 1
}
function InitializeVariables () {
    Read = 0
    Ai_Talk_1 = 0
    Note_1 = sprites.create(assets.image`Note1`, SpriteKind.Note)
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
        FirstNoteRead()
    } else {
        game.showLongText("Mission: Break out of this room", DialogLayout.Top)
    }
}
let Ai_Talk_1 = 0
let Read = 0
let Hint: Sprite = null
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
        if (MyPlayer.overlapsWith(Hint)) {
            MyPlayer.say("Power Up Collected", 4000)
            Hint.destroy()
            if (Ai_Talk_1 == 0) {
                AI_Talk_1()
            }
        }
    }
})
