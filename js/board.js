var board, ball, enemys; //挡板 4 
var drawing; //画板
var spans; //文字
var context; //画笔
var pasueIs; //游戏暂停
var gameOver; //游戏结束
var fGame; //第一次游戏
var score = 0; //得分
var WIDTH=600;
var HEIGHT=300;
var GAMEWIDTH=400;
window.onload = function() {
	drawing = document.getElementById("drawing");
	spans = document.getElementById("123");
	if (drawing.getContext) {
		context = drawing.getContext("2d");
		context.fillStyle = "#ADFF2F";
		paintScore();
		getInit();
		fGame = true;
	}
	document.body.addEventListener("keydown", go, false);
}
function paintScore(){
	context.clearRect(0, 0, window.WIDTH, window.HEIGHT);
	context.moveTo(window.GAMEWIDTH, 0);
	context.lineTo(window.GAMEWIDTH, window.HEIGHT);
	context.stroke();
	context.moveTo(0, 0);
	context.font = "20px Georgia";
	context.fillStyle = "#ff1493";
	context.fillText("最高分："+getScore("score"), window.GAMEWIDTH+50, 50);
	context.fillText("得分："+window.score, window.GAMEWIDTH+50, 80);
}
function getInit() {
	board = new Board();
	ball = getBall(board);
	//enemys = getEnemyByData(data);
	enemys=getEnemy();  //测试
	needShowObjs = new Array();
	pasueIs = false;
	gameOver = true;
	score = 0;	
	addforShow(board);
	addforShow(ball);
	addforShow(enemys);
	showObj(context);
}

function go(event) {
	if (event.keyCode == 32) {
		if (gameOver) { //如果游戏结束，开始新的游戏

			if (!fGame) { //不是第一次游戏
				getInit(); //Ball的prototype  num???????
			}
			fGame = false;
			drawing.addEventListener("mousemove", function(event) {
				board.moveUseMouse(drawing, event);
			}, false)
			gameOver = false;
			setTimeout(cleanCloth, 10);
		} else { //暂停游戏
			pasueIs = !pasueIs;
			if (!pasueIs) {
				setTimeout(cleanCloth, 10);
			}
		}
	}
}

function cleanCloth() { //清除画布
	if (!pasueIs && !gameOver) {
		 paintScore();
		showObj(context);
		delForshow();
		objMove();
		setTimeout(cleanCloth, 10);
	} else {
		context.fillStyle = "#c0c0c0";
		context.fillRect(0, 0, window.GAMEWIDTH, window.HEIGHT);
		context.font = "20px Georgia";
		context.fillStyle = "#ff1493";
		if (gameOver) {
			context.fillText("游戏结束按空格键开始新的游戏!", 10, 50);
			setScore("score",window.score);
		}
		if (pasueIs) {
			context.fillText("游戏暂停按空格键恢复游戏!", 10, 50);
		}
	}
}

class Board {
	constructor() {
		this.y = 260;
		this.life = true;
		this.width = 60;
		this.WIDTH = 60;
		this.x = (window.GAMEWIDTH - this.width) / 2;
		this.height = 3;
		this.speed = 5;
		this.fx = 0; //right :1
		this.isfire=false
		if (typeof this.moveUseMouse != "function") {
			Board.prototype.moveUseMouse = function (canvas, event) {
				var x = this.x;
				var rect = canvas.getBoundingClientRect(); //元素到视窗边距离
				var nowX = event.clientX - rect.left * (canvas.width / rect.width);
				var a = nowX - this.width / 2;
				if (a > x) {
					this.fx = 1; //右移
				}
				else if (a < x) {
					this.fx = 2; //左移
				}
				else {
					this.fx = 0; //没有移动
				}
				if (a > window.GAMEWIDTH - this.width) {
					a = window.GAMEWIDTH - this.width;
				}
				if (a < 0)
					a = 0;
				this.x = a;
			};
			Board.prototype.show = function (context) {
				context.fillStyle = "#0000ff";
				context.fillRect(this.x, this.y, this.width, this.height);
			};
		}
	}
}

