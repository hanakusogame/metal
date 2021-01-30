import { MainScene } from "../MainScene";
import { Enemy } from "./Enemy";
//スナイパークラス
export class Sniper extends Enemy {
	constructor(base: g.E, x: number, y: number) {
		super(base);

		this.order = 8;

		this.x = x;
		this.y = y;
		this.modified();

		const scene = g.game.scene() as MainScene;

		this.score = 300;
		this.life = 30;

		const spr = new g.FrameSprite({
			scene: scene,
			x: 0,
			y: 0,
			width: 128,
			height: 128,
			src: g.game.scene().asset.getImageById("sniper"),
			parent: this,
			frames: [0],
			frameNumber: 0,
		});

		const effect = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("effect2"),
			x: -30,
			y: 100,
			width: 50,
			height: 50,
			srcX: 50,
			angle: -45,
			parent: this,
		});
		effect.hide();

		this.sprImage = spr;

		const posDieY = 450 + g.game.random.get(0, 100);

		let yy = -20;

		this.onUpdate.add(() => {
			if (this.life <= 0) {
				if (this.y < posDieY) {
					yy += 2;
					this.y += yy;
				}
			} else {
				if (g.game.random.get(0, 20) === 0) {
					//攻撃
					effect.show();
					scene.setTimeout(() => {
						effect.hide();
					}, 100);
					scene.playSound("se_shot2");
				}
			}
			this.modified();
		});

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
			this.scene.playSound("guaa");
			effect.hide();
		};

		this.speed = 2;
	}
}
