Ti.include('suds.js');

var PredictionWindow = Ti.UI.createWindow({
	title: 'Match Prediction',
	url: 'Prediction.js',
	backgroundImage: 'background.png',
	barImage: 'topTitleBar.png',
	
});

var NavButton = Ti.UI.createButton({
	title: '',
	backgroundImage: 'backbutton.png'
});

var win2 = Ti.UI.currentWindow;

NavButton.addEventListener('click', function(e){
	PredictionWindow.close();
	Ti.App.Tab.open(win2);
});
PredictionWindow.leftNavButton = NavButton;
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
			//var MatchID = xmlDoc.documentElement.getElementsByTagName('sDescription');
	        if (team2 && team2.length>0) 
	        {
	            	var MatchCount = 1;
	            	for (var i = 0 ; i < team2.length; i = i + 2)
	            	{
	            	//	Ti.API.log("Match " + MatchCount + "  "+ team2.item(i).text + " " + team2.item(i + 1).text);
	            		MatchCount = MatchCount + 1;
	            		message = message + team2.item(i).text + "vs" + team2.item(i + 1).text + "%%";
	            		var blank = " ";
						var dash = "-";
						message = message.replace(blank, dash);
	            	}
					
					message = message.split(' ').join('-');
				//	Ti.API.log(message);
					var matches = [];
					var teamAimage = [];
					var teamBimage = [];
					var teamAlabel = [];
					var teamBlabel = [];

					var matchesScrollView = Ti.UI.createScrollView({
						backgroundColor: '#aa1a2d'
					});
					var match_list  = message.split('%%');

					var viewH = '80';

					for (var i = 0; i < match_list.length; i++)
					{	
						var MatchID = "Match " + (i+1).toString();
						var topValue = 10 + (viewH * i);
						matches[i]= Ti.UI.createView({
							top: topValue,
							height: viewH,
							left: '1%',
							width: '98%',
							title: match_list[i],
							backgroundImage: 'ViewBackground.png',
							teamA: '',
							teamB: '',
							Match: MatchID
						});
				//	Ti.API.log(MatchID);
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
						
						Ti.App.TeamAName = e.source.teamA;
						Ti.App.TeamBName = e.source.teamB;
						Ti.App.MatchID = e.source.Match;
						var xhr = Ti.Network.createHTTPClient();
   						xhr.open('POST','http://codespikestudios.com/prediction/UserCheck.php');
    					xhr.setRequestHeader('User-Agent','My User Agent');
    					xhr.onload = function()
     					{
       				//		Ti.API.log("Fr response is : " + this.responseText);
       						if (this.responseText == null)
       						{
       							Ti.App.Tab.open(PredictionWindow);
       						}
       						else
       						{
       				//			Ti.API.log("I am here");
       							var AlreadyPredictedWindow = Ti.UI.createWindow({
       									title: 'Match Prediction',
										backgroundImage: 'background.png',
										barImage: 'topTitleBar.png',
       							});
       							var UserPrediction = this.responseText.split("%");
       							var label = Ti.UI.createLabel({
       								Text: 'You predicted this  :' + '\n' + UserPrediction[0] + ' ' + e.source.teamA + ' ' + UserPrediction[1] + ' ' + e.source.teamB 
       							});
       							AlreadyPredictedWindow.add(label);
       						    var teamAname_A = e.source.teamA + "-Flag-256.png";
								var teamBname_B = e.source.teamB + "-Flag-256.png";	
								teamAimage = Ti.UI.createImageView({
									top: '5%',
									left: '5%',
									height: '25%',
									width: '30%',
									image: teamAname_A
								});
								teamBimage = Ti.UI.createImageView({
									top: '5%',
									right: '5%',
									height: '25%',
									width: '30%',
									image: teamBname_B
								}); 
								var score_label = Ti.UI.createLabel({
									bottom: '10%'
								});
								
								if (UserPrediction[4] == "TBP")
								{//	Ti.API.log(UserPrediction[4].text);
									score_label.text = "This game is still to be played";
									AlreadyPredictedWindow.add(score_label);
									
								}
								else
								{ 
									Ti.API.log("Match Hogya hai");
									//  Ti.API.log(UserPrediction[4]);
 									var Goals = UserPrediction[4].split("-");
 									//if correct prediction
									if (UserPrediction[0] == Goals[0] && UserPrediction[1] == Goals[1] )
									{	
										if (UserPrediction[5] == -1)
										{	
											//Ti.API.log("Inserting Score");
											var xhr_a = Ti.Network.createHTTPClient();
											xhr_a.open('POST','http://codespikestudios.com/prediction/matchScore.php');
											xhr_a.setRequestHeader('User-Agent','My User Agent');
											xhr_a.onload = function()
											{
												Ti.API.log("Inserted " + this.responseText);
													score_label.text = "You scored  20 points";
													AlreadyPredictedWindow.add(score_label);
												
											};
																	     
											xhr_a.send({
														"UserID" : Ti.App.Fbid,
														"GameID" : Ti.App.MatchID,
														"Score": 20
											});
										}
										else
										{	
											score_label.text = "You scored " + UserPrediction[5]  + "points";
											AlreadyPredictedWindow.add(score_label);
										//	Ti.API.log("jdbvjoba");
										}
									}
									//If not perfect prediction but correct team chosem
									else if ((UserPrediction[0] > UserPrediction[1] && Goals[0] > Goals[1]) || (UserPrediction[0] < UserPrediction[1] && Goals[0] < Goals[1]) || (UserPrediction[0] == UserPrediction[1] && Goals[0] == Goals[1]) )
									{
										if (UserPrediction[5] == -1)
										{	
											
											var xhr_a = Ti.Network.createHTTPClient();
											xhr_a.open('POST','http://codespikestudios.com/prediction/matchScore.php');
											xhr_a.setRequestHeader('User-Agent','My User Agent');
											xhr_a.onload = function()
											{
												
													score_label.text = "You scored  10 points";
													AlreadyPredictedWindow.add(score_label);
												
											};
																	     
											xhr_a.send({
														"UserID" : Ti.App.Fbid,
														"GameID" : Ti.App.MatchID,
														"Score": 10
											});
										}
										else
										{	
											score_label.text = "You scored " + UserPrediction[5]  + "points";
											AlreadyPredictedWindow.add(score_label);
										}
									}
									else
									{
										if (UserPrediction[5] == -1)
										{	
											
											var xhr_a = Ti.Network.createHTTPClient();
											xhr_a.open('POST','http://codespikestudios.com/prediction/matchScore.php');
											xhr_a.setRequestHeader('User-Agent','My User Agent');
											xhr_a.onload = function()
											{
												
													score_label.text = "You scored 0 points";
													AlreadyPredictedWindow.add(score_label);
												
											};
																	     
											xhr_a.send({
														"UserID" : Ti.App.Fbid,
														"GameID" : Ti.App.MatchID,
														"Score": 0
											});
										}
										else
										{	
											score_label.text = "You scored "  + UserPrediction[5]  + " points";
											AlreadyPredictedWindow.add(score_label);
										}
									} 
								}
								AlreadyPredictedWindow.add(teamAimage);
								AlreadyPredictedWindow.add(teamBimage);
       							Ti.App.Tab.open(AlreadyPredictedWindow);
       						}

     					};
     
        				xhr.send({
        					"UserID": Ti.App.Fbid,
        					"GameID": Ti.App.MatchID
    					});
					});
					
					Ti.UI.currentWindow.add(matchesScrollView);
					}

	         }
			else
	       	{
	        //     Ti.API.log('Nai chala');	
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
	Ti.App.currentNavGroup.openWindow();
	Ti.App.TeamAName = e.source.teamA;
	Ti.App.TeamBName = e.source.teamB;
	});
}
Ti.UI.currentWindow.add(matchesScrollView);
*/