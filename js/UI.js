export class UI{
	constructor(game){
		this.game = game;
		this.fontSize = 40;
		this.fontFamily = 'Creepster';
		this.currentTime = 0;
		this.heartX = 20;
		this.heartWidth = this.heartHeight = 50;
		this.fontColor = 'black';
	}
	draw(context){
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowColor = 'white';
		context.shadowBlur = 0;
		//Score
		context.font = this.fontSize + 'px ' + this.fontFamily;
		context.textAlign = 'left';
		context.fillStyle = this.fontColor;
		context.fillText('Score: ' + this.game.score,20,50);
		
		//Time
		context.font = 30 + 'px ' + this.fontFamily;
		context.textAlign = 'left';
		context.fillStyle = this.fontColor;
		context.fillText('Time: ' + this.currentTime + 's',20,100);
		
		//提示
		context.fillStyle = this.game.fontColor;
		this.currentTime =(this.game.currentGameTime / 1000).toFixed(0);
		context.font = 150 + 'px ' + this.fontFamily;
		context.textAlign = 'center';
		if(this.game.gameOver){
			if(this.game.score >= this.game.targetScore && this.game.liveNumber > 0) context.fillText('You Win!!!',this.game.width / 2,this.game.height / 2);
			else if(this.game.score < this.game.targetScore || this.game.liveNumber === 0) context.fillText('You Lose!!!',this.game.width / 2,this.game.height / 2);
		}
		//生命
		const liveImage = new Image();
		liveImage.src = 'image/heart.png';
		context.textAlign = 'left';
		for(let i = 0 ; i < this.game.liveNumber ; i++){
			context.drawImage(liveImage,0,0,this.heartWidth,this.heartHeight,this.heartX + i * 50,120,40,40);
			// if(this.heartX >= 120) this.heartX = 20;
			// else this.heartX += 50;
		}
		
	}
}