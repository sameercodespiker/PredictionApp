var leaderboardScroll = Ti.UI.createScrollView({
	left: '0%',
	width: '100%',
	top: '6.25%',
	scrollType:'vertical',
});

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
	var Users = Response.split("---");
	for (var i = 0; i < Users.length - 1; i++)
	{	
		Ti.API.log(Users[i]);
		var user = Users[i].split("--");
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
			font: '10%'
		});
		usernamelabel[i]= Ti.UI.createLabel({
			left: '15%',
			top: '20%',
			text: user[1],
			color: '840012',
			font: '10%',
			text: user[2]
		});
		UserButtons[i].add(scoreLabel[i]);
		UserButtons[i].add(usernamelabel[i]);
		leaderboardScroll.add(UserButtons[i]);
	}

};
	     
xhr.send({

}); 

Ti.UI.currentWindow.add(leaderboardScroll);	