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
    if (CanDash == true) {
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
function Deal_Damage (Damage: number, Constant: boolean, Duration: number, Damage_Speed: number, Knockback: boolean, Sprite2: Sprite, OtherSprite: Sprite, KnockbackAmount: number) {
    if (Constant) {
        for (let index = 0; index < Duration; index++) {
            HealthBar.value += 0 - Damage
            pause(Damage_Speed)
        }
    } else {
        if (!(Knockback)) {
            HealthBar.value += 0 - Damage
            pause(Damage_Speed)
        } else {
            controller.moveSprite(Sprite2, 0, 0)
            if (Sprite2.left >= OtherSprite.right - 16 && (Sprite2.bottom + 15 >= OtherSprite.bottom || Sprite2.top - 15 >= OtherSprite.top)) {
                Sprite2.vx = KnockbackAmount
                Sprite2.say("left")
            } else if (Sprite2.left + 16 >= OtherSprite.left && (Sprite2.bottom + 15 >= OtherSprite.bottom || Sprite2.top - 15 >= OtherSprite.top)) {
                Sprite2.vx = 0 - KnockbackAmount
                Sprite2.say("right")
            } else if (Sprite2.top >= OtherSprite.bottom && (Sprite2.right + 15 >= OtherSprite.right || Sprite2.right - 15 >= OtherSprite.left)) {
                Sprite2.vy = KnockbackAmount
                Sprite2.say("down")
            } else if (Sprite2.bottom <= OtherSprite.top) {
                Sprite2.vy = 0 - KnockbackAmount
                Sprite2.say("up")
            }
            HealthBar.value += 0 - Damage
            timer.after(100, function () {
                Sprite2.vx = 0
                Sprite2.vy = 0
                controller.moveSprite(Sprite2, 100, 100)
            })
            pause(Damage_Speed)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Level == 1) {
        if (MyPlayer.overlapsWith(Note_1)) {
            Note1()
        }
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
    CanDash = true
}
function Level_2 () {
    tiles.setTilemap(tilemap`level 2`)
    Level = 2
    Loading = false
    MyPlayer.setFlag(SpriteFlag.Invisible, false)
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
    CanDash = true
    Setup_Dash()
    Setup_Health_Bar()
    tiles.placeOnTile(MyPlayer, tiles.getTileLocation(10, 17))
    tiles.placeOnTile(Bully_1, tiles.getTileLocation(14, 3))
    tiles.placeOnTile(Bully_2, tiles.getTileLocation(16, 3))
    tiles.placeOnTile(Victim, tiles.getTileLocation(15, 1))
    scene.cameraFollowSprite(MyPlayer)
    controller.moveSprite(MyPlayer)
    Victim.say("HELP!!!")
}
function Level_1 () {
    tiles.setTilemap(tilemap`level1`)
    Read = false
    Hint1_has_spawned = false
    Ai_Talk_1 = false
    Ai_Talk_1 = false
    Note_1 = sprites.create(assets.image`Note`, SpriteKind.Note)
    CanDash = false
    Note_1.say("A")
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
function Set_Level () {
    if (Level == 1) {
        Level_1()
    } else if (Level == 2) {
        Level_2()
    }
}
function LoadingScreen (Duration: number) {
    Cloud_Sprite = sprites.createProjectileFromSide(assets.image`Cloud`, 100, 0)
    Cloud_Sprite.setPosition(0, randint(0, 120))
    Loading = true
    CanDash = false
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`LoadingScreen`)
    scene.centerCameraAt(0, 0)
    MyPlayer.setFlag(SpriteFlag.Invisible, true)
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
function Setup_Health_Bar () {
    HealthBar = statusbars.create(55, 10, StatusBarKind.Health)
    HealthBar.value = 100
    HealthBar.setBarBorder(2, 1)
    HealthBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    HealthBar.setLabel("HP")
    HealthBar.positionDirection(CollisionDirection.Top)
    HealthBar.setOffsetPadding(45, 1)
}
function InitializeVariables () {
    Level = 2
    DashSpeed = 500
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
let Loading_text: Sprite = null
let Loading_dots: Sprite = null
let Cloud_Sprite: Sprite = null
let Hint1_has_spawned = false
let Read = false
let Victim: Sprite = null
let Bully_2: Sprite = null
let Bully_1: Sprite = null
let Loading = false
let Ai_Talk_1 = false
let Note_1: Sprite = null
let Level = 0
let HealthBar: StatusBarSprite = null
let Hint: Sprite = null
let DashSpeed = 0
let Direction = ""
let Dashing = false
let CanDash = false
let DashMeter: StatusBarSprite = null
let MyPlayer: Sprite = null
InitializeVariables()
controller.moveSprite(MyPlayer)
scene.cameraFollowSprite(MyPlayer)
Set_Level()
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
    if (Level == 1) {
        if (MyPlayer.tileKindAt(TileDirection.Center, assets.tile`Check Point`)) {
            game.splash("You have escaped the room")
            LoadingScreen(5000)
        }
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
    if (CanDash == true) {
        if (!(Dashing)) {
            DashMeter.value += 1
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (Loading) {
        Cloud_Sprite = sprites.createProjectileFromSide(assets.image`Cloud`, 100, 0)
        Cloud_Sprite.setPosition(0, randint(0, 120))
    }
})
forever(function () {
    if (Level == 2) {
        if (spriteutils.distanceBetween(MyPlayer, Bully_1) < 50 || spriteutils.distanceBetween(MyPlayer, Bully_2) < 50) {
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
forever(function () {
    if (Level == 2) {
        MyPlayer.say(Math.floor(MyPlayer.top - 15))
        Bully_2.say(Math.floor(Bully_2.top))
        if (spriteutils.distanceBetween(MyPlayer, Bully_1) < 14) {
            Deal_Damage(7, false, 0, 1000, true, MyPlayer, Bully_1, 100)
        }
        if (spriteutils.distanceBetween(MyPlayer, Bully_2) < 14) {
            Deal_Damage(5, false, 0, 1000, true, MyPlayer, Bully_2, 100)
        }
    }
})
