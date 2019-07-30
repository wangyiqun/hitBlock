class Treasure {
	constructor(enemy) {
		this.width = 10;
		this.height = 10;
		this.x = enemy.x;
		this.y = enemy.y + this.height;
		this.speed = 2;
		this.color = enemy.color;
		this.life = true;
		if (typeof setBigBoard != "function") {
			//加长挡板
			Treasure.prototype.setBigBoard = function () {
				if (window.board.width / window.board.WIDTH < 4) {
					window.board.width *= 2;
					setTimeout(function () {
						window.board.width /= 2;
					}, 5000);
				}
			};
			//多个球
			Treasure.prototype.doubleBall = function () {
				if (window.ball.__proto__.ballNum < 6) {
					var balls = getAllBalls();
					for (let i = 0; i < balls.length; i++) {
						if (balls[i].life) {
							var x = balls[i].x;
							var y = balls[i].y;
							var w = balls[i].width;
							var h = balls[i].height;
							var verX = balls[i].speedX < 0 ? balls[i].speedX - 1 : balls[i].speedX + 1;
							var verY = balls[i].speedY < 0;
							addforShow(new Ball(x, y, w, h, verX, verY));
							verX = verX < 0 ? verX + 2 : verX - 2;
							addforShow(new Ball(x, y, w, h, verX, verY));
						}
					}
				}
			};
			//大球
			Treasure.prototype.bigBall = function () {
				if (window.ball.width == 20) {
					window.ball.width = 40;
					window.ball.height = 40;
					window.ball.imgEle = document.getElementById("bigBall");
					setTimeout(function () {
						window.ball.width = 20;
						window.ball.height = 20;
						window.ball.imgEle = document.getElementById("ball");
					}, 5000);
				}
			};
			//子弹
			Treasure.prototype.fire = function () {
				var balls = getAllBalls();
				var ball = balls.length > 0 ? balls[0] : null;
				if (ball) {
					new ZiDan().manyZidan(ball.x, ball.y);
				}
			};
			//掉落
			Treasure.prototype.move = function () {
				if (this.y < window.HEIGHT) {
					if (hitCheck(this, window.board)) {
						this.life = false;
						if (enemy.treasure == 1)
							this.setBigBoard();
						else if (enemy.treasure == 2) {
							this.doubleBall();
						}
						else if (enemy.treasure == 3) {
							this.bigBall();
						}
						else if (enemy.treasure == 4) {
							this.fire();
						}
					}
					this.y += this.speed;
				}
				else {
					this.life = false;
				}
			};
			Treasure.prototype.show = function () {
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.width, this.height);
			};
		}
	}
}
class ZiDan {
	constructor(x, y, sx, sy, color) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.height = 10;
		this.width = 3;
		this.life = true;
		this.speedX = sx;
		this.speedY = sy;
		if (typeof show != "function") {
			ZiDan.prototype.show = function () {
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.width, this.height);
			};
			ZiDan.prototype.move = function () {
				for (let i = 0; i < needShowObjs.length && this.life; i++) {
					if (needShowObjs[i] instanceof Array) {
						for (let j = 0; j < needShowObjs[i].length && this.life; j++) {
							if (needShowObjs[i][j] instanceof Enemy)
								if (hitCheck(this, needShowObjs[i][j])) {
									needShowObjs[i][j].hited();
									this.life = false;
								}
						}
					}
				}
				if (this.x < 0 || this.x > window.GAMEWIDTH - this.width || this.y < 0 || this.y > window.board.y) {
					this.life = false;
				}
				this.x += this.speedX;
				this.y += this.speedY;
			};
			ZiDan.prototype.manyZidan = function (ballX, ballY) {
				var ziDans = new Array();
				var sx = 0, sy = -1;
				for (let i = -2; i < 3; i++) {
					ziDans.push(new ZiDan(ballX, ballY, sx + i, sy, '#000000'));
				}
				needShowObjs.push(ziDans);
			};
		}
	}
}

