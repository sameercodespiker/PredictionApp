var win3 = Ti.UI.createWindow({
	title: 'Match centre',
	url: 'Prediction.js',
	backgroundColor: '#8ac60c'
});

var message = "BrazilvsCroatia%%MexicovsCameroon%%SpainvsNetherlands%%ChilevsAustralia%%ColombiavsGreece%%UruguayvsCosta-Rica%%EnglandvsItaly%%Ivory-CoastvsJapan";
var matches = [];
var teamAimage = [];
var teamBimage = [];
var teamAlabel = [];
var teamBlabel = [];

var matchesScrollView = Ti.UI.createScrollView({
	backgroundColor: '#8ac60c'
});
var match_list  = message.split('%%');

var viewH = '60';

for (var i = 0; i < match_list.length; i++)
	{	
		var topValue = 10 + (viewH * i);
		matches[i]= Ti.UI.createView({
			top: topValue,
			height: viewH,
			left: '10%',
			width: '80%',
			title: match_list[i],
			backgroundImage: 'ViewBackground.png',
			teamA: '',
			teamB: '' 
		});
		
		var teams = match_list[i].split('vs');
		matches[i].teamA = teams[0];
		matches[i].teamB = teams[1];
		teamAlabel[i] = Ti.UI.createLabel({
			text: teams[0],
			top: '35%',
			left: '5%',
		});
		teamBlabel[i] = Ti.UI.createLabel({
			text: teams[1],
			bottom: '35%',
			right: '5%',
		});
		matches[i].add(teamAlabel[i]);
		matches[i].add(teamBlabel[i]);
		
		var teamAname = teams[0] + "-Flag-256.png";
		var teamBname = teams[1] + "-Flag-256.png";	
		teamAimage[i] = Ti.UI.createImageView({
			top: '10%',
			left: '5%',
			height: '35%',
			width: '10%',
			image: teamAname
		});
		teamBimage[i] = Ti.UI.createImageView({
			bottom: '10%',
			right: '5%',
			height: '35%',
			width: '10%',
			image: teamBname
		}); 
		matches[i].add(teamAimage[i]);
		matches[i].add(teamBimage[i]);
		
		matchesScrollView.add(matches[i]);
		
		matches[i].addEventListener('click', function(e){
			Ti.App.currentNavGroup.openWindow(win3);
			Ti.App.TeamAName = e.source.teamA;
			Ti.App.TeamBName = e.source.teamB;

		});
	}

Ti.UI.currentWindow.add(matchesScrollView);
