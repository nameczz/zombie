var sunShineAnimation = function(){
	var config = {
		width : 400,
		height : 100,
		sunshine : {
			left : 122 ,
			top : -5 ,
			createSpeed : 10000,
			downSpeed : 20 ,
			missingSpeed : 3000,
			downLen : 1,
			radius : 40 ,
			uplen : 20,
			endX : 150,
			endY : 35
		},
		score : 50,

	}
	//create sunshine,scoreboard into dom, random X , fixed Y , animation
	var bg = document.getElementById('bg'),
		scoreInit = 75,
		shooterCard = document.getElementById('shooterCard');

	var createScoreboard = function(){
		var scoreboard = document.createElement('div');
		scoreboard.className = 'scoreboard';

		var score = document.createElement('p');
		score.id = 'score';
		score.innerHTML = scoreInit;

		scoreboard.appendChild(score)
		bg.appendChild(scoreboard)
	}
	//sunshine click 
	var sunshineBack = function(){
		var lenX = this.offsetLeft + config.sunshine.radius,
			lenY = this.offsetTop + config.sunshine.radius,
			roadLen = Math.sqrt(lenX * lenX + lenY * lenY),
			speedX = lenX / roadLen ,
			speedY = lenY / roadLen
		var _this = this;			 
		var runIdX = setInterval(function(){

			_this.style.left = _this.offsetLeft - speedX * config.sunshine.uplen + 'px';
			_this.style.top = _this.offsetTop - speedY * config.sunshine.uplen + 'px';

			if(_this.offsetLeft <=  config.sunshine.endX && _this.offsetTop <= config.sunshine.endY){
				clearInterval(runIdX);
				_this.style.left = config.sunshine.left + 'px';
				_this.style.top = config.sunshine.top + 'px';
				setTimeout(function(){
					bg.removeChild(_this);
					var num = Number(document.getElementById('score').innerHTML);
					num += config.score;
					//用visibility不行，无法调用。Display就可以
					num >= 125 ? shooterCard.style.display = 'block' : shooterCard.style.display = 'none'
			
					document.getElementById('score').innerHTML = num;

				},500)
			}

		},30)

		
	}

	var createSunshine = function(){
		var sunshine = document.createElement('div');
		sunshine.className = 'sunshine';

		sunshine.style.left = config.sunshine.endX + Math.random() * config.width + 'px';

		bg.appendChild(sunshine);

		
		var runId = setInterval(function(){
			sunshine.style.top = sunshine.offsetTop + config.sunshine.downLen + 'px';
			if(sunshine.offsetTop >= 520 ){
				clearInterval(runId);
				setTimeout(function(){
					bg.removeChild(sunshine);
				},config.sunshine.missingSpeed)
			}
		},config.sunshine.downSpeed)

		sunshine.addEventListener('click',sunshineBack);//this只能在addEvent里可以调用，在onclick不行
		sunshine.onclick = function(){
			//sunshineBack(); 报错
			clearInterval(runId);
		}

	}


	createSunshine();
	setInterval(createSunshine,config.sunshine.createSpeed)
	createScoreboard();


	
}