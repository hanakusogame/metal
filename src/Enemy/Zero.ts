import { Enemy } from "./Enemy";
//零戦クラス
export class Zero extends Enemy {
	constructor(base: g.E) {
		super(base);

		this.order = 0;

		this.y = g.game.random.get(-100, 250);
		this.modified();

		this.speed = g.game.random.get(15, 30);

		this.score = 1000;
		this.life = 80;

		const scene = g.game.scene();
		this.sprImage = new g.Sprite({
			scene: scene,
			x: 0,
			y: 0,
			src: g.game.scene().asset.getImageById("zero"),
			parent: this,
		});

		this.sprImageDie = new g.Sprite({
			scene: scene,
			x: 0,
			y: 0,
			src: g.game.scene().asset.getImageById("fighter2"),
			parent: this,
		});
		this.sprImageDie.hide();

		this.collisionArea = new g.FilledRect({
			scene: scene,
			x: 150,
			y: 50,
			width: 150,
			height: 120,
			cssColor: "yellow",
			opacity: this.op,
			parent: this,
		});

		this.onUpdate.add(() => {
			if (this.life <= 0) {
				this.y += 20;
			}
			this.modified();
		});

		this.die = () => {
			for (let i = 0; i < 3; i++) {
				const effect = new g.FrameSprite({
					scene: scene,
					src: scene.asset.getImageById("effect"),
					parent: this,
					x: 200 * i,
					y: -200 + g.game.random.get(0, 200),
					width: 128,
					height: 256,
					frames: [0, 1, 2, 3, 4, 5, 6, 6, 7],
					frameNumber: 0,
					loop: false,
					interval: 100,
					scaleX: 3,
					scaleY: 3,
				});
				effect.start();
			}

			this.speed = this.speed / 2;
		};

	}
}
