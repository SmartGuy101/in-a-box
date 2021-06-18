namespace SpriteKind {
    export const Hint = SpriteKind.create()
    export const Note = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    MyPlayer.setImage(assets.image`Player_Up`)
    if (controller.left.isPressed()) {
        MyPlayer.setImage(assets.image`Player_TopLeft`)
    }
    if (controller.right.isPressed()) {
        MyPlayer.setImage(assets.image`Player_TopRight`)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Dashing)) {
        Dashing = true
        controller.moveSprite(MyPlayer, 0, 0)
        if (FacingLeft) {
            MyPlayer.vx = -500
        } else {
            MyPlayer.vx = 500
        }
        MyPlayer.startEffect(effects.trail)
        MyPlayer.startEffect(effects.fire)
        MyPlayer.startEffect(effects.trail)
        MyPlayer.startEffect(effects.fire)
        timer.after(100, function () {
            Dashing = false
            MyPlayer.vx = 0
            controller.moveSprite(MyPlayer, 100, 100)
            effects.clearParticles(MyPlayer)
        })
    }
})
function Hint1 () {
    Hint = sprites.create(assets.image`Hint`, SpriteKind.Hint)
    Hint.startEffect(effects.ashes, 500)
    tiles.placeOnTile(Hint, tiles.getTileLocation(7, 10))
    animation.runMovementAnimation(
    Hint,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MyPlayer.overlapsWith(Note_1)) {
        Note1()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MyPlayer.setImage(assets.image`Player_Left`)
    if (controller.up.isPressed()) {
        MyPlayer.setImage(assets.image`Player_TopLeft`)
    }
    if (controller.down.isPressed()) {
        MyPlayer.setImage(assets.image`Player_BottomLeft`)
    }
})
function AI_Talk_1 () {
    game.showLongText("Hello there.", DialogLayout.Bottom)
    game.showLongText("I am Your Ai. You can call me Opix.", DialogLayout.Bottom)
    game.showLongText("You just found a hint.", DialogLayout.Bottom)
    game.showLongText("Did you know, you can dash by pressing b", DialogLayout.Bottom)
    game.showLongText("You will get boosted in the direction you are facing.", DialogLayout.Bottom)
    game.showLongText("But you have to recharge your dash before you can use it again.", DialogLayout.Bottom)
    game.showLongText("Good luck", DialogLayout.Bottom)
    statusbar = statusbars.create(55, 10, StatusBarKind.Energy)
    statusbar.setBarBorder(2, 1)
    statusbar.bottom = 118
    statusbar.left = 2
}
function SetPositions () {
    tiles.placeOnTile(MyPlayer, tiles.getTileLocation(7, 8))
    tiles.placeOnTile(Note_1, tiles.getTileLocation(9, 6))
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    MyPlayer.setImage(assets.image`Player_Right`)
    if (controller.up.isPressed()) {
        MyPlayer.setImage(assets.image`Player_TopRight`)
    }
    if (controller.down.isPressed()) {
        MyPlayer.setImage(assets.image`Player_BottomRight`)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    MyPlayer.setImage(assets.image`Player_Down`)
    if (controller.left.isPressed()) {
        MyPlayer.setImage(assets.image`Player_BottomLeft`)
    }
    if (controller.right.isPressed()) {
        MyPlayer.setImage(assets.image`Player_BottomRight`)
    }
})
function InitializeVariables () {
    Read = false
    Hint1_has_spawned = false
    Ai_Talk_1 = 0
    Note_1 = sprites.create(assets.image`Note`, SpriteKind.Note)
    MyPlayer = sprites.create(assets.image`Player`, SpriteKind.Player)
}
function Note1 () {
    if (Read == false) {
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
        Read = true
    } else {
        game.showLongText("Mission: Break out of this room", DialogLayout.Top)
    }
}
let Ai_Talk_1 = 0
let Hint1_has_spawned = false
let Read = false
let statusbar: StatusBarSprite = null
let Hint: Sprite = null
let FacingLeft = false
let Dashing = false
let Note_1: Sprite = null
let MyPlayer: Sprite = null
tiles.setTilemap(tilemap`level1`)
InitializeVariables()
SetPositions()
controller.moveSprite(MyPlayer)
scene.cameraFollowSprite(MyPlayer)
Note_1.say("A")
game.onUpdate(function () {
    if (Read == true) {
        if (Hint1_has_spawned == false) {
            if (MyPlayer.tileKindAt(TileDirection.Left, assets.tile`myTile`)) {
                Hint1()
                Hint1_has_spawned = true
            }
        }
        if (Hint1_has_spawned == true) {
            if (MyPlayer.overlapsWith(Hint)) {
                Hint.destroy()
                if (Ai_Talk_1 == 0) {
                    AI_Talk_1()
                }
            }
        }
    }
})
game.onUpdate(function () {
    if (MyPlayer.vx > 0) {
        FacingLeft = false
    } else if (MyPlayer.vx < 0) {
        FacingLeft = true
    }
})
