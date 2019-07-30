var data = new Array(//0 空 1普通 2 多个球 3加长挡板 4 大球
	new Array(1, 4, 1, 1, 4, 1, 3, 1, 1, 1),
	new Array(1, 2, 4, 1, 3, 1, 4, 3, 1, 1),
	new Array(1, 2, 4, 2, 4, 5, 3, 5, 5, 5));

function getEnemyByData(data) { //一排10个
	var w = 38;
	var h = 18;
	var enemys = new Array();
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			if (data[i][j] == 0) {
				enemys.push(new Enemy(j * (w + 2), i * (h + 2), w, h));
			} else if (data[i][j] == 1) {
				enemys.push(new Enemy(j * (w + 2), i * (h + 2), w, h, 1, '#FF00FF'));
			} else if (data[i][j] == 2) {
				enemys.push(new Enemy(j * (w + 2), i * (h + 2), w, h, 2, '#ff9900'));
			} else if (data[i][j] == 3) {
				enemys.push(new Enemy(j * (w + 2), i * (h + 2), w, h, 3, '#9ACD32'));
			}else if (data[i][j] == 4) {
				enemys.push(new Enemy(j * (w + 2), i * (h + 2), w, h, 4, '#00ff00'));
			}else if (data[i][j] == 5) {
				enemys.push(new Enemy(j * (w + 2), i * (h + 2), w, h, 5, '#000000'));
			}
		}
	}
	return enemys;
}

function getEnemy() { //产生砖块测试
	var STARTY = 0;
	var w = 38;
	var h = 18;
	var enemys = new Array();
	for (var i = 0, j = 0; i < 30; i++, j++) {
		if (j * (w + 2) > window.GAMEWIDTH - 2 - w) {
			j = 0;
			STARTY += h + 2;
		}
		if (j == 0) {
			enemys.push(new Enemy(j * w, STARTY, w, h, 5, '##00ff00'))
		} else {
				enemys.push(new Enemy(j * (w + 2), STARTY, w, h, 5, '##00ff00')); 
			
		}
	}
	return enemys;
}

class Enemy {
	constructor(x, y, width, height, t, color, hp) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.treasure = (t) ? t : 999;
		this.life = true;
		this.hp = (hp) ? hp : 1;
		this.color = (color) ? color : "#DC143C";
		if (typeof show != "function") {
			Enemy.prototype.show = function (context) {
				if (this.hp > 1) {
					context.strokeStyle = 'black';
					context.rect(this.x, this.y, this.width, this.height);
					context.stroke();
					context.fillStyle = this.color;
					context.fillRect(this.x, this.y, this.width - 10, this.height - 10);
				}
				else {
					context.fillStyle = this.color;
					context.fillRect(this.x, this.y, this.width, this.height);
				}
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.width, this.height);
			};
			Enemy.prototype.hited = function () {
				this.hp -= 1;
				if (this.hp < 1) {
					this.downTreasure();
					this.life = false;
					window.score += 10;
				}
			};
			Enemy.prototype.downTreasure = function () {
				if (this.treasure < 999) {
					var a = new Treasure(this);
					addforShow(a);
				}
			};
		}
	}
}

