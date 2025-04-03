import { standingRight, jumpOn, jumpDown, running, circleBall, sitOnGround, rolling, diving } from "./State.js";
import { Collision } from './Collison_final.js';
import { FloatScore } from './accScore.js';
const dogImage = new Image();
dogImage.src = 'image/shadow_dog.png';
export class Player { //角色类
	constructor(game) {
		this.game = game;
		this.width = 100;
		this.height = 91.3;
		this.frameWidth = 6876 / 12;
		this.frameHeight = 523;
		this.x = 0;
		this.y = this.game.height - this.height - this.game.playerMargin;
		this.Image = dogImage;
		this.frameX = 0;
		this.maxFrameX = 5;
		this.frameY = 3;
		this.frameSpeed = 1;
		this.weight = 3;
		this.vx = 10;
		this.vy = 0;
		this.maxSpeed = 30;
		//动画的帧数
		this.fps = 180;
		this.frameTimer = 0;
		this.frameInterval = 1000 / this.fps;
		//设置player的动作状态
		this.states = [new standingRight(this), new jumpOn(this), new jumpDown(this), new running(this),
			new circleBall(this), new sitOnGround(this), new rolling(this), new diving(this)
		];
		this.currentState = this.states[3];
		this.rect = false;
	}
	draw(context) {
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		if (this.rect) context.strokeRect(this.x, this.y, this.width, this.height);
		// context.fillRect(this.x,this.y,this.width,this.height);
		context.drawImage(this.Image, this.frameX * this.frameWidth, this.frameY * this.frameHeight, this
			.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
	}
	isOnGround() {
		return this.y >= (this.game.height - this.height - this.game.playerMargin);
	}
	update(keysArray, deltaTime) {
		//console.log(this.isOnGround());
		this.currentState.handleInput(keysArray);
		if (this.x < 0) this.x = 0;
		if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
		if (keysArray.includes('a') && this.currentState != this.states[4]) this.x -= this.vx;
		if (keysArray.includes('d') && this.currentState != this.states[4]) this.x += this.vx;
		//跳跃
		this.y += this.vy
		if (this.y >= this.game.height - this.height - this.game.playerMargin) this.y = this.game.height - this
			.height - this.game.playerMargin;
		if (!this.isOnGround()) this.vy += this.weight
		else this.vy = 0
		//设置动画帧数
		if (this.frameTimer >= this.frameInterval) {
			this.frameTimer = 0;
			this.frameX++;
			this.frameX = this.frameX > this.maxFrameX ? 0 : this.frameX;
		} else {
			this.frameTimer++;
		}
	}
	changeState(state) {
		this.currentState = this.states[state];
		//console.log(this.currentState);
		this.currentState.setFrame();
	}
	isCollision(enemies) {
		enemies.forEach((value, index) => {
			if (this.x + this.width >= value.x &&
				this.y + this.height >= value.y &&
				this.y <= value.y + this.height &&
				this.x <= value.x + this.width) {
				if (this.currentState === this.states[6] || this.currentState === this.states[7]) {
					enemies.splice(index, 1);
					this.game.score++;
					this.game.floatScores.push(new FloatScore(value.x, value.y, 140, 50));
					this.game.collisons.push(new Collision(this.game, value.x, value.y));
				} else {
					this.game.collisons.push(new Collision(this.game, value.x, value.y));
					enemies.splice(index, 1);
					this.game.liveNumber--;
					if (this.game.liveNumber === 0) this.game.gameOver = true;
					this.changeState(4);
				}
			}
		});
	}
};