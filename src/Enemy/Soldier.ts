import { Enemy } from "./Enemy";
//ソルジャークラス
export class Soldier extends Enemy {
	constructor(base: g.E) {
		super(base);

		this.order = 1;

		this.y = g.game.random.get(400, 550);
		this.modified();

		const scene = g.game.scene();

		this.score = 200;
		this.life = 30;

		const spr = new g.FrameSprite({
			scene: scene,
			x: 0,
			y: 0,
			width: 128,
			height: 128,
			src: g.game.scene().asset.getImageById("soldier"),
			parent: this,
			frames: [0, 2, 1, 2],
			frameNumber: 0,
			interval: 100,
		});
		spr.start();

		this.sprImage = spr;

		const sprDie = new g.FrameSprite({
			scene: scene,
			x: 0,
			y: 0,
			width: 128,
			height: 128,
			src: g.game.scene().asset.getImageById("soldier"),
			parent: this,
			frames: [3, 4, 5],
			frameNumber: 0,
			interval: 200,
			loop: false,
		});
		sprDie.hide();

		this.sprImageDie = sprDie;

		this.collisionArea = new g.FilledRect({
			scene: scene,
			x: 16,
			y: 16,
			width: 96,
			height: 96,
			cssColor: "yellow",
			opacity: this.op,
			parent: this,
		});

		this.die = () => {
			sprDie.start();
			this.speed = 2;
			this.scene.playSound("guaa");
		};

		this.speed = g.game.random.get(4, 8);
	}
}
