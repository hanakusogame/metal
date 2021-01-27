import { Enemy } from "./Enemy";
import { Sniper } from "./Sniper";

//廃墟クラス
export class Wall extends Enemy {
	constructor(base: g.E) {
		super(base);

		this.y = g.game.random.get(-50, 0);
		this.modified();

		this.score = 300;
		this.life = 200;

		const scene = g.game.scene();

		//画像
		this.sprImage = new g.Sprite({
			scene: scene,
			x: 0,
			y: 0,
			src: g.game.scene().asset.getImageById("wall"),
			parent: this,
		});

		//スナイパー設置
		new Sniper(base, this.x + 150, this.y + 230);

		new Sniper(base, this.x + 430, this.y + 230);

		this.speed = 2;
	}
}
