var startAnimation = function(){

	var config = {
		position : {
			moveX : 0 ,
			bg : 20
		},
		speed : 80 ,
		zombie : {
			num : 5,
			zombieBg_Position : 565 , //zombie区域left ： 900 - 335
			zombie_Left : 170 ,//zombie区域宽度-gif宽度
			zombie_Top : 430
		},
		carpet : {
			moveLen : 32,
			sodSubW : 2,
			capSubW : 2.2,

		}
	}

	var bg = document.getElementById('bg'),
		zombie = document.getElementById('zombie'),
		viewport = document.getElementById('viewport'),
		start = document.getElementById('gameStart');


	//zombie
	var createZombie = function(){
		zombie.style.left = config.zombie.zombieBg_Position + 'px';

		for(var i=0 ; i<config.zombie.num ; i++){
			var cZombie = document.createElement('div');
			cZombie.style.position = 'absolute';
			cZombie.style.left = Math.random() * config.zombie.zombie_Left + 'px';
			cZombie.style.top = Math.random() * config.zombie.zombie_Top + 'px';

			cZombie.innerHTML = //换行就报错
			'<img src="imgs/imgs_01/Zombie/1.gif" class="onezb"><img src="imgs/imgs_01/interface/shadow.png" class="zbshadow">';
			zombie.appendChild(cZombie);

		}
	}

	//carptet into dom
	var createCarpet = function(className){
		if(className === 'carpet'){
			var name = document.createElement('div');
		}else{
			var name = document.createElement('img');
			name.src = className === 'sodroll' ? 'imgs/imgs_01/interface/SodRoll.png' : 'imgs/imgs_01/interface/SodRollCap.png';
		}
		name.className = className;
		viewport.appendChild(name);
	}

	//carpet animation
	var carpetMove = function(carpet,sodRoll,sodRollCap){
		var runId = setInterval(function(){
			
			carpet.style.width = carpet.offsetWidth + config.carpet.moveLen + 'px';
		
			sodRoll.style.left = sodRoll.offsetLeft + config.carpet.moveLen + 'px';
			sodRollCap.style.left = sodRollCap.offsetLeft + config.carpet.moveLen + 'px';

			sodRoll.style.width = sodRoll.offsetWidth - config.carpet.sodSubW + 'px';
			sodRollCap.style.width = sodRollCap.offsetWidth - config.carpet.capSubW + 'px';
			if(carpet.offsetWidth >= 730){
				start.style.display = 'block'
				clearInterval(runId);
				viewport.removeChild(sodRoll);
				viewport.removeChild(sodRollCap);
			}
		},100)
	}


	//background move and start carpet animation
	var bgMove = function(){
		var x = config.position.moveX -= config.position.bg;
		bg.style.backgroundPosition = x + 'px 0px';
		if(x <= -500){
			createZombie();
			clearInterval(runId);
			setTimeout(function(){
				bg.style.backgroundPosition = '-115px 0px';
				zombie.style.left = '1065px';
				createCarpet('carpet');
				createCarpet('sodroll');
				createCarpet('sodrollcap');
				var carpet = document.querySelector('.carpet');
				var sodRoll = document.querySelector('.sodroll');
				var sodRollCap = document.querySelector('.sodrollcap');

				carpetMove(carpet,sodRoll,sodRollCap);

			},1000)
			
		}
	}


	var runId = setInterval(bgMove,config.speed);
}

