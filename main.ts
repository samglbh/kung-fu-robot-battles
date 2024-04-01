namespace SpriteKind {
    export const droid = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (move_allowed == true) {
        mySprite.changeScale(5, ScaleAnchor.Middle)
        pause(A_move)
        mySprite.setScale(1, ScaleAnchor.Middle)
        statusbar.value += -25
    }
})
function wave () {
    for (let index = 0; index < B_move; index++) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . . c b . . . . . . . 
            . . . . . . b c b . . . . . . . 
            . . . . . b c c c b . . . . . . 
            . . . b c c c . c c c b . . . . 
            . . b b b b c c c b b b b . . . 
            . . . . . . b c b . . . . . . . 
            . . . . . . b c . . . . . . . . 
            . . . . . . b b . . . . . . . . 
            . . . . . . b . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, randint(-50, 50), randint(-50, 50))
        statusbar.value += -1
        pause(100)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.droid, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    amount_of_defeated_troops += 1
    info.changeScoreBy(1)
})
function choose_round () {
    if (amount_of_troops == 0) {
        round = 1
        amount_of_defeated_troops = 0
    } else if (amount_of_defeated_troops == 5) {
        round = 2
        amount_of_defeated_troops = 0
    } else if (amount_of_defeated_troops == 10) {
        round = 3
        amount_of_defeated_troops = 0
    } else if (amount_of_defeated_troops == 15) {
        round = 4
        amount_of_defeated_troops = 0
    } else if (amount_of_defeated_troops == 20) {
        round = 5
        amount_of_defeated_troops = 0
    }
    return round
}
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 100, function (status) {
    move_allowed = true
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    move_allowed = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.droid, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    amount_of_defeated_troops += 1
    info.changeScoreBy(1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (move_allowed == true) {
        wave()
    }
})
let mySprite2: Sprite = null
let round = 0
let amount_of_defeated_troops = 0
let projectile: Sprite = null
let amount_of_troops = 0
let B_move = 0
let A_move = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let move_allowed = false
let mySprite3 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
mySprite3.setVelocity(randint(-50, 50), randint(-50, 50))
move_allowed = true
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 1 1 f f f . . . . 
    . . . f f f 1 1 1 1 f f f . . . 
    . . f f f 1 1 1 1 1 1 f f f . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . f 1 1 1 1 1 1 1 1 1 1 f . . 
    . f f 1 f f f f f f f f 1 f f . 
    . f 1 1 f f f f f f f f 1 1 f . 
    . . f 1 1 1 1 f f 1 1 1 1 f . . 
    . . . f 1 1 1 f f 1 1 1 f . . . 
    . . 1 1 f f f f f f f f 1 1 . . 
    . . 1 1 f 1 1 1 1 1 1 f 1 1 . . 
    . . 1 1 f 1 1 1 1 1 1 f 1 1 . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level2`)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.setBarSize(4, 100)
statusbar.positionDirection(CollisionDirection.Left)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
A_move = 1000
B_move = 100
amount_of_troops = 0
game.onUpdateInterval(500, function () {
    statusbar.value += 1
})
game.onUpdateInterval(2000, function () {
    choose_round()
    console.log("round " + choose_round())
    if (choose_round() == 1) {
        console.log("Amount of troops " + amount_of_troops)
        if (amount_of_troops < 5) {
            mySprite2 = sprites.create(img`
                . . . . . . b b b b . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . c b b b b b b b b c . . . 
                f f f c c c c c c c c c c f f f 
                . . f c c c c b b c c c c f . . 
                . . c c c c c b b c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else if (choose_round() == 2) {
        if (amount_of_troops < 10) {
            mySprite2 = sprites.create(img`
                . . . . . . b b b b . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . c b b b b b b b b c . . . 
                f f f c c c c c c c c c c f f f 
                . . f c c c c 2 2 c c c c f . . 
                . . c c c c c 2 2 c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else if (choose_round() == 3) {
        if (amount_of_troops < 15) {
            mySprite2 = sprites.create(img`
                . . . . . . b b b b . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . c b b b b b b b b c . . . 
                f f f c c c c c c c c c c f f f 
                . . f c c c c 4 4 c c c c f . . 
                . . c c c c c 4 4 c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else if (choose_round() == 4) {
        if (amount_of_troops < 20) {
            mySprite2 = sprites.create(img`
                . . . . . . b b b b . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . c b b b b b b b b c . . . 
                f f f c c c c c c c c c c f f f 
                . . f c c c c 5 5 c c c c f . . 
                . . c c c c c 5 5 c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else if (choose_round() == 5) {
        if (amount_of_troops < 50) {
            mySprite2 = sprites.create(img`
                . . . . . . b b b b . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b 2 2 b b 2 2 b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . . b b b b b b b b . . . . 
                . . . c b b b b b b b b c . . . 
                f f f c c c c c c c c c c f f f 
                . . f c c c c 8 8 c c c c f . . 
                . . c c c c c 8 8 c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else {
        mySprite2 = sprites.create(img`
            . . . . . . b b b b . . . . . . 
            . . . . b b b b b b b b . . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . . . b b b b b b b b . . . . 
            . . . . b 2 2 b b 2 2 b . . . . 
            . . . . b 2 2 b b 2 2 b . . . . 
            . . . . b b b b b b b b . . . . 
            . . . . b b b b b b b b . . . . 
            . . . . b b b b b b b b . . . . 
            . . . c b b b b b b b b c . . . 
            f f f c c c c c c c c c c f f f 
            . . f c c c c 6 6 c c c c f . . 
            . . c c c c c 6 6 c c c c c . . 
            . . . . . 6 6 6 6 6 6 . . . . . 
            . . . . . c c . . c c . . . . . 
            `, SpriteKind.droid)
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
        amount_of_troops += 1
    }
    if (mySprite2 && mySprite3) {
        mySprite2.follow(mySprite3, 25)
    }
})
game.onUpdateInterval(500, function () {
    mySprite3.setVelocity(randint(-50, 50), randint(-50, 50))
})
