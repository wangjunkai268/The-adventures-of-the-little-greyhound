export class FloatScore{
	constructor(sx,sy,dx,dy){
		this.sx = sx;
		this.sy = sy;
		this.dx = dx;
		this.dy = dy;
		this.floatTime = 0;
		this.fontFamily = 'Creepster';
		this.fontColor = 'black';
		this.deleteMark = false;
	}
	update(){
		if(this.floatTime >= 8) this.deleteMark = true;
		else this.floatTime += 0.09;
		this.sx += (this.dx - this.sx) * 0.03;
		this.sy += (this.dy - this.sy) * 0.03;
	}
	draw(context){
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowColor = 'white';
		context.shadowBlur = 0;
		context.font = 30 + 'px ' + this.fontFamily;
		context.fillStyle = this.fontColor;
		context.fillText('+1',this.sx,this.sy);
	}
}