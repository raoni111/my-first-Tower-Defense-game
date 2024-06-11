import { KaboomCtx, Vec2 } from "kaboom";
import randomNumber from "./services/randomNumber";
import Coin from "./coin";

export default class Enemy {
    private readonly _ctx;
    private readonly _collision;
    private readonly _lifeElement;
    private deathAnimation = false;

    private atractor: undefined | Vec2 = undefined;

    public life = 100;

    constructor(
        private readonly enemyPos: {x: number, y: number},
        private readonly enemyScale: number,
        private readonly speed: number,
        private readonly k: KaboomCtx,
        private readonly coinObj: Coin,
    ) {

        const {
            sprite,
            pos,
            scale,
            area,
            body,
            rect,
            color,
            anchor,
            health,
            z,
        } = this.k

        this._ctx = k.add([
            pos(this.enemyPos.x, this.enemyPos.y),
            sprite('slime'),
            scale(enemyScale),
            health(this.life),
            z(1)
        ]);

        this._collision= k.add([
            'enemy-collision',
            pos(this.enemyPos.x, this.enemyPos.y),
            scale(enemyScale),
            rect(10, 10),
            area(),
            body({
                mass: 0.1,
            }),
            anchor('center'),
            z(-1),
        ]);

        this._lifeElement = k.add([
            'ememy-life',
            pos(this.enemyPos.x, this.enemyPos.y),
            scale(enemyScale),
            color(220, 20, 60),
            rect((this.life / 100) * 50, 1),
            area(),
            anchor('center'),
            z(2),
        ]);

        this._ctx.play('walk')
    }

    get ctx() {
        return this._ctx;
    }

    get collision() {
        return this._collision;
    }

    hit(damage: number) {
        if (this.life <= 0) {
            this.death();
            return;
        }

        this.life -= damage;
        this._lifeElement.scale = this.k.vec2(this.life / 100, 2);
    }

    move(pos: Vec2): void {
        if (!this.atractor) {
            this.atractor = pos.sub(this._ctx.pos);
        }

        this._ctx.pos = this._ctx.pos.add(this.atractor.scale(this.speed));

        this._collision.pos = ((): Vec2 => {
            return this.k.vec2(this._ctx.pos.x + 50, this._ctx.pos.y + 50);
        })();

        this._lifeElement.pos = ((): Vec2 => {
            return this.k.vec2(this._ctx.pos.x + 50, this._ctx.pos.y + 20);
        })();
    }

    death(coin = true): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.deathAnimation) {
                this._ctx.play('death');

                // slime death sound
                this.k.play('slime-death', {
                    volume: 0.2,
                });
            
                setTimeout(() => {
                    const xy = this.k.vec2(
                        randomNumber(-50, 50),
                        randomNumber(-50, 50),
                    );
                    const xy1 = this.k.vec2(
                        randomNumber(-50, 50),
                        randomNumber(-50, 50),
                    );
                    const xy2 = this.k.vec2(
                        randomNumber(-50, 50),
                        randomNumber(-50, 50),
                    );
                    
                    if (coin) {
                        const random = randomNumber(0, 1);
                        const random2 = randomNumber(0, 1);

                        this.coinObj.addCoin(this._ctx.pos.add(xy));
                        if (random === 1) {
                            this.coinObj.addCoin(this._ctx.pos.add(xy1));
                            if (random2 === 1) {
                                this.coinObj.addCoin(this._ctx.pos.add(xy2));
                            }
                        }
                    }

                    this._ctx.destroy();
                    this._collision.destroy();
                    this._lifeElement.destroy()
                    resolve(true);
                
                }, 500);
            }
            this.deathAnimation = true;
        })

    }
}