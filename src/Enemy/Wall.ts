import { Enemy } from "./Enemy";
import { Sniper } from "./Sniper";

//廃墟クラス
export class Wall extends Enemy {
	constructor(base: g.E) {
		super(base);

		this.order = 9;

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
		const snipers: Sniper[] = [];
		snipers[0] = new Sniper(base, this.x + 150, this.y + 230);
		snipers[1] = new Sniper(base, this.x + 430, this.y + 230);

		this.onUpdate.add(() => {
			for (let i = 0; i < snipers.length; i++){
				if (g.game.random.get(0, 100) === 0 && snipers[i].life <= 0) {
					snipers[i] = new Sniper(base, this.x + 150 + (280 * i), this.y + 230);
				}
			};
		});

		this.speed = 2;
	}
}
