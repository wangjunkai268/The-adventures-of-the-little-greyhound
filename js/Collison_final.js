const collison = new Image();
collison.src = 'image/boom.png';
//爆炸音效
 const boomAudio = new Audio();
 boomAudio.src = 'sound/boom.wav';
export class Collision{
	constructor(game,x,y){
		this.boomSound = boomAudio;
		this.game = game;
		this.image = collison;
		this.width = 200;
		this.height = 179;
		this.x = x;
		this.y = y;
		this.boomSound = boomAudio;
		this.boomArray = [];
		this.frame = 0;
		this.fps = 20;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
	}
	update(){
		if(this.frame === 0) this.boomSound.play();
		if(this.frameInterval % this.frameTimer === 0){
			 this.frame++;
			 this.frameTimer = 0;
		}
		else this.frameTimer++;
	}
	draw(context){
		context.drawImage(this.image,this.frame * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
	}
}