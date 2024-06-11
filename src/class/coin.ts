import { AnchorComp, AreaComp, BodyComp, GameObj, HealthComp, KaboomCtx, PosComp, RectComp, ScaleComp, SpriteComp, Vec2, ZComp } from "kaboom";
import Player from "./player";

export default class Coin {
    private _ctx: GameObj<PosComp | ScaleComp | ZComp | SpriteComp | AreaComp>;

    constructor(
        private readonly _scale: number,
        private readonly k: KaboomCtx,
    ) {
    }
    
    addCoin(_pos: Vec2) {
        const { 
            sprite,
            scale,
            pos,
            move,
            area,
            z,
        } = this.k; 

        this._ctx = this.k.add([
            'coin-main',
            pos(_pos),
            sprite('coin'),
            area(),
            scale(this._scale),
            z(1),
        ]);
        
        this._ctx.play('onCoin');
    }
}