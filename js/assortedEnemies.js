export class enemy{
	constructor(){
		this.frameX = 0;
		this.fps = 120;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		this.rect = false;
	}
	draw(context,x,y,width,height){
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		if(this.rect) context.strokeRect(x,y,width,height);
	}
}


export class EnemyFly extends enemy{
	constructor(game,image){
		super();
		this.image = image;
		this.game = game;
		this.width = 60;
		this.height = 44;
		this.x = Math.random() * (game.width - this.width);
		this.y = Math.random() * 300;
		this.angle = 0.5;
		this.XmoveSpeed = 3;
		this.maxFrame = 5;
	}
	draw(context){
		super.draw(context,this.x,this.y,this.width,this.height);
		context.drawImage(this.image,this.frameX * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
	}
	update(){
		this.x -= this.XmoveSpeed;
		this.angle += 0.1;
		this.y += 2 * Math.sin(this.angle);
		if(this.frameTimer > this.frameInterval){
			this.frameTimer = 0;
			this.frameX++;
			this.frameX = this.frameX > this.maxFrame ? 0 : this.frameX;
		}else{
			this.frameTimer++;
		}
	}
}

export class EnemyOnGround extends enemy{
	constructor(game,image){
		super();
		this.image = image;
		this.game = game;
		this.width = 60;
		this.height = 87;
		this.x = Math.random() * (game.width - this.width);
		this.y = game.height - game.playerMargin - 90;
		this.maxFrame = 1;
		this.XmoveSpeed = 2;
	}
	draw(context){
		super.draw(context,this.x,this.y,this.width,this.height);
		context.drawImage(this.image,this.frameX * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
	}
	update(){
		this.x -= this.XmoveSpeed;
		if(this.frameTimer > this.frameInterval){
			this.frameX++;
			this.frameX = this.frameX > this.maxFrame ? 0 : this.frameX;
		}else{
			this.frameTimer++;
		}
	}
}

export class EnemyOnBigSpider extends EnemyFly{
	constructor(game,image){
		super(game,image);
		this.width = 120;
		this.height = 144;
		this.y = 0;
		this.moveSpeed = 1;
		this.XmoveSpeed = 1;
		this.backY = Math.random() * (this.game.height - this.width - this.game.playerMargin);
	}
	update(){
		//console.log(this.maxFrame)
		if(this.frameTimer > this.frameInterval){
			this.frameTimer = 0;
			this.frameX++;
			this.frameX = this.frameX > this.maxFrame ? 0 : this.frameX;
		}else{
			this.frameTimer++;
		}
		this.x -= this.XmoveSpeed;
		//console.log(this.xMoveSpeed);
		this.y += this.moveSpeed;
		if(this.y >= this.backY) this.moveSpeed *= -1;
		
	}
	draw(context){
		//蜘蛛丝
		context.beginPath();
		context.moveTo(this.x + 60,0);
		context.lineTo(this.x + 60,this.y + 60);
		context.stroke();
		super.draw(context);
	}
}
