function getBall(board) {
	var h = w = 20;
	var x = board.x + board.width / 2 - w / 2;
	var y = board.y - h;
	return new Ball(x, y, w, h);
}
//位置x,位置y,宽，高，速度x,速度y
class Ball {
	constructor(x, y, width, height, sx, sy) {
		this.imgEle = document.getElementById("ball");
		this.width = width;
		this.height = height;
		this.life = true;
		this.x = x;
		this.y = y;
		this.speedX = (sx) ? sx : -2;
		this.speedY = (sy) ? sy : -1;
		if (typeof this.move != "function") {
			Ball.prototype.ballNum = 0; //所有球的数量
			Ball.prototype.addBallNum = function () {
				this.__proto__.ballNum += 1;
			};
			Ball.prototype.move = function () {
				var that = this;
				that.x += that.speedX;
				that.y += that.speedY;
				if (that.x > window.GAMEWIDTH - this.width) {
					that.x = window.GAMEWIDTH - this.width;
					that.speedX = -that.speedX;
				}
				else if (that.x < 0) {
					that.x = 0;
					that.speedX = -that.speedX;
				}
				if (that.y < 0) {
					that.y = 0;
					that.speedY = -that.speedY;
				}
				else if (that.y > window.board.y) { //死亡
					this.__proto__.ballNum -= 1;
					this.life = false;
					if (this.__proto__.ballNum < 1) {
						window.gameOver = true;
					}
				}
				if (hitCheck(that, window.board)) {
					if (window.board.fx == 1) { //挡板往右边移动
						that.speedX=that.speedX>0?that.speedX+1:that.speedX-1
						that.speedY=that.speedY>0?that.speedY+1:that.speedY-1
						setTimeout(function () {
							that.speedX=that.speedX>0?that.speedX-1:that.speedX+1
							that.speedY=that.speedY>0?that.speedY-1:that.speedY+1
						}, 1500);
					}
					else if (window.board.fx == 2) { //挡板往左边移动
						that.speedX = -that.speedX;
						that.speedY = -that.speedY;
					}
					else { //不移动
						that.speedY = -that.speedY;
					}
				}
				for (let i = 0; i < window.enemys.length; i++) {
					if (hitCheck(window.enemys[i], that)) {
						that.speedX = -that.speedX;
						that.speedY = -that.speedY;
						window.enemys[i].hited();
					}
				}
			};
			Ball.prototype.show = function (context) {
				context.drawImage(this.imgEle, this.x, this.y);
			};
		}
		this.addBallNum();
	}
}

