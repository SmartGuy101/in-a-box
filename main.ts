namespace SpriteKind {
    export const Hint = SpriteKind.create()
    export const Note = SpriteKind.create()
    export const UI = SpriteKind.create()
}
function Setup_Dash () {
    DashMeter = statusbars.create(55, 10, StatusBarKind.Energy)
    DashMeter.setBarBorder(2, 1)
    DashMeter.value = 50
    DashMeter.max = 50
    DashMeter.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    DashMeter.bottom = 118
    DashMeter.left = 2
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
    if (Ai_Talk_1 == true) {
        if (!(Dashing) && DashMeter.value == DashMeter.max) {
            Dashing = true
            controller.moveSprite(MyPlayer, 0, 0)
            if (Direction == "Left") {
                MyPlayer.vx = 0 - DashSpeed
            } else if (Direction == "Right") {
                MyPlayer.vx = DashSpeed
            } else if (Direction == "Up") {
                MyPlayer.vy = DashSpeed
            } else if (Direction == "Down") {
                MyPlayer.vy = 0 - DashSpeed
            }
            MyPlayer.startEffect(effects.trail)
            MyPlayer.startEffect(effects.fire)
            MyPlayer.startEffect(effects.trail)
            MyPlayer.startEffect(effects.fire)
            DashMeter.value = 0
            timer.after(100, function () {
                MyPlayer.vx = 0
                MyPlayer.vy = 0
                controller.moveSprite(MyPlayer, 100, 100)
                effects.clearParticles(MyPlayer)
                timer.after(100, function () {
                    Dashing = false
                })
            })
        }
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
    game.setDialogFrame(assets.image`AI_Frame`)
    game.showLongText("Hello there.", DialogLayout.Bottom)
    game.showLongText("I am Your Ai. You can call me Opix.", DialogLayout.Bottom)
    game.showLongText("You just found a hint.", DialogLayout.Bottom)
    game.showLongText("Did you know, you can dash by pressing b.", DialogLayout.Bottom)
    game.showLongText("You will get boosted in the direction you are facing.", DialogLayout.Bottom)
    game.showLongText("But you have to recharge your dash before you can use it again.", DialogLayout.Bottom)
    game.showLongText("Good luck!!!", DialogLayout.Bottom)
    Setup_Dash()
    Ai_Talk_1 = true
}
function Level_2 () {
    tiles.setTilemap(tilemap`level 2`)
    Level = 2
    Loading = false
    MyPlayer = sprites.create(assets.image`Player`, SpriteKind.Player)
    Bully_1 = sprites.create(assets.image`Meanies`, SpriteKind.Enemy)
    Bully_2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 2 2 2 2 4 . . 
        . . 4 2 2 2 2 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 2 4 4 4 4 4 2 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 2 4 4 . . 
        . . 4 4 2 2 2 2 2 2 2 2 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    Victim = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 8 8 8 8 9 9 8 8 8 8 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 9 8 9 9 9 9 9 9 8 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 9 9 8 8 8 8 8 8 8 9 9 . . 
        . . 9 9 9 8 9 9 9 9 9 8 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    Setup_Dash()
    tiles.placeOnTile(MyPlayer, tiles.getTileLocation(10, 17))
    tiles.placeOnTile(Bully_1, tiles.getTileLocation(14, 3))
    tiles.placeOnTile(Bully_2, tiles.getTileLocation(16, 3))
    tiles.placeOnTile(Victim, tiles.getTileLocation(15, 1))
    scene.cameraFollowSprite(MyPlayer)
    controller.moveSprite(MyPlayer)
    Victim.say("HELP!!!")
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
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass2, function (sprite, location) {
    Bully_1.follow(MyPlayer, 30)
    Bully_2.follow(MyPlayer, 50)
    if (location == tiles.getTileLocation(15, 4)) {
    	
    }
})
function LoadingScreen (Duration: number) {
    Cloud_Sprite = sprites.createProjectileFromSide(assets.image`Cloud`, 100, 0)
    Cloud_Sprite.setPosition(0, randint(0, 120))
    Loading = true
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`LoadingScreen`)
    scene.centerCameraAt(0, 0)
    MyPlayer.destroy()
    Hint.destroy()
    Note_1.destroy()
    DashMeter.destroy()
    Loading_dots = sprites.create(assets.image`Loading dots`, SpriteKind.UI)
    Loading_text = sprites.create(assets.image`Loading Text`, SpriteKind.UI)
    Loading_dots.setPosition(80, 60)
    Loading_text.setPosition(80, 50)
    animation.runImageAnimation(
    Loading_dots,
    assets.animation`Loading Dots`,
    80,
    true
    )
    timer.after(Duration, function () {
        Loading_dots.destroy()
        Loading_text.destroy()
        Level_2()
    })
}
function InitializeVariables () {
    Level = 1
    DashSpeed = 500
    Read = false
    Hint1_has_spawned = false
    Ai_Talk_1 = false
    Ai_Talk_1 = false
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
let Hint1_has_spawned = false
let Read = false
let Loading_text: Sprite = null
let Loading_dots: Sprite = null
let Cloud_Sprite: Sprite = null
let Victim: Sprite = null
let Bully_2: Sprite = null
let Bully_1: Sprite = null
let Loading = false
let Level = 0
let Hint: Sprite = null
let DashSpeed = 0
let Direction = ""
let Dashing = false
let Ai_Talk_1 = false
let DashMeter: StatusBarSprite = null
let Note_1: Sprite = null
let MyPlayer: Sprite = null
tiles.setTilemap(tilemap`level1`)
InitializeVariables()
SetPositions()
controller.moveSprite(MyPlayer)
scene.cameraFollowSprite(MyPlayer)
Note_1.say("A")
game.onUpdate(function () {
    if (MyPlayer.tileKindAt(TileDirection.Center, assets.tile`Check Point`)) {
        game.splash("You have escaped the room")
        LoadingScreen(5000)
    }
})
game.onUpdate(function () {
    if (Dashing && MyPlayer.tileKindAt(TileDirection.Left, assets.tile`Wall_1_Right_Cracked`)) {
        tiles.setWallAt(tiles.getTileLocation(4, 10), false)
        tiles.setTileAt(tiles.getTileLocation(4, 10), assets.tile`transparency16`)
        MyPlayer.vx = 100
        timer.after(550, function () {
            MyPlayer.vx = 0
        })
    }
})
game.onUpdate(function () {
    if (MyPlayer.vx > 0) {
        Direction = "Right"
    } else if (MyPlayer.vx < 0) {
        Direction = "Left"
    } else if (MyPlayer.vy > 0) {
        Direction = "Up"
    } else if (MyPlayer.vy < 0) {
        Direction = "Down"
    }
})
game.onUpdate(function () {
    if (Read == true) {
        if (Hint1_has_spawned == false) {
            if (MyPlayer.tileKindAt(TileDirection.Left, assets.tile`Wall_1_Right_Cracked`)) {
                Hint1()
                Hint1_has_spawned = true
            }
        }
        if (Hint1_has_spawned == true) {
            if (MyPlayer.overlapsWith(Hint)) {
                Hint.destroy()
                if (Ai_Talk_1 == false) {
                    AI_Talk_1()
                }
            }
        }
    }
})
game.onUpdate(function () {
    if (Ai_Talk_1 == true) {
        if (!(Dashing)) {
            DashMeter.value += 1
        }
    }
})
forever(function () {
    if (Level == 2) {
        if (MyPlayer.overlapsWith(Bully_1) || MyPlayer.overlapsWith(Bully_2)) {
            Bully_1.follow(MyPlayer, 30)
            Bully_2.follow(MyPlayer, 50)
        }
        if (Dashing && MyPlayer.overlapsWith(Bully_1)) {
            Bully_1.destroy(effects.disintegrate, 500)
        }
        if (Dashing && MyPlayer.overlapsWith(Bully_2)) {
            Bully_2.destroy(effects.disintegrate, 500)
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (Loading) {
        Cloud_Sprite = sprites.createProjectileFromSide(assets.image`Cloud`, 100, 0)
        Cloud_Sprite.setPosition(0, randint(0, 120))
    }
})
