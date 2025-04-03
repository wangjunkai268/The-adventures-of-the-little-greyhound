const BGM = new Audio();
BGM.src = 'sound/bgm.wav';
export class backGround {
	constructor(image, game, width, height, speedModify) {
		this.image = image;
		this.game = game;
		this.width = width;
		this.height = height;
		this.speedModify = speedModify;
		this.x1 = 0;
		// this.x2 = this.game.width;
	}
	draw(context) {
		BGM.play();
		context.drawImage(this.image, 0, 0, this.width, this.height, this.x1, 0, this.game.width + 1, this.game
			.height);
		context.drawImage(this.image, 0, 0, this.width, this.height, this.x1 + this.game.width, 0, this.game.width,
			this.game.height);
	}
	update() {
		// this.x1 -= this.speedModify;
		// this.x2 -= this.speedModify;
		// if(this.x1 <= -this.game.width){
		// 	this.x1 = this.game.width;
		// }
		// if(this.x2 <= -this.game.width){
		// 	this.x2 = this.game.width; 
		// }
		if (this.x1 <= -this.game.width) this.x1 = 0;
		else this.x1 -= this.game.layerSpeed * this.game.layerSpeed;
	}
}