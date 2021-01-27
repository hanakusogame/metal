import { Enemy } from "./Enemy";
//戦車クラス
export class Tank extends Enemy {
	constructor(base: g.E) {
		super(base);

		this.order = 1;

		this.y = g.game.random.get(0, 230);
		this.modified();

		this.score = 1500;
		this.life = 200;

		const scene = g.game.scene();

		//画像
		this.sprImage = new g.Sprite({
			scene: scene,
			x: 0,
			y: 0,
			src: g.game.scene().asset.getImageById("tank"),
			parent: this,
		});

		//壊れた時の画像
		this.sprImageDie = new g.Sprite({
			scene: scene,
			x: 0,
			y: 0,
			src: g.game.scene().asset.getImageById("tank2"),
			parent: this,
		});
		this.sprImageDie.hide();

		//当たり判定用
		this.collisionArea = new g.FilledRect({
			scene: scene,
			x: 350,
			y: 200,
			width: 250,
			height: 120,
			cssColor: "yellow",
			opacity: this.op,
			parent: this,
		});

		this.die = () => {
			for (let i = 0; i < 3; i++) {
				const effect = new g.FrameSprite({
					scene: scene,
					src: scene.asset.getImageById("effect"),
					parent: this,
					x: 200 * i,
					y: -300 + g.game.random.get(0, 200),
					width: 128,
					height: 256,
					frames: [0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 8, 9],
					frameNumber: 0,
					loop: false,
					interval: 150,
					scaleX: 3,
					scaleY: 3,
				});
				effect.start();

				scene.setTimeout(() => {
					effect.frames = [8, 9];
					effect.loop = true;
					effect.interval = 500;
					effect.frameNumber = 0;
					effect.start();
				}, 1800);
			}

			this.speed = 2;
		};

		this.speed = g.game.random.get(3, 5);
	}
}
