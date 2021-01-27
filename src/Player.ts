import { MainGame } from "./MainGame";
//プレイヤークラス
export class Player extends g.FrameSprite {
	public werpon: g.FrameSprite;
	constructor(mainGame: MainGame) {
		const scene = mainGame.scene;
		super({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: 128,
			y: 128,
			width: 128,
			height: 128,
			frames: [0, 1, 0, 2],
			frameNumber: 0,
			interval: 100,
			parent: mainGame,
		});

		this.werpon = new g.FrameSprite({
			scene: scene,
			src: scene.asset.getImageById("werpon"),
			x: this.width/2,
			y: this.height/2,
			width: 128,
			height: 128,
			frames: [0, 1, 2],
			frameNumber: 0,
			interval: 100,
			parent: this,
			anchorX: 0.5,
			anchorY: 0.5,
		});

		this.start();
	}
}
