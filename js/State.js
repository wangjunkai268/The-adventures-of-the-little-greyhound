import { Dust , Fire ,FireSplash} from './trace.js';

export const states = {
	standRight:{
		lineIndex:0,
		frameX:5
	},
	jumpOn:{
		lineIndex:1,
		frameX:5
	},
	jumpDown:{
		lineIndex:2,
		frameX:5
	},
	running:{
		lineIndex:3,
		frameX:7
	},
	circleBall:{
		lineIndex:4,
		frameX:9
	},
	sitOnGround:{
		lineIndex:5,
		frameX:4
	},
	rolling:{
		lineIndex:6,
		frameX:6
	},
	diving:{
		lineIndex:7,
		frameX:6
	},
	
}

//player的状态
export class State{
	constructor(state){
		this.state = state;
	}
}

//向右站
export class standingRight extends State{
	constructor(player){
		super('standRight');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.game.layerSpeed = 0;
		this.player.frameY = states.standRight.lineIndex;
		this.player.maxFrameX = states.standRight.frameX;
	}//在一个状态中，如果按键改变那么要转化为另一种状态
	handleInput(keysArray){
		if(keysArray.includes('e')) this.player.changeState(6);
		if(keysArray.includes('s')) this.player.changeState(states.sitOnGround.lineIndex);
		if(keysArray.includes('d')) this.player.changeState(states.running.lineIndex);
		if(keysArray.includes('w') && this.player.isOnGround()) this.player.changeState(states.jumpOn.lineIndex);
	}
}

//向上跳
export class jumpOn extends State{
	constructor(player){
		super('jumpOn');
		this.player = player;
	}
	setFrame(){
		//设置跳跃距离vy
		if(this.player.isOnGround()  && this.player.currentState != this.player.states[4]) this.player.vy -= 40
		this.player.frameX = 0;
		this.player.frameY = states.jumpOn.lineIndex;
		this.player.maxFrameX = states.jumpOn.frameX;
	}
	handleInput(keysArray){
		// if(keysArray.includes('w') && this.player.isOnGround()) this.player.vy -= this.player.maxSpeed;
		// this.player.y += this.player.vy;
		// if(this.player.vy >= 0)
		// this.player.changeState(states.jumpDown.lineIndex);
		// //在天上飞时
		// if(!this.player.isOnGround()) this.player.vy += this.player.weight;
		// else this.player.vy = 0;
		// if(keysArray.includes('Enter')) this.player.changeState(states.rolling.lineIndex);
		if(this.player.isOnGround()) this.player.changeState(states.running.lineIndex);
		else if(!this.player.isOnGround() && this.player.vy >= 0) this.player.changeState(states.jumpDown.lineIndex);
		else if(keysArray.includes('Enter')) this.player.changeState(states.rolling.lineIndex);
		// else if(keysArray.includes('s') && !this.player.isOnGround()) this.player.changeState(states.diving.lineIndex);
	}
}

//向下落
export class jumpDown extends State{
	constructor(player){
		super('jumpDown');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.frameY = states.jumpDown.lineIndex;
		this.player.maxFrameX = states.jumpDown.frameX;
	}
	handleInput(keysArray){
		//if(keysArray.includes('Enter')) this.player.changeState(states.rolling.lineIndex);
		// this.player.y += this.player.vy;
		// if(!this.player.isOnGround()) this.player.vy += this.player.weight;
		// else{
		//     this.player.vy = 0;	
		// 	this.player.changeState(states.running.lineIndex);
		// }
		if(this.player.isOnGround()) this.player.changeState(states.running.lineIndex);
	}
}

//跑步
export class running extends State{
	constructor(player){
		super('running');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.game.layerSpeed = 1;
		this.player.frameY = states.running.lineIndex;
		this.player.maxFrameX = states.running.frameX;
		this.player.game.enemies.forEach(value => {
			value.XmoveSpeed = 3;
		})
	}
	handleInput(keysArray){
		this.player.game.traces.push(new Dust(this.player.game,this.player.x + 20,this.player.y  + this.player.height));
		if(keysArray.includes('w')) {
		    this.player.changeState(states.jumpOn.lineIndex);	
		}else if(keysArray.includes('s')) {
			this.player.changeState(states.sitOnGround.lineIndex);
		}else if(keysArray.includes('Enter')) {
			this.player.changeState(states.rolling.lineIndex);
		}
	}
}

//晕了(转球)
export class circleBall extends State{
	constructor(player){
		super('circleBall');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.game.layerSpeed = 0;
		this.player.frameY = states.circleBall.lineIndex;
		this.player.maxFrameX = states.circleBall.frameX;
	}
	handleInput(keysArray){
		if(this.player.frameX >= 9) this.player.changeState(states.running.lineIndex);
		if(keysArray.includes('Enter')) this.player.changeState(states.rolling.lineIndex);
		if(keysArray.includes('w')) this.player.changeState(states.jumpOn.lineIndex);
		if(keysArray.includes('s')) this.player.changeState(states.sitOnGround.lineIndex);
	}
}

//坐地上
export class sitOnGround extends State{
	constructor(player){
		super('sitOnGround');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.game.layerSpeed = 0;
		this.player.frameY = states.sitOnGround.lineIndex;
		this.player.maxFrameX = states.sitOnGround.frameX;
	}
	handleInput(keysArray){
		if(keysArray.includes('Enter')) this.player.changeState(states.rolling.lineIndex);
		if(keysArray.includes('w')) this.player.changeState(states.standRight.lineIndex);
		if(keysArray.includes('d')) this.player.changeState(states.running.lineIndex);
	}
}

//打滚
export class rolling extends State{
	constructor(player){
		super('rolling');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.game.layerSpeed = 3;
		this.player.frameY = states.rolling.lineIndex;
		this.player.maxFrameX = states.rolling.frameX;
		this.player.game.enemies.forEach(value => {
			value.XmoveSpeed = 10;
		})
	}
	handleInput(keysArray){
		this.player.game.traces.push(new Fire(this.player.game,this.player.x,this.player.y));
		if(!keysArray.includes('Enter') && this.player.isOnGround()) this.player.changeState(states.running.lineIndex);
		if(!keysArray.includes('Enter') && !this.player.isOnGround()) this.player.changeState(states.jumpDown.lineIndex);
		if(keysArray.includes('Enter') && keysArray.includes('w') && this.player.isOnGround()) this.player.vy -= 40;
		if(keysArray.includes('s') && !this.player.isOnGround()) this.player.changeState(states.diving.lineIndex);
    }
}

//向下撞
export class diving extends State{
	constructor(player){
		super('diving');
		this.player = player;
	}
	setFrame(){
		this.player.frameX = 0;
		this.player.game.layerSpeed = 0;
		this.player.vy += 15;
		this.player.frameY = states.rolling.lineIndex;
		this.player.maxFrameX = states.rolling.frameX;
	}
	handleInput(keysArray){
		this.player.game.traces.push(new Fire(this.player.game,this.player.x,this.player.y));
		if(keysArray.includes('Enter') && this.player.isOnGround()) this.player.game.traces.push(new FireSplash(this.player.game,this.player.x,this.player.y));
		if(!keysArray.includes('Enter') && this.player.isOnGround()) this.player.changeState(states.running.lineIndex);
		// if(!keysArray.includes('Enter') && this.player.isOnGround()) this.player.changeState(states.running.lineIndex);
		// if(!keysArray.includes('Enter') && !this.player.isOnGround()) this.player.changeState(states.jumpDown.lineIndex);
		// if(keysArray.includes('Enter') && keysArray.includes('w') && this.player.isOnGround()) this.player.vy -= 40;
	}
}
