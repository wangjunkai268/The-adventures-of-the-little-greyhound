class Trace{
	constructor(game){
		this.deleteMark = false;
		this.game = game;
	}
	update(){
		this.x -= this.speedX;
		this.y -= this.speedY;
		this.size *= 0.95;
		if(this.size <= 0.05) this.deleteMark = true;
	}
	draw(context){
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
	}
}

export class Dust extends Trace{
	constructor(game,x,y){
		super(game);
		this.size = Math.random() * 10 + 10;
		this.x = x;
		this.y = y;
		this.speedX = Math.random() + 2;
		this.speedY = Math.random();
		this.color = 'black';
	}
	update(){
		super.update();
	}
	draw(context){
		super.draw(context);
		context.beginPath();
		context.arc(this.x,this.y,this.size,0,Math.PI * 2);
		context.fillStyle = this.color;
		context.fill();
	}
}

const fire = new Image();
fire.src = 'image/fire.png';
export class Fire extends Trace{
	constructor(game,x,y){
		super(game);
		this.image = fire;
		this.x = x;
		this.y = y;
		this.size = Math.random() * 10 + 110;
		this.angle = 0.05;
		this.deltaAngle = Math.random() * 0.1;
		this.deleteMark = false;
	}
	update(){
		this.size *= 0.95;
		this.angle += this.deltaAngle;
		if(this.size < 0.05) this.deleteMark = true;
	}
	draw(context){
		super.draw(context);
		context.save();
		context.translate(this.x,this.y);
		context.drawImage(this.image,0,0,this.size,this.size);
		context.rotate(this.angle);
		context.restore();
	}
}

export class FireSplash extends Trace{
	constructor(game,x,y){
		super(game);
		this.deleteMark = false;
		this.image = fire;
		this.x = x;
		this.y = y;
		this.speedX = Math.random() * (-10) + 6;
		this.speedY = Math.random() * 4;
		this.weight = 0.2;
		this.size = Math.random() * 20 + 100;
	}
	update(){
		super.update();
		this.y += this.weight;
		this.weight += 0.1;
	}
	draw(context){
		super.draw(context);
		context.drawImage(this.image,this.x,this.y,this.size,this.size);
	}
}