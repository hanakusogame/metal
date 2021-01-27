import { MainScene } from "../MainScene";

//敵クラス
export class Enemy extends g.E {
	public sprImage: g.E;
	public sprImageDie: g.E;
	public collisionArea: g.FilledRect;
	public die: () => void;
	public readonly op = 0;
	public score = 200;
	protected life = 100;
	protected speed = 10;

	constructor(base: g.E) {
		super({
			scene: g.game.scene(),
			x: 2000,
			y: 0,
			parent: base,
		});

		this.speed = g.game.random.get(6, 12);

		this.die = () => {
			return;
		};

		this.onUpdate.add(() => {
			this.x -= this.speed;
			this.modified();
			if (this.x + this.sprImage.width < 0) {
				this.destroy();
			}
		});
	}

	//ダメージを与えられたとき
	public setDamage = (num: number): boolean => {
		this.life -= num;

		this.opacity = 0.5;
		this.modified();

		g.game.scene().setTimeout(() => {
			this.opacity = 1.0;
			this.modified();
		}, 10);

		if (this.life <= 0) {
			if (this.sprImageDie) {
				this.sprImage.hide();
				this.sprImageDie.show();

				this.die();
			} else {
				this.destroy();
			}

			(g.game.scene() as MainScene).addScore(this.score);
		}
		return this.life > 0;
	};

	//ショットとのあたり判定
	public collision = (shot: g.E): boolean => {
		if (this.life <= 0 || !this.collisionArea) return false;
		const c = this.collisionArea;
		const p = c.localToGlobal({ x: 0, y: 0 });
		return g.Collision.intersect(shot.x, shot.y, shot.width, shot.height, p.x, p.y, c.width, c.height);
	};
}
