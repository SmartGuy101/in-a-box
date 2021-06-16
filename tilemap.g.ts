// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000503030303030307000000000000000001090909090909020000000000000000010909090909090200000000000000000109090909090902000000000000000001090909090909020000000000000000010909090909090200000000000000000a09090909090902000000000000000006040404040404080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . 2 2 2 2 2 2 2 2 . . . . 
. . . . 2 . . . . . . 2 . . . . 
. . . . 2 . . . . . . 2 . . . . 
. . . . 2 . . . . . . 2 . . . . 
. . . . 2 . . . . . . 2 . . . . 
. . . . 2 . . . . . . 2 . . . . 
. . . . 2 . . . . . . 2 . . . . 
. . . . 2 2 2 2 2 2 2 2 . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Wall_1_Left0":
            case "tile1":return tile1;
            case "Wall_1_Right0":
            case "tile2":return tile2;
            case "Wall_1_Top0":
            case "tile3":return tile3;
            case "Wall_1_Bottom0":
            case "tile4":return tile4;
            case "Wall_1_TopLeft0":
            case "tile5":return tile5;
            case "Wall_1_BottomLeft0":
            case "tile6":return tile6;
            case "Wall_1_TopRight0":
            case "tile7":return tile7;
            case "Wall_1_BottomRight0":
            case "tile8":return tile8;
            case "Room_1_floor":
            case "tile9":return tile9;
            case "myTile":
            case "tile10":return tile10;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
