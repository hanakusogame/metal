import { Enemy } from "./Enemy";
//戦闘機クラス
export class Fighter extends Enemy {
	constructor(base: g.E) {
		super(base);
		this.order = 0;

		this.y = g.game.random.get(-250, -100);
		this.modified();

		this.score = 2000;
		this.life = 80;

		const scene = g.game.scene();
		this.sprImage = new g.Sprite({
			scene: scene,
			x: 0,
			y: 0,
			src: g.game.scene().asset.getImageById("fighter"),
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
			x: 200,
			y: 200,
			width: 250,
			height: 120,
			cssColor: "yellow",
			opacity: this.op,
			parent: this,
		});

		let yy = 5;

		this.onUpdate.add(() => {
			if (this.life <= 0) {
				this.y += 20;
			} else {
				yy -= 0.2;
				this.y += yy;
				this.angle += 0.2;
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
			this.scene.playSound("bomb");
		};

		this.speed = g.game.random.get(24, 32);
	}
}
