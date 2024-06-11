import { GameObj, KaboomCtx } from "kaboom";

export default class Castle {
    private readonly _ctx: GameObj;
    private readonly _collision: GameObj;
    private readonly lifeElement: GameObj;

    private life: number = 100;

    constructor(
        private readonly scale: number,
        private readonly k: KaboomCtx,
    ) {

        const {
            sprite,
            center,
            anchor,
            body,
            area,
            z,
            rect,
            health,
            color,
        } = this.k;

        this._ctx = k.add(
            [
                sprite('castle'),
                k.pos(center()),
                k.scale(this.scale),
                anchor('center'),
                health(this.life),
                z(2),
            ]
        );

        this._collision = k.add([
            'collision',
            k.pos(center().x - 50, center().y + 50),
            rect(100, 71),
            area(),
                body({
                    isStatic: true,
                }),
            z(0),
        ]);

        this.lifeElement = k.add([
            rect(this.life, 10),
            k.pos(center().x - 50, center().y - 120),
            color(220, 20, 60),
            z(2),
        ])

        this.ctx.play('idle');
    }

    hit() {
        if (this.life === 0) {
            return;
        }

        this.life -= 2;
        this.lifeElement.scale = this.k.vec2(this.life / 100, 1);
    }

    get ctx() {
        return this._ctx;
    }

    get collision() {
        return this._collision;
    }

    get pos() {
        return this.ctx.pos;
    }
}