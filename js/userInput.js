//用户键盘操作
export class userInput{
	constructor(){
		this.keysArray = [];
		//按键按下
		window.addEventListener('keydown',(e) => {
			//console.log(e.key);
			//特定的w、s、a、d才可以加入数组
			if(this.keysArray.indexOf(e.key) < 0 && (e.key === 'w' || e.key === 'a' || e.key === 'd' || e.key === 's' || e.key === 'Enter')) this.keysArray.push(e.key);
			//console.log(this.keysArray);
		});
		//按键松开
		window.addEventListener('keyup',(e) => {
			let index = this.keysArray.indexOf(e.key);
			if(index >= 0 && (e.key === 'w' || e.key === 'a' || e.key === 'd' || e.key === 's' || e.key === 'Enter')) this.keysArray.splice(index,1);
		});
	}
}