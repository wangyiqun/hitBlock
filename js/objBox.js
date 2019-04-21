var needShowObjs;//需要绘制的对象数组
function addforShow(obj) { //添加一个对象到绘制数组
	needShowObjs.push(obj);
}

function delForshow() { //从绘制数组里删除死亡的对象
	for (let i in needShowObjs) {
		if (needShowObjs[i] instanceof Array) {
			 for (let j in needShowObjs[i]) {
				if (!needShowObjs[i][j].life) {
					needShowObjs[i].splice(j, 1);
				}
			} 
		} else {
			if (!needShowObjs[i].life) {
				needShowObjs.splice(i, 1);
			}
		}
	}
}

function showObj(ctx) { //调用对象的绘制方法
	for (let i in needShowObjs) {
		if (needShowObjs[i] instanceof Array) {//砖块数组
			for (let s of needShowObjs[i]) {
				s.show(ctx);
			}
		} else {
			needShowObjs[i].show(ctx);
		}
	}
}
//获取球
function getAllBalls(){
	var balls =new Array();
	for (let i in needShowObjs) {
		if(needShowObjs[i] instanceof Ball){
			balls.push(needShowObjs[i])
		}
	}
	return balls;
	
}
function objMove() { //对象运动
	for (let i in needShowObjs) {
		if (needShowObjs[i] instanceof Array) {
			for (let s of needShowObjs[i]) {
				if (s.move) {
					s.move();
				}
			}
		} else {
			if (needShowObjs[i].move) {
				needShowObjs[i].move();
			}

		}
	}
}