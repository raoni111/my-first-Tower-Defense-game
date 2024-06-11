import { KaboomCtx, Rect, Vec2 } from "kaboom";

export default class Staff {

    constructor(
        public readonly damage: number, 
        private readonly speed: number,
        private readonly _scale: number,
        private readonly k: KaboomCtx
    ) {}

    createBullet(playerPos: Vec2, mousePos: Vec2, angle: number) {
        const {
            sprite,
            pos,
            move,
            scale,
            rotate,
            area,
            anchor,
            rect,
            z,
        } = this.k  

        const bullet = this.k.add([
            'bullet',
            sprite('bullet'),
            scale(this._scale),
            pos(playerPos.sub(this.k.vec2(-35, -35))),
            move(this.k.mousePos().sub(playerPos), this.speed),
            rotate(angle + 90),
            area(),
            z(2),
        ]);

        const bulletCollision = this.k.add([
            'bullet-collision',
            rect(30, 20),
            pos(playerPos.sub(this.k.vec2(-35, -35))),
            move(this.k.mousePos().sub(playerPos), this.speed),
            rotate(angle + 90),
            area(),
            z(-1),
        ])

        bullet.play('fire');

        bullet.onUpdate(() => {
            if (bullet.pos.x > window.innerWidth || bullet.pos.x < 0 || bullet.pos.y > window.innerHeight || bullet.pos.y < 0) {
                bullet.destroy();
            }
        });
    }
    shoot(playerPos: Vec2) {
        const mousePos = this.k.mousePos().sub(playerPos.sub(this.k.vec2(-40, -35)));

        const radio = Math.atan2(mousePos.y, mousePos.x);

        const angle = radio * 180 / Math.PI


        this.createBullet(playerPos, mousePos, angle);

        this.k.play('fire-staff', {
            volume: 0.1        });
    }
}