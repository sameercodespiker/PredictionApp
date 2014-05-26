Ti.include('suds.js');

var win3 = Ti.UI.createWindow({
	title: 'Match Prediction',
	url: 'Prediction.js',
	backgroundColor: '#8ac60c'
});

var NavButton = Ti.UI.createButton({
	title: '',
	backgroundImage: 'backbutton.png'
});

var win2 = Ti.UI.currentWindow;

NavButton.addEventListener('click', function(e){
	win3.close();
	Ti.App.currentNavGroup.openWindow(win2);
});
win3.leftNavButton = NavButton;
var message = "" ;
var flags = "";
var url_abc = "http://footballpool.dataaccess.eu/data/info.wso";
	var callparams_abc = {

	};

	var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://footballpool.dataaccess.eu'
	});
	
	try 
	{
	    	suds_abc.invoke('AllGames', callparams_abc, function(xmlDoc) {
	        var team2 = xmlDoc.documentElement.getElementsByTagName('sName');
	        var TeamFlags = xmlDoc.documentElement.getElementsByTagName('sCountryFlagLarge');
			
	        if (team2 && team2.length>0) 
	        {
	            	var MatchCount = 1;
	            	for (var i = 0 ; i < team2.length; i = i + 2)
	            	{
	            		Ti.API.log("Match " + MatchCount + "  "+ team2.item(i).text + " " + team2.item(i + 1).text);
	            		MatchCount = MatchCount + 1;
	            		message = message + team2.item(i).text + "vs" + team2.item(i + 1).text + "%%";
	            		var blank = " ";
						var dash = "-";
						message = message.replace(blank, dash);
	            	}
					
					message = message.split(' ').join('-');
					Ti.API.log(message);
					var matches = [];
					var teamAimage = [];
					var teamBimage = [];
					var teamAlabel = [];
					var teamBlabel = [];

					var matchesScrollView = Ti.UI.createScrollView({
						backgroundColor: '#8ac60c'
					});
					var match_list  = message.split('%%');

					var viewH = '80';

					for (var i = 0; i < match_list.length; i++)
					{	
						var topValue = 10 + (viewH * i);
						matches[i]= Ti.UI.createView({
							top: topValue,
							height: viewH,
							left: '1%',
							width: '98%',
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
					Ti.UI.currentWindow.add(matchesScrollView);
					}

	         }
			else
	       	{
	             Ti.API.log('Nai chala');	
	        }
			});
			}
	catch(e) 
	 {
	    Ti.API.error('Error: ' + e);
	 } 



/*var message = "BrazilvsCroatia%%MexicovsCameroon%%SpainvsNetherlands%%ChilevsAustralia%%ColumbiavsGreece%%UruguayvsCosta Rica%%EnglandvsItaly%%Ivory CoastvsJapan%%SwitzerlandvsEcuador%%FrancevsHonduras%%GermanyvsPortugal%%IranvsNigeria";
//var message = "BrazilvsCroatia%%MexicovsCameroon%%SpainvsNetherlands%%ChilevsAustralia%%ColombiavsGreece%%UruguayvsCosta-Rica%%EnglandvsItaly%%Ivory-CoastvsJapan";
var blank = " ";
var dash = "-";
//message = message.replace(" ", "-");
message = message.split(' ').join('-');
Ti.API.log(message);
var currentTime = new Date();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();

var TimeGot = month+"/"+day+"/"+year+" -  "+hours +":"+minutes;
Ti.API.log(TimeGot);
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
		left: '1%',
		width: '98%',
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
*/