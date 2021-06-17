def on_a_pressed():
    if MyPlayer.overlaps_with(Note_1):
        Note1()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def AI_Talk_1():
    game.show_long_text("Hello there.", DialogLayout.BOTTOM)
    game.show_long_text("I am Your Ai. You can call me Opix.", DialogLayout.BOTTOM)
    game.show_long_text("You Just collected a Shooting Power Up",
        DialogLayout.BOTTOM)
    game.show_long_text("This gives you five rockets", DialogLayout.BOTTOM)
    game.show_long_text("Make sure to use them wisely", DialogLayout.BOTTOM)
def SetPositions():
    tiles.place_on_tile(MyPlayer, tiles.get_tile_location(7, 8))
    tiles.place_on_tile(Note_1, tiles.get_tile_location(9, 6))
def InitializeVariables():
    global Read, Ai_Talk_1, Note_1, MyPlayer
    Read = 0
    Ai_Talk_1 = 0
    Note_1 = sprites.create(assets.image("""
        Note1
    """), SpriteKind.player)
    MyPlayer = sprites.create(assets.image("""
        Player
    """), SpriteKind.player)
def Note1():
    global Shooting_Power_up, Read
    if Read == 0:
        Note_1.say("")
        game.set_dialog_frame(assets.image("""
            Note Frame
        """))
        game.show_long_text("Hi", DialogLayout.BOTTOM)
        game.show_long_text("You're probably wondering where you are . . .",
            DialogLayout.BOTTOM)
        game.show_long_text("Or why you are here     . . .", DialogLayout.BOTTOM)
        game.show_long_text("Well, I can't answer that yet.", DialogLayout.BOTTOM)
        game.show_long_text("I've implanted an Ai in your brain that will help you out.",
            DialogLayout.BOTTOM)
        game.show_long_text("Find notes and hints, and when you are strong enough . . .",
            DialogLayout.BOTTOM)
        game.show_long_text("FIND ME", DialogLayout.BOTTOM)
        pause(400)
        game.set_dialog_frame(assets.image("""
            Mission Frame
        """))
        game.show_long_text("Mission: Break out of this room", DialogLayout.TOP)
        pause(400)
        Shooting_Power_up = sprites.create(img("""
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
            """),
            SpriteKind.player)
        Shooting_Power_up.start_effect(effects.fire, 500)
        tiles.place_on_tile(Shooting_Power_up, tiles.get_tile_location(5, 5))
        Read = 1
    else:
        game.show_long_text("Mission: Break out of this room", DialogLayout.TOP)
Shooting_Power_up: Sprite = None
Ai_Talk_1 = 0
Read = 0
Note_1: Sprite = None
MyPlayer: Sprite = None
tiles.set_tilemap(tilemap("""
    level1
"""))
InitializeVariables()
SetPositions()
controller.move_sprite(MyPlayer)
scene.camera_follow_sprite(MyPlayer)
Note_1.say("A")

def on_on_update():
    if Read == 1:
        if MyPlayer.overlaps_with(Shooting_Power_up):
            MyPlayer.say("Power Up Collected", 4000)
            Shooting_Power_up.destroy()
            if Ai_Talk_1 == 0:
                AI_Talk_1()
game.on_update(on_on_update)
