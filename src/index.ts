import kaboom from 'kaboom';
import Player from './class/player';
import Castle from './class/castle';
import Enemy from './class/enemy';
import Staff from './class/staff';
import Coin from './class/coin';

import {defaultMap} from './map';

import {
    playerAtlas,
    overWorldTile,
    castle,
    cercaD,
    cercaW,
    road,
    slime,
    bullet,
    target,
    coinSpriteAtlas,
} from './atlas/atlas';

import './style.scss';

const k = kaboom(
    {
        background: [128, 128, 128],
    }
);

const {
    loadSprite,
    loadSpriteAtlas,
    addLevel,
    sprite,
    scale,
    body,
    area,
    loadSound,
    pos,
    center,
    anchor,
    z,
} = k;

loadSpriteAtlas('./sprites/coin/coin_gold.png', coinSpriteAtlas)
loadSpriteAtlas('./sprites/player.png', playerAtlas);
loadSpriteAtlas('./sprites/overworld_tiles.png', overWorldTile);
loadSpriteAtlas('./sprites/castle.png', castle);
loadSpriteAtlas('./sprites/cerca-d.png', cercaD);
loadSpriteAtlas('./sprites/cerca-w.png', cercaW);
loadSpriteAtlas('./sprites/road.png', road);
loadSpriteAtlas('./sprites/enemy/slime/slime.png', slime);
loadSpriteAtlas('./sprites/bullet.png', bullet);


loadSound('fire-staff', '/sound/fire-staff-1.mp3');
loadSound('slime-death', '/sound/slime-death.mp3');
loadSound('coin-sound', '/sound/coin-sound.mp3')

const playerPos = {
    x: 100,
    y: 100,
}


const staff = new Staff(10, 500, 4, k);

const player = new Player(playerPos, 4, 2, k, staff);

const coinObj = new Coin(3, k);

const castleObj = new Castle(2, k);



setInterval(() => {
    const enemyPos = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
    }
    const enemy = new Enemy(enemyPos, 2, 0.001, k, coinObj);

    enemy.ctx.onUpdate(() => {
        enemy.move(k.center())

        enemy.collision.onCollide('collision', () => {
            enemy.death(false).then((value) => {
                if (value) {
                    castleObj.hit();
                }
            });
        });

        enemy.collision.onCollide('bullet-collision', () => {

            enemy.hit(0.1);
        })
    });
}, 2);

k.onUpdate(() => {
    player.playerMovimente();
});




addLevel(defaultMap, {
    tileHeight: 60,
    tileWidth: 60,
    tiles: {
        " ": () => [
            sprite('gram', {
                frame: 0,
            }),
            scale(2),
            z(0),
        ],
        "1": () => [
            sprite('gram', {
                frame: 1,
            }),
            scale(2),
            z(0),
        ],
        "2": () => [
            sprite('gram', {
                frame: 2,
            }),
            scale(2),
            z(0),
        ],
        "3": () => [
            sprite('gram', {
                frame: 3,
            }),
            scale(2),
            z(0),
        ],
        "4": () => [
            sprite('gram', {
                frame: 4,
            }),
            scale(2),
            z(0),
        ],
        "5": () => [
            sprite('gram', {
                frame: 5,
            }),
            scale(2),
            z(0),
        ],
        "6": () => [
            sprite('gram', {
                frame: 6,
            }),
            scale(2),
            z(0),
        ],
        "7": () => [
            sprite('gram', {
                frame: 7,
            }),
            scale(2),
            z(0),
        ],
        "8": () => [
            sprite('gram', {
                frame: 8,
            }),
            scale(2),
            z(0),
        ],
        "9": () => [
            sprite('gram', {
                frame: 9,
            }),
            scale(2),
            z(0),
        ],
        "a": () => [
            sprite('gram', {
                frame: 10,
            }),
            scale(2),
            z(0),
        ],
        "b": () => [
            sprite('gram', {
                frame: 11,
            }),
            scale(2),
            z(0),
        ],
        "c": () => [
            sprite('gram', {
                frame: 12,
            }),
            scale(2),
            z(0),
        ],
        "w": () => [
            sprite('cercaW', {
                frame: 0,
            }),
            scale(2),
            area(),
            body({
                isStatic: true,
            }),
            z(0),
        ],
        'r': () => [
            sprite('road', {
                frame: 0,
            }),
            scale(2),
            z(0),
        ],
        't': () => [
            sprite('road', {
                frame: 1,
            }),
            scale(2),
            z(0),
        ],
        'u': () => [
            sprite('road', {
                frame: 2,
            }),
            scale(2),
            z(0),
        ],
    }
})