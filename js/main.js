import { Player } from './player.js';
import { userInput } from './userInput.js';
import { backGround } from './back.js';
import { EnemyFly, EnemyOnGround, EnemyOnBigSpider } from './assortedEnemies.js';
import { UI } from './UI.js';
//背景图片
const layer1 = new Image();
layer1.src = 'image/layer-1.png';
const layer2 = new Image();
layer2.src = 'image/layer-2.png';
const layer3 = new Image();
layer3.src = 'image/layer-3.png';
const layer4 = new Image();
layer4.src = 'image/layer-4.png';
const layer5 = new Image();
layer5.src = 'image/layer-5.png';
const forestImage = new Image();
forestImage.src = 'image/forest.png';
//怪物图片
const enemy_fly = new Image();
enemy_fly.src = 'image/enemy_fly.png';
const enemy_plant = new Image();
enemy_plant.src = 'image/enemy_plant.png';
const enemy_spider_big = new Image();
enemy_spider_big.src = 'image/enemy_spider_big.png';
//主游戏
window.addEventListener('load', () => {
	//获取用户id 和 用户名
	let id = localStorage.getItem('id')
	let username = localStorage.getItem('username')
	console.log(id, username)

	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	const canvasWidth = canvas.width = 900;
	const canvasHeight = canvas.height = 500;
	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.playerMargin = 60;
			this.player = new Player(this);
			//this.standingRight = new standingRight(this.player);
			this.keyInput = new userInput();
			this.enemies = [];
			this.traces = [];
			this.collisons = [];
			this.floatScores = [];
			this.ui = new UI(this);
			// this.addEnemyInterval = 0;
			this.fps = 60;
			this.frameTimer = 0;
			this.frameInterval = 2000 / this.fps;
			this.score = 0;
			this.targetScore = 20;
			this.maxGameTime = 20;
			this.currentGameTime = 0;
			this.liveNumber = 3;
			this.gameOver = false;
			this.fontColor = 'white';
			this.layerSpeed = 1;
		}
		draw(context) {
			this.player.draw(context);
			this.ui.draw(context);
			this.traces.forEach((value, index) => {
				value.draw(context);
			})
		}
		update(keysArray, deltaTime) {
			this.traces.forEach((value, index) => {
				value.update();
				if (value.deleteMark) this.traces.splice(index, 1);
			})
			//this.standingRight.handleInput(keysArray);
			this.player.update(keysArray, deltaTime);
			if (this.player.currentState === this.player.states[6])
				this.enemies.forEach(value => {
					value.XmoveSpeed = 10;
				})
			//console.log(this.frameInterval);
			// this.addEnemyInterval++;
			if (this.frameTimer > this.frameInterval) {
				this.frameTimer = 0;
				if (Math.round(Math.random() * 3) === 0)
					this.enemies.push(new EnemyFly(this, enemy_fly));
				if (Math.round(Math.random() * 3) === 1)
					this.enemies.push(new EnemyOnGround(this, enemy_plant));
				if (Math.round(Math.random() * 3) === 2)
					this.enemies.push(new EnemyOnBigSpider(this, enemy_spider_big));
			} else {
				this.frameTimer += 2;
			}
		}
	};

	//背景
	const game = new Game(canvasWidth, canvasHeight);
	const layer_1 = new backGround(layer1, game, 2400, 720, game.layerSpeed);
	const layer_2 = new backGround(layer2, game, 2400, 720, game.layerSpeed);
	const layer_3 = new backGround(layer3, game, 2400, 720, game.layerSpeed);
	const layer_4 = new backGround(layer4, game, 2400, 720, game.layerSpeed);
	const layer_5 = new backGround(layer5, game, 2400, 720, game.layerSpeed);
	const layer_forest = new backGround(forestImage, game, 2400, 720, game.layerSpeed);
	const layers = [layer_1, layer_2, layer_3, layer_4, layer_5];
	console.log(game);
	let lastTime = 0;
	let deltaTime = 0;

	//保存方法
	function Save() {
		//1.1组织参数对象
		const qObj = {
			id,
			username,
			score: game.score,
			time: game.currentGameTime
		}
		//1.2创建URLSearcParams 
		const paramsObj = new URLSearchParams(qObj)
		//1.3转为 字符串
		const queryString = paramsObj.toString()
		console.log(queryString)

		//2.1 创建　XMLHttpRequest 对象
		const xhr = new XMLHttpRequest()
		//2.2 请求方式 + 服务器端口(URL)
		xhr.open('GET', `http://47.97.161.71:8087/save?${queryString}`)
		//2.3 监听加载
		xhr.addEventListener('loadend', () => {
			console.log(xhr.response)
			// 返回字符串 -> JSON
			const data = JSON.parse(xhr.response)
			console.log(data)
			if (data.success) {
				console.log(data.msg)
				setTimeout(() => {
					location.reload()
					location.href = "menu.html"
				}, 1500)
				//window.location.href = "login.html"
			} else {
				alert(data.msg)
			}

		})
		//2.4 发送请求
		xhr.send()

	}


	function animate(timeStamp) {
		if ((timeStamp / 1000).toFixed(1) >= game.maxGameTime) game.gameOver = true;
		deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		game.currentGameTime = timeStamp;
		//console.log(deltaTime);
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		//背景
		layers.forEach(value => {
			value.speedModify = game.layerSpeed;
			value.draw(ctx);
			value.update();
		});
		// layer_forest.draw(ctx);
		// layer_forest.update();
		//敌人
		game.enemies.forEach((value, index) => {
			if (value.x <= -value.width) game.enemies.splice(index, 1);
			if (value.y <= -value.height) game.enemies.splice(index, 1);
			value.draw(ctx);
			value.update();
		});
		if (game.collisons != null) {
			game.collisons.forEach((value, index) => {
				//if(value.frame > 4) this.collisons.splice(index,1);
				value.draw(ctx);
				value.update();
			})
		}
		game.floatScores.forEach((value, index) => {
			if (value.deleteMark === true) game.floatScores.splice(index, 1);
			value.update();
			value.draw(ctx);
		})

		//碰撞
		game.player.isCollision(game.enemies);
		game.draw(ctx);
		game.update(game.keyInput.keysArray, deltaTime);
		if (!game.gameOver) requestAnimationFrame(animate);
		if (game.gameOver) requestAnimationFrame(Save);

		//游戏结束
		// if (!game.gameOver && game.liveNumber === 0) {
		// 	//1.1组织参数对象
		// 	const qObj = {
		// 		id,
		// 		username,
		// 		score: game.score,
		// 		time: game.currentGameTime
		// 	}
		// 	//1.2创建URLSearcParams 
		// 	const paramsObj = new URLSearchParams(qObj)
		// 	//1.3转为 字符串
		// 	const queryString = paramsObj.toString()
		// 	console.log(queryString)

		// 	//2.1 创建　XMLHttpRequest 对象
		// 	const xhr = new XMLHttpRequest()
		// 	xhr.open('GET', `http://localhost:8087/login?${queryString}`)
		// 	xhr.addEventListener('loadend', () => {
		// 		console.log(xhr.response)
		// 	})
		// }
	}



	animate(0);
});