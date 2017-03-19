var shootZombie = function(){
	var config = {
		vp_margin :{
			top : 70,
			left : 300,
		},
		shooter : {
			name : 'shooterCard',
			url : 'imgs/imgs_03/Peashooter.png'
		},
		shooterG : {
			name : 'shooterCardG',
			url : 'imgs/imgs_03/PeashooterG.png'
		},
		shooterGif : {
			name : 'shooterGif',
			url : 'imgs/imgs_03/Peashooter.gif',
			opacity : 1,
			blood : 3
		},
		shooterShadow : {
			name : 'shooterShadow',
			url : 'imgs/imgs_03/Peashooter.gif',
			opacity : .5
		},
		bullet : {
			url : {
				bullet : 'imgs/imgs_04/plant/bullet.gif',
				bulletHit : 'imgs/imgs_04/plant/PeaBulletHit.gif'
			},
			zIndex : 100,
			left : 10,
			top : '247px',
			moveSpeed : 30,
			createSpeed : 1600
		},
		zombie : {
			url : {
				zombie : 'imgs/imgs_04/zombie/Zombie.gif',
				zombieAttack : 'imgs/imgs_04/zombie/ZombieAttack.gif',
				zombieDie : 'imgs/imgs_04/zombie/ZombieDie.gif',
				zombieHead : 'imgs/imgs_04/zombie/ZombieHead.gif',
				zombieLostHead : 'imgs/imgs_04/zombie/ZombieLostHead.gif',
				zombieLostHeadAttack : 'imgs/imgs_04/zombie/ZombieLostHeadAttack.gif'
			},
			blood : 10 ,
			left : 780,
			top : 190,
			moveSpeed : 600,
			maxNum : 3,
			createTime : 20000

		}
	}

	var cardList = document.getElementById('cardList'),
	    shooterList = document.getElementById('shooterList'),
	    zombieList = document.getElementById('zombieList'),
	    shooterArr = new Array(5),//存放植物
	    zombieArr = [],
	    endNum = 0;
	    


	var startOrStopShoots = function(){
		for(var i in shooterArr){
			shooterArr[i].stopShoot();
			num[i] = true;

			if(zombieArr.length > 0 ){
				num[i] = false;
				shooterArr[i].startShoot(zombieArr[0]);
			}
		}
	}

	var gameover = function(sentence){
		var end = document.createElement('div'),
			words = document.createElement('p'),
			btn = document.createElement('button');

		end.className = 'end';
		words.className = 'word';
		btn.className = 'restart';
		
		end.style.width = window.innerWidth + 'px'; 
		end.style.height = window.innerHeight + 'px'; 
		words.innerHTML = sentence;
		btn.innerHTML = '重新开始游戏';
		btn.onclick = function(){
			window.location.reload();
		}

		document.body.appendChild(end);
		document.body.appendChild(words);
		words.appendChild(btn);

		return false;
		
	}
	//create 卡片
	var createCard = function(name,url){
		var card = document.createElement('img');
		card.id = name;
		card.src = url ;

		cardList.appendChild(card);
		return card;
	}

	var card = createCard(config.shooter.name,config.shooter.url);
	createCard(config.shooterG.name,config.shooterG.url);

	//植物对象
	var plant = function(name,url,a){
		this.shooter = this.createShooter(name,url,a);
		this.blood = config.shooterGif.blood
	}

	//创造植物
	plant.prototype.createShooter = function(name,url,a){
		var shooter = document.createElement('img');
		shooter.className = name;
		shooter.src = url;
		shooter.style.opacity = a;
		shooter.style.filter = 'alpha(opacity)';

		shooterList.appendChild(shooter);
		return shooter;
	}

	//造子弹
	plant.prototype.createBullet = function(){
		var bullet = document.createElement('img');
		bullet.src = config.bullet.url.bullet;
		bullet.style.position = 'absolute';
		bullet.style.zIndex = config.bullet.zIndex ;
		bullet.style.left = this.shooter.offsetLeft + config.bullet.left + 'px';
		bullet.style.top = config.bullet.top;

		shooterList.appendChild(bullet);
		return bullet;
	}

	//发射
	plant.prototype.startShoot = function(zb){
		var _this = this;
		_this.shootTime = setInterval(function(){
			var bullet = _this.createBullet();
			var moveTime = setInterval(function(){
				bullet.style.left = bullet.offsetLeft + 10 + 'px';

				if(bullet.offsetLeft > zb.zombie.offsetLeft + 30){
					clearInterval(moveTime);
					moveTime = null;
					bullet.src = config.bullet.url.bulletHit;
			
					setTimeout(function(){
						shooterList.removeChild(bullet);
					},300)

					zb.blood -- ;
					if(_this.shooter.offsetLeft < zb.zombie.offsetLeft){
						if(zb.blood <= 2){
							if(zb.blood === 0){
								zb.zombieDie();
								startOrStopShoots();
							}else if(zb.blood === 1){
								zb.down();
							}else if(zb.blood === 2){
								zb.zombie.src = config.zombie.url.zombieLostHead;
								zb.headLost();
							}
						}
						if(config.zombie.maxNum === 0 && endNum === 0){
							endNum++;
							clearInterval(_this.shootTime);
							_this.shootTime = null;
							gameover('恭喜闯关成功');
						} 
					}else{
						if(zb.blood <= 2){
							zb.stopWalking();
							
							if(zb.blood === 0){
								zb.zombieDie();
								startOrStopShoots();
							}else if(zb.blood === 1){
								zb.down();
							}else if(zb.blood === 2){
								zb.zombie.src = config.zombie.url.zombieLostHeadAttack;
								zb.headLost();
							}

							_this.blood -- ;
							if(_this.blood === 0){
								zb.zombieWalking(config.zombie.url.zombieLostHead);
								_this.die();

								var num = shooterArr.lastIndexOf(_this);
								shooterArr.splice(num,1);
							}
						}else{
							zb.stopWalking();
							zb.zombie.src = config.zombie.url.zombieAttack;
							_this.blood -- ;
							if(_this.blood === 0){
								zb.zombieWalking(config.zombie.url.zombie);
								_this.die();
								var num = shooterArr.lastIndexOf(_this);
								shooterArr.splice(num,1);
							}
						}
						if(config.zombie.maxNum === 0 && endNum === 0){
							endNum++;
							clearInterval(_this.shootTime);
							_this.shootTime = null;
							gameover('恭喜闯关成功');
						} 
					}

				}
			}, config.bullet.moveSpeed)

		},config.bullet.createSpeed)
	}

	// 停止发射
	plant.prototype.stopShoot = function(){
		clearInterval(this.shootTime);
		this.shootTime = null;
	}

	//植物死亡
	plant.prototype.die = function(){
		this.stopShoot();
		shooterList.removeChild(this.shooter)
	}

	//--------------- Zombie
	//僵尸对象
	var zombie = function(){
		this.zombie = this.createZombie();
		
		this.blood = config.zombie.blood;
	}
	//创建僵尸
	zombie.prototype.createZombie = function(){
		var zombie = document.createElement('img');
		zombie.style.position = 'absolute';
		zombie.src = config.zombie.url.zombie;
		zombie.style.left = config.zombie.left + 'px';
		zombie.style.top = config.zombie.top + 'px';
		zombie.style.zIndex = 100;

		zombieList.appendChild(zombie);

		return zombie;
	}

	//僵尸行走
	var resultNum = 0;
	zombie.prototype.zombieWalking = function(url){
		var _this = this;
		this.zombie.src = url;

		_this.walkingTime = setInterval(function(){
			_this.zombie.style.left = _this.zombie.offsetLeft - 10 +'px';
			if(_this.zombie.offsetLeft < 60 && _this.zombie.offsetLeft != 0){
				resultNum ++;
				clearInterval(_this.walkingTime);
				_this.walkingTime = null;
				gameover('You Lose！');
			} 
		},config.zombie.moveSpeed)
		
	}

	//头颅掉落
	zombie.prototype.headLost = function(){
		var head = document.createElement('img');
		head.style.position = 'absolute';
		head.src = config.zombie.url.zombieHead;
		head.style.left = this.zombie.offsetLeft - 20 + 'px';
		head.style.top = this.zombie.offsetTop + 20 + 'px';
		head.style.zIndex = 200;

		zombieList.appendChild(head);

		setTimeout(function(){
			zombieList.removeChild(head);
		},1000)
	}

	//停止走路
	zombie.prototype.stopWalking = function(){
		clearInterval(this.walkingTime);
		this.walkingTime = null;
	}

	//咀嚼植物 有头/无头
	zombie.prototype.zombieEating = function(url){
		this.zombie.src = url;
		this.stopWalking();
	}

	//倒下
	zombie.prototype.down = function(){
		this.zombie.src = config.zombie.url.zombieDie;
		this.stopWalking();
	}
	//僵尸的死亡
	zombie.prototype.zombieDie = function(){
		config.zombie.maxNum -- ;
		if(zombieArr.length >= 1){
			zombieArr.shift();
		}

		var _this = this;

		setTimeout(function(){
			zombieList.removeChild(_this.zombie);
		},800)		
	}
	
	



	//点击卡片生成植物
	card.onclick = function(){
		var plantGif = new plant(config.shooterGif.name,config.shooterGif.url,config.shooterGif.opacity),
			plantShadow = new plant(config.shooterShadow.name,config.shooterShadow.url,config.shooterShadow.opacity),
			shooterGif = plantGif.shooter,
			shooterShadow = plantShadow.shooter;
			carpet = document.querySelector('.carpet');
			
		//card.style.visibility = 'hidden';

		//空白删除元素
		var deleteChild = function(){
			shooterList.removeChild(shooterGif);
			shooterList.removeChild(shooterShadow);

			shooterGif.onclick = null;
			document.onmousemove = null;
		}

		//添加实体植物删除阴影植物，并不可重复种植
		var trueShooter = function(index){
			//判断阳光
			var scoreBoard = Number(document.getElementById('score').innerHTML);
			document.getElementById('score').innerHTML = scoreBoard - 125;
			scoreBoard - 125 < 125 ? card.style.display = 'none' : card.style.display = 'block';

			//放入植物对象
			shooterArr[index] = plantGif;

			shooterGif.style.left = shooterShadow.style.left;
			shooterGif.style.top = shooterShadow.style.top; 
			shooterList.removeChild(shooterShadow);
		
			shooterGif.onclick = null;
			document.onmousemove = null;
		}

		document.onmousemove = function(e){
			
			var e = e || window.event;
			shooterGif.style.left = e.clientX - shooterGif.offsetWidth / 2 - config.vp_margin.left + 'px';
			shooterGif.style.top = e.clientY - shooterGif.offsetHeight / 2 - config.vp_margin.top + 'px';
			shooterGif.oncontextmenu = deleteChild;

			//不在草地上
			if(e.clientY < carpet.offsetTop + config.vp_margin.top || e.clientY > carpet.offsetTop + config.vp_margin.top +  carpet.offsetHeight){
				shooterShadow.style.visibility = 'hidden';
				shooterGif.onclick = deleteChild;
				
			}else{
				var fixedLeft =  carpet.offsetLeft + config.vp_margin.left;
				var oneCarpetWidth = carpet.offsetWidth / 9;
				
				var createShooterOrNot = function(index,len){
					if(shooterArr[index] != undefined){
						shooterShadow.style.visibility = 'hidden';
						shooterGif.onclick = deleteChild;

					}else{
						shooterShadow.style.left = carpet.offsetLeft + oneCarpetWidth * len + 'px';
						shooterGif.onclick = function(){
							return trueShooter(index);// return onclick = trueShooter(index)会立即执行
						};
 
					}
				} 

				shooterShadow.style.top = carpet.offsetTop + 'px';
				shooterShadow.style.visibility = 'visible';

				//判断种植位置
				if(e.clientX < oneCarpetWidth + fixedLeft && e.clientX >= fixedLeft){
					createShooterOrNot(0,0);

				}else if(e.clientX < oneCarpetWidth * 3 + fixedLeft && e.clientX >= fixedLeft + oneCarpetWidth * 2){
					createShooterOrNot(1,2);

				}else if(e.clientX < oneCarpetWidth * 5 + fixedLeft && e.clientX >= fixedLeft + oneCarpetWidth * 4){
					createShooterOrNot(2,4);

				}else if(e.clientX < oneCarpetWidth * 7 + fixedLeft && e.clientX >= fixedLeft + oneCarpetWidth * 6){
					createShooterOrNot(3,6);

				}else if(e.clientX < oneCarpetWidth * 9 + fixedLeft && e.clientX >= fixedLeft + oneCarpetWidth * 8){
					createShooterOrNot(4,8);

				}else{
					shooterShadow.style.visibility = 'hidden';

				}

			}

		}

	}
	
	var num = [true,true,true,true,true];//判定有木有给植物添加shoot
	var addShoot = function(){
		if(zombieArr[0] != undefined){
			for(var i in shooterArr){
				if(num[i] === true){
					shooterArr[i].startShoot(zombieArr[0]);
					num[i] = false;
				}
			}
		}
		
	}

	setInterval(addShoot,1000)//检测地图上有无僵尸

	//点击start后出现僵尸
	var result = function(){
		var all_zombie = config.zombie.maxNum;
		var num = 0;
		var runId = setInterval(function(){
			if(resultNum === 1){
				zombieList.innerHTML = '';
				clearInterval(runId);
				runId = null;
			}else{
				if(num <= all_zombie - 1){
					var zb = new zombie();
					zombieArr.push(zb); //放入僵尸对象

					zb.zombieWalking(config.zombie.url.zombie);
					num ++ ;
				}else{
					clearInterval((runId))
					runId = null;
				}
			}
		},config.zombie.createTime)
	}

	return result();


}

