var overall_leaderboard = Ti.UI.createButton({
	top: '5%',
	left: '5%',
	height: '12%',
	width: '25%',
	backgroundImage : 'button_overall.png'	
});


var weekly_leaderboard = Ti.UI.createButton({
	top: '5%',
	right: '5%',
	height: '12%',
	width: '25%',	
	backgroundImage : 'button_weekly.png'	
});



var leaderboardScroll = Ti.UI.createScrollView({
	left: '0%',
	width: '100%',
	top: '20%',
	scrollType:'vertical',
});

overall_leaderboard.addEventListener('click' , function(e){
	leaderboardScroll.removeAllChildren();
	var UserButtons = [];
	var scoreLabel = [];
	var usernamelabel = [];
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('POST','http://codespikestudios.com/prediction/LeaderBoard.php');
	xhr.setRequestHeader('User-Agent','My User Agent');
	xhr.onload = function()		
	{	
	
		var Response = this.responseText;
		Ti.API.log(Response);
		var Users = Response.split("^");
		for (var i = 0; i < Users.length - 1; i++)
		{	
			Ti.API.log(Users[i]);
			var user = Users[i].split("%");
			var btnH = '70';
			var topValue = 10 + (btnH * i);
			var per_a = (btnH/480) * 100;
			var per_b = (topValue/480)* 100;
			var btnHper = per_a.toString() + "%";
			var topValuePer = per_b .toString() + "%"; 
			UserButtons[i]= Ti.UI.createButton({
				left: '5%',
				width: '81.25%',
				top: topValuePer,
				height: btnHper,
				backgroundImage: 'leaderboard_rowBackground.png'
			});
			scoreLabel[i]= Ti.UI.createLabel({
				right: '15%',
				top: '20%',
				text: user[1],
				color: '840012',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				}
			});
			usernamelabel[i]= Ti.UI.createLabel({
				left: '5%',
				top: '20%',
				text: user[1],
				color: '840012',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				},
				text: user[2]
			});
			UserButtons[i].add(scoreLabel[i]);
			UserButtons[i].add(usernamelabel[i]);
			leaderboardScroll.add(UserButtons[i]);
		}
	
	};
		     
	xhr.send({
	
	}); 

});

weekly_leaderboard.addEventListener('click', function(e){
	leaderboardScroll.removeAllChildren();
	var UserButtons = [];
	var scoreLabel = [];
	var usernamelabel = [];
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('POST','http://codespikestudios.com/prediction/WeeklyLeaderBoard.php');
	xhr.setRequestHeader('User-Agent','My User Agent');
	xhr.onload = function()		
	{	
	
		var Response = this.responseText;
		Ti.API.log(Response);
		var Users = Response.split("^");
		for (var i = 0; i < Users.length - 1; i++)
		{	
			Ti.API.log(Users[i]);
			var user = Users[i].split("%");
			var btnH = '70';
			var topValue = 10 + (btnH * i);
			var per_a = (btnH/480) * 100;
			var per_b = (topValue/480)* 100;
			var btnHper = per_a.toString() + "%";
			var topValuePer = per_b .toString() + "%"; 
			UserButtons[i]= Ti.UI.createButton({
				left: '5%',
				width: '81.25%',
				top: topValuePer,
				height: btnHper,
				backgroundImage: 'leaderboard_rowBackground.png'
			});
			scoreLabel[i]= Ti.UI.createLabel({
				right: '15%',
				top: '20%',
				text: user[1],
				color: '840012',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				}
			});
			usernamelabel[i]= Ti.UI.createLabel({
				left: '5%',
				top: '20%',
				text: user[1],
				color: '840012',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				},
				text: user[2]
			});
			UserButtons[i].add(scoreLabel[i]);
			UserButtons[i].add(usernamelabel[i]);
			leaderboardScroll.add(UserButtons[i]);
		}
	
	};
		     
	xhr.send({
	
	}); 

});


Ti.UI.currentWindow.add(leaderboardScroll);	


Ti.UI.currentWindow.add(weekly_leaderboard);
Ti.UI.currentWindow.add(overall_leaderboard);