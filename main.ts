namespace SpriteKind {
    export const droid = SpriteKind.create()
    export const collectable = SpriteKind.create()
    export const mine = SpriteKind.create()
    export const chain = SpriteKind.create()
    export const decoy = SpriteKind.create()
}
namespace StatusBarKind {
    export const charge = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.chain, function (sprite, otherSprite) {
    projectile4 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . c b . . . . . . . 
        . . . . . . b c b . . . . . . . 
        . . b b b b b b b b . . . . . . 
        . . . b c c b . b c c b . . . . 
        . . . . b b b b b b b b b . . . 
        . . . . . . b c b . . . . . . . 
        . . . . . . b c . . . . . . . . 
        . . . . . . b b . . . . . . . . 
        . . . . . . b . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, otherSprite, sprite.vx + 5, sprite.vy + 5)
    sprites.destroy(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (move_allowed == true) {
        for (let index = 0; index < A_move; index++) {
            projectile5 = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . 2 . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . 4 2 . . . . . . . 
                . . . . . . 2 4 2 . . . . . . . 
                . . 2 2 2 2 5 5 5 2 . . . . . . 
                . . . 2 4 4 5 . 5 4 4 2 . . . . 
                . . . . 2 2 5 5 5 2 2 2 2 . . . 
                . . . . . . 2 4 2 . . . . . . . 
                . . . . . . 2 4 . . . . . . . . 
                . . . . . . 2 2 . . . . . . . . 
                . . . . . . 2 . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, randint(-50, 50), randint(-50, 50))
            statusbar.value += -1
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    statusbar.value += -1
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . c b . . . . . . . 
        . . . . . . b c b . . . . . . . 
        . . b b b b b b b b . . . . . . 
        . . . b c c b . b c c b . . . . 
        . . . . b b b b b b b b b . . . 
        . . . . . . b c b . . . . . . . 
        . . . . . . b c . . . . . . . . 
        . . . . . . b b . . . . . . . . 
        . . . . . . b . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, randint(-100, 100), randint(-100, 100))
    tiles.placeOnRandomTile(projectile2, sprites.castle.tilePath5)
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
            . . b b b b b b b b . . . . . . 
            . . . b c c b . b c c b . . . . 
            . . . . b b b b b b b b b . . . 
            . . . . . . b c b . . . . . . . 
            . . . . . . b c . . . . . . . . 
            . . . . . . b b . . . . . . . . 
            . . . . . . b . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, randint(-50, 50), randint(-50, 50))
        statusbar.value += -1
        pause(randint(0, 1))
    }
}
info.onLifeZero(function () {
    if (smoke_bomb == true) {
        tiles.placeOnRandomTile(mySprite, sprites.castle.tilePath5)
        smoke_bomb = false
        info.setLife(5)
    } else if (smoke_bomb == false) {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.droid, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    amount_of_defeated_troops += 1
    info.changeScoreBy(1)
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 100, function (status) {
    move_allowed = true
})
function choose_round () {
    console.logValue("defeated", amount_of_defeated_troops)
    if (amount_of_defeated_troops == 0) {
        round = 1
        info.setLife(5)
        mySprite.setImage(img`
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . 1 1 1 f f 1 1 1 . . . . 
            . . . 1 1 1 f f f f 1 1 1 . . . 
            . . 1 1 1 f f f f f f 1 1 1 . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . 1 f f f f f f f f f f 1 . . 
            . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
            . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
            . . 1 f f f f 1 1 f f f f 1 . . 
            . . . 1 f f f 1 1 f f f 1 . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    } else if (amount_of_defeated_troops == 10) {
        round = 2
        info.setLife(5)
        mySprite.setImage(img`
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . 1 1 1 f f 1 1 1 . . . . 
            . . . 1 1 1 f f f f 1 1 1 . . . 
            . . 1 1 1 f f f f f f 1 1 1 . . 
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . 1 f f f f f f f f f f 1 . . 
            . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
            . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
            . . 1 f f f f 1 1 f f f f 1 . . 
            . . . 1 f f f 1 1 f f f 1 . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . . . . 5 5 5 5 5 5 . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    } else if (amount_of_defeated_troops == 20) {
        round = 3
        info.setLife(5)
        mySprite.setImage(img`
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . 1 1 1 f f 1 1 1 . . . . 
            . . . 1 1 1 f f f f 1 1 1 . . . 
            . . 1 1 1 f f f f f f 1 1 1 . . 
            . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
            . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
            . . 1 f f f f f f f f f f 1 . . 
            . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
            . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
            . . 1 f f f f 1 1 f f f f 1 . . 
            . . . 1 f f f 1 1 f f f 1 . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    } else if (amount_of_defeated_troops == 30) {
        round = 4
        info.setLife(5)
        mySprite.setImage(img`
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . 1 1 1 f f 1 1 1 . . . . 
            . . . 1 1 1 f f f f 1 1 1 . . . 
            . . 1 1 1 f f f f f f 1 1 1 . . 
            . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
            . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
            . . 1 f f f f f f f f f f 1 . . 
            . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
            . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
            . . 1 f f f f 1 1 f f f f 1 . . 
            . . . 1 f f f 1 1 f f f 1 . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . . . . 6 6 6 6 6 6 . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        amount_of_troops = 0
    } else if (amount_of_defeated_troops == 40) {
        round = 5
        info.setLife(5)
        mySprite.setImage(img`
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . 1 1 1 f f 1 1 1 . . . . 
            . . . 1 1 1 f f f f 1 1 1 . . . 
            . . 1 1 1 f f f f f f 1 1 1 . . 
            . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
            . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
            . . 1 f f f f f f f f f f 1 . . 
            . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
            . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
            . . 1 f f f f 1 1 f f f f 1 . . 
            . . . 1 f f f 1 1 f f f 1 . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . . . . 9 9 9 9 9 9 . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    } else if (amount_of_defeated_troops == 50) {
        round = 6
        info.setLife(5)
        mySprite.setImage(img`
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . 1 1 1 f f 1 1 1 . . . . 
            . . . 1 1 1 f f f f 1 1 1 . . . 
            . . 1 1 1 f f f f f f 1 1 1 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 1 f f f f f f f f f f 1 . . 
            . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
            . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
            . . 1 f f f f 1 1 f f f f 1 . . 
            . . . 1 f f f 1 1 f f f 1 . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . f f 1 f f f f f f 1 f f . . 
            . . . . . 7 7 7 7 7 7 . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    }
    return round
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.decoy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (mySprite2) {
        mySprite3.follow(mySprite2)
        pause(15000)
        mySprite3.follow(mySprite)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.chain, function (sprite, otherSprite) {
    sprite.setVelocity(otherSprite.vx, otherSprite.vy)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    move_allowed = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.droid, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    amount_of_defeated_troops += 1
    info.changeLifeBy(-1)
    info.changeScoreBy(1)
    sprite.setVelocity(otherSprite.vx, otherSprite.vy)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (move_allowed == true) {
        wave()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.collectable, function (sprite, otherSprite) {
    B_move += 10
    A_move += 1
    sprites.destroy(otherSprite)
    smoke_bomb = true
})
let mySprite4: Sprite = null
let mySprite5: Sprite = null
let mySprite2: Sprite = null
let round = 0
let projectile: Sprite = null
let projectile2: Sprite = null
let projectile5: Sprite = null
let projectile4: Sprite = null
let smoke_bomb = false
let amount_of_defeated_troops = 0
let amount_of_troops = 0
let B_move = 0
let A_move = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let move_allowed = false
let mySprite3: Sprite = null
mySprite3 = sprites.create(img`
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
let mySprite7 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    4 4 . . 4 4 . . 4 4 . . 4 . . . 
    4 . 4 . 4 . . 4 . . . 4 . 4 . . 
    4 . 4 . 4 4 . 4 . . . 4 . 4 . . 
    4 . 4 . 4 . . 4 . . . 4 . 4 . . 
    4 4 . . 4 4 . . 4 4 . . 4 . . . 
    . . . . . . . . . . . . . . . . 
    . . 4 . 4 . . . . . . . . . . . 
    . . . 4 . . . . . . . . . . . . 
    . . . 4 . . . . . . . . . . . . 
    `, SpriteKind.decoy)
mySprite3.setVelocity(randint(-50, 50), randint(-50, 50))
move_allowed = true
mySprite = sprites.create(img`
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . 1 1 1 f f 1 1 1 . . . . 
    . . . 1 1 1 f f f f 1 1 1 . . . 
    . . 1 1 1 f f f f f f 1 1 1 . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . 1 1 f 1 1 1 1 1 1 1 1 f 1 1 . 
    . 1 f f 1 1 1 1 1 1 1 1 f f 1 . 
    . . 1 f f f f 1 1 f f f f 1 . . 
    . . . 1 f f f 1 1 f f f 1 . . . 
    . . f f 1 1 1 1 1 1 1 1 f f . . 
    . . f f 1 f f f f f f 1 f f . . 
    . . f f 1 f f f f f f 1 f f . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(mySprite, sprites.castle.tilePath5)
if (mySprite && mySprite3) {
    mySprite3.follow(mySprite, 25)
}
tiles.setCurrentTilemap(tilemap`level2`)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.setBarSize(4, 100)
statusbar.positionDirection(CollisionDirection.Left)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
A_move = 5
B_move = 200
amount_of_troops = 0
amount_of_defeated_troops = 0
smoke_bomb = true
info.setLife(5)
game.onUpdateInterval(100, function () {
    mySprite5 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . b b b b b b b b . . . . . . 
        . . . b c c b . b c c b . . . . 
        . . . . b b b b b b b b b . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.chain)
    tiles.placeOnRandomTile(mySprite5, assets.tile`myTile10`)
    if (mySprite5 && mySprite3) {
        mySprite5.follow(mySprite3, 25)
    }
})
game.onUpdateInterval(500, function () {
    statusbar.value += 5
})
game.onUpdateInterval(10000, function () {
    mySprite4 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 8 . . . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . . 6 8 . . . . . . . 
        . . . . . . 8 6 8 . . . . . . . 
        . . . . . 8 9 9 9 8 . . . . . . 
        . . . 8 6 6 9 . 9 6 6 8 . . . . 
        . . 8 8 8 8 9 9 9 8 8 8 8 . . . 
        . . . . . . 8 6 8 . . . . . . . 
        . . . . . . 8 6 . . . . . . . . 
        . . . . . . 8 8 . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.collectable)
    tiles.placeOnRandomTile(mySprite4, sprites.castle.tilePath5)
})
game.onUpdateInterval(2000, function () {
    choose_round()
    console.log("round " + choose_round())
    if (choose_round() == 1) {
        console.log("Amount of troops " + amount_of_troops)
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
                . . f c c c c b b c c c c f . . 
                . . c c c c c b b c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else if (choose_round() == 2) {
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
                . . f c c c c 2 2 c c c c f . . 
                . . c c c c c 2 2 c c c c c . . 
                . . . . . c c c c c c . . . . . 
                . . . . . c c . . c c . . . . . 
                `, SpriteKind.droid)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
            amount_of_troops += 1
        }
    } else if (choose_round() == 3) {
        if (amount_of_troops < 30) {
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
        if (amount_of_troops < 40) {
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
            c c c c c c c c c c c c c c c c 
            . . c c c c c b b c c c c c . . 
            . . c c c c c b b c c c c c . . 
            . . . . . c c c c c c . . . . . 
            . . . . . c c . . c c . . . . . 
            `, SpriteKind.droid)
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile5`)
        amount_of_troops += 1
    }
    if (mySprite2 && mySprite3) {
        mySprite2.follow(mySprite3, 25)
    }
})
