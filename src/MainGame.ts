import { Enemy } from "./Enemy/Enemy";
import { Fighter } from "./Enemy/Fighter";
import { Soldier } from "./Enemy/Soldier";
import { Tank } from "./Enemy/Tank";
import { Wall } from "./Enemy/Wall";
import { Zero } from "./Enemy/Zero";
import { MainScene } from "./MainScene";
import { Player } from "./Player";
//ゲームクラス
export class MainGame extends g.E {
	constructor() {
		const scene = g.game.scene() as MainScene;
		super({ scene: scene, width: g.game.width, height: g.game.height, touchable: true });

		//背景
		const bgBase = new g.E({
			scene: scene,
			scaleX: 3,
			scaleY: 3,
			parent: this,
		});

		for (let i = 0; i < 3; i++) {
			new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("bg"),
				x: 640 * i,
				y: 0,
				parent: bgBase,
			});
		}

		//地面を生成
		const floorSize = 256;
		let collisionFloor: g.FilledRect;
		for (let i = 0; i < 7; i++) {
			const floor = new g.FilledRect({
				scene: scene,
				x: floorSize * i,
				y: g.game.height - 128 + g.game.random.get(0, 50),
				width: floorSize,
				height: 128,
				cssColor: "white",
				parent: this,
			});

			new g.Sprite({
				scene: scene,
				x: 0,
				y: -128,
				width: floorSize,
				height: 512,
				src: scene.asset.getImageById("floor"),
				parent: floor,
			});

			floor.onUpdate.add(() => {
				floor.x -= 2;
				if (floor.x <= -floorSize) {
					floor.x = g.game.width + floorSize;
				}
				const cx = player.x + player.width / 2; //中央
				if (floor.x < cx && floor.x + floorSize > cx) {
					collisionFloor = floor;
				}
				floor.modified();
			});
		}

		//敵設置用エンティティ
		const enemyBase = new g.E({ scene: scene, parent: this });

		// プレイヤーを生成
		const player = new Player(this);

		player.onUpdate.add(() => {
			player.y += 16;
			if (collisionFloor && player.y > collisionFloor.y - player.height) {
				player.y = collisionFloor.y - player.height;
			}
		});

		let isPush = false; //タッチされているか
		let radian = 0; //ショットの角度

		// 攻撃風エフェクト
		const effect = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("effect2"),
			width: 50,
			height: 50,
			srcY: 50,
			scaleX: 2,
			scaleY:2,
			parent: this,
		});
		effect.hide();

		//角度取得
		const setAngle = (x: number, y: number): void => {
			const px = player.x + player.width / 2;
			const py = player.y + player.height / 2;
			radian = Math.atan2(y - py, x - px);
		};

		//タッチイベント
		this.onPointDown.add((e) => {
			isPush = true;
			setAngle(e.point.x, e.point.y);
		});

		this.onPointMove.add((e) => {
			setAngle(e.point.x + e.startDelta.x, e.point.y + e.startDelta.y);
		});

		this.onPointUp.add((e) => {
			isPush = false;
			setAngle(e.point.x + e.startDelta.x, e.point.y + e.startDelta.y);
		});

		//メインループ
		let loopCnt = 0;
		this.onUpdate.add(() => {
			bgBase.x -= 1;
			bgBase.modified();

			player.werpon.angle = (radian * 180) / Math.PI;
			player.werpon.modified();

			if (loopCnt % 4 === 0 && isPush && scene.isStart) {
				//ショットを生成
				const shot = new g.Sprite({
					scene: scene,
					x: player.x + player.width / 2 - (loopCnt % 8) * 5,
					y: player.y + player.height / 2 - (loopCnt % 8) * 5,
					src: scene.asset.getImageById("shot"),
					angle: (radian * 180) / Math.PI,
					anchorX: 0.5,
					anchorY: 0.5,
					parent: this,
				});

				//移動量算出
				const speed = 50;
				const mx = speed * Math.cos(radian);
				const my = speed * Math.sin(radian);

				//移動
				shot.x += mx * 4;
				shot.y += my * 4;
				shot.modified();

				shot.onUpdate.add(() => {
					//移動
					shot.x += mx;
					shot.y += my;
					shot.modified();

					let isDelete = false;

					//画面外に出たら削除
					if (
						shot.x + shot.width < 0 ||
						shot.y + shot.width < 0 ||
						shot.x - shot.width > g.game.width ||
						shot.y - shot.width > g.game.height
					) {
						isDelete = true;
					}

					//敵との当たり判定
					enemyBase.children.forEach((e) => {
						const enemy = e as Enemy;
						if (enemy.collision(shot)) {
							enemy.setDamage(10);
							isDelete = true;
						}
					});

					if (isDelete) {
						shot.destroy();
					}
				});

				scene.playSound("se_shot");
			}

			if (loopCnt % 60 === 0) {
				//敵を生成
				const listEnemy: typeof Enemy[] = [Fighter, Tank, Soldier, Zero];
				const num = g.game.random.get(0, listEnemy.length - 1);
				new listEnemy[num](enemyBase);
			}

			if (loopCnt % 900 === 0) {
				new Wall(enemyBase);
			}

			//並べ替え
			enemyBase.children.sort((a, b) => {
				const aa = a as Enemy;
				const bb = b as Enemy;
				return aa.order * -10000 + aa.y + aa.sprImage.height - (bb.order * -10000 + bb.y + bb.sprImage.height);
			});

			//エフェクト表示
			if (g.game.random.get(0, 30) === 0) {
				effect.x = g.game.random.get(0, 300);
				effect.y = g.game.random.get(500, 640);
				effect.modified();
				effect.show();
				scene.setTimeout(() => {
					effect.hide();
				}, 100);
			}

			loopCnt++;
		});
	}
}
