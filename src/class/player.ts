import { GameObj, KaboomCtx, PosComp, SpriteComp } from "kaboom";
import Staff from "./staff";

export default class Player {
    public readonly _ctx;
    public coins = 0;

    constructor(
        private readonly pos: {x: number, y: number},
        private readonly playerScale: number,
        private speed: number,
        private readonly k: KaboomCtx,
        private readonly staff: Staff,
    ) {

        const {
            sprite,
            add,
            scale,
            body,
            area,
            rect,
            circle,
            anchor,
            z,
        } = this.k;


        this._ctx = add([
            'player',
            this.k.pos(this.pos.x, this.pos.y),
            sprite('player'),
            scale(this.playerScale),
            area(),
            body({
                mass: 1,
            }),
            z(2),
        ]);

        this._ctx.onCollide('coin-main', (obj) => {
            obj.destroy();
            this.coins++;
            this.k.play('coin-sound', {
                volume: 0.2,
            });
        })

        this.playerClick();
    }

    public playerMovimente(): void {
        const {
            isKeyDown,
        } = this.k;

        const down = isKeyDown('s');
        const up = isKeyDown('w');
        const left = isKeyDown('a');
        const right = isKeyDown('d');

        const curlAnim = this._ctx.curAnim();


        if (right) {
            if (curlAnim !== 'run-right') {
                this._ctx.play('run-right');
            }

            this._ctx.pos.x += this.speed;
            return;
        }

        if (left) {
            if (curlAnim !== 'run-left') {
                this._ctx.play('run-left');
            }

            this._ctx.pos.x -= this.speed;
            return;

        }

        if (up) {
            if (curlAnim !== 'run-up') {
                this._ctx.play('run-up');
            }

            this._ctx.pos.y -= this.speed;
            return;
        }

        if (down) {
            if (curlAnim !== 'run-down') {
                this._ctx.play('run-down');
            }

            this._ctx.pos.y += this.speed;
            return;
        }

        if (!curlAnim) {
            return;
        }

        const direction = curlAnim.split('-').pop();

        this._ctx.play('idle-' + direction);
    }

    playerClick() {
        this.k.onClick(() => {
            this.staff.shoot(this._ctx.pos);
        })
    }
}