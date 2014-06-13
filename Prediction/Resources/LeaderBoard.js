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
	backgroundImage : 'button_weekly.png',
	scrollable:'true',
		
});



var leaderboardScroll = Ti.UI.createTableView({
			  top: '15%',
			  minRowHeight: 50,
     		  backgroundColor: '#aa1a2d'
});


overall_leaderboard.addEventListener('click' , function(e){
	leaderboardScroll.removeAllChildren();
	var UserButtons = [];
	var scoreLabel = [];
	var usernamelabel = [];
	var data = [];
	var tvRow = [];
	
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
			
			tvRow[i] = Ti.UI.createTableViewRow({
											height:'auto',
										//	backgroundImage: 'matchSCore.png',	
											selectedBackgroundColor:'#aa1a2d',
											backgroundColor:'#aa1a2d'					
			});
			
			Ti.API.log(Users[i]);
			var user = Users[i].split("%");
			var btnH = '70';
			var topValue = 10 + (btnH * i);
			var per_a = (btnH/480) * 100;
			var per_b = (topValue/480)* 100;
			var btnHper = per_a.toString() + "%";
			var topValuePer = per_b .toString() + "%"; 

			scoreLabel[i]= Ti.UI.createLabel({
				right: '15%',
				top: '20%',
				text: user[1],
				color: 'yellow',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				}
			});
			usernamelabel[i]= Ti.UI.createLabel({
				left: '5%',
				top: '20%',
				color: 'yellow',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				},
				text: user[4] + ' ' + user[2]
			});
			tvRow[i].add(scoreLabel[i]);
			tvRow[i].add(usernamelabel[i]);
			data[i] = tvRow[i];
		}
	leaderboardScroll.setData(data, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
	};
		     
	xhr.send({
		"FbkID" : Ti.App.Fbid
	}); 

});

weekly_leaderboard.addEventListener('click', function(e){
	leaderboardScroll.removeAllChildren();
	var UserButtons = [];
	var scoreLabel = [];
	var usernamelabel = [];
	var data_b = [];
	var tvRow_b = [];
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
			tvRow_b[i] = Ti.UI.createTableViewRow({
											height:'auto',
										//	backgroundImage: 'matchSCore.png',	
											selectedBackgroundColor:'#aa1a2d',
											backgroundColor:'#aa1a2d'					
			});

			scoreLabel[i]= Ti.UI.createLabel({
				right: '15%',
				top: '20%',
				text: user[1],
				color: 'yellow',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				}
			});
			usernamelabel[i]= Ti.UI.createLabel({
				left: '5%',
				top: '20%',
				color: 'yellow',
				font: {
					fontSize: '20%',
					fontFamily : Ti.App.customFont
				},
				text: user[4] + '. ' + user[2]
			});
			tvRow_b[i].add(scoreLabel[i]);
			tvRow_b[i].add(usernamelabel[i]);
			data_b[i] = tvRow_b[i];
		}
	leaderboardScroll.setData(data_b, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
	};
		     
	xhr.send({
		"FbkID" : Ti.App.Fbid
	}); 

});


Ti.UI.currentWindow.add(leaderboardScroll);	


Ti.UI.currentWindow.add(weekly_leaderboard);
Ti.UI.currentWindow.add(overall_leaderboard);