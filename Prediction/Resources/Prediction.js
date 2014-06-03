var GoalTeamA = '';
var GoalTeamB = '';
var DrawGoal = '';



function Get_friends(){
		var fb = require('facebook');
		fb.appid = 200188770129860;
		//fb.appid = 495338853813822;
		fb.permissions = ['user_friends' , 'publish_stream', 'read_stream'];
		var query = "SELECT uid, name, pic_square, status FROM user ";
		query +=  "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + Ti.App.Fbid + ")";
		//query += "order by last_name limit 20";
		Ti.API.info('user id ' + fb.uid);
		fb.request('fql.query', {query: query},  function(r) {
			if (!r.success) {
				if (r.error) {
					alert(r.error);
				} else {
					alert("call was unsuccessful");
				}
				return;
			}
			else{
				
				var result = JSON.parse(r.result);
				
    			var message = "";
				for (var c = 0; c < result.length ; c++)
				{
					var row = result[c];
					Ti.API.log(c + " " + row.uid);
					message = message + row.uid + "%%";
					
					
				}	
					var RetrievedText = "";
					var xhr = Ti.Network.createHTTPClient();
					xhr.open('POST','http://codespikestudios.com/prediction/GetFriends.php');
    				xhr.setRequestHeader('User-Agent','My User Agent');
    				xhr.onload = function()
     				{	
     					RetrievedText = this.responseText;
     					Ti.API.log("Fr response is : " + this.responseText);
     					var win = Ti.UI.createWindow({title:'Facebook Query'});
     					var tableView = Ti.UI.createTableView({minRowHeight:100});
						win.add(tableView);
						var data = [];
     					if (RetrievedText == null)
     					{
     						Ti.App.currentNavGroup.openWindow(win);
     					}
     					else
     					{
     						var Rows = RetrievedText.split("-");
							
      						for (var d = 0 ; d < Rows.length ; d++)
							{	
								for (var c = 0; c < result.length ; c++)
								{	
								//Ti.API.log(Rows[d]);
									var Getuid = Rows[d].split(" ");
									var uid = Getuid[2];
									var row_b = result[c];
									if (row_b.uid == uid)
									{
										Ti.API.log(uid);
										var tvRow = Ti.UI.createTableViewRow({
											height:'auto',
											selectedBackgroundColor:'#fff',
											backgroundColor:'#fff'
										});
										var imageView;
										imageView = Ti.UI.createImageView({
											image:row_b.pic_square === null ? '/images/custom_tableview/user.png' : row_b.pic_square,
											left:10,
											width:50,
											height:50
										});
	
										tvRow.add(imageView);
	
										var userLabel = Ti.UI.createLabel({
											font:{fontSize:16, fontWeight:'bold'},
											left:70,
											top:5,
											right:5,
											height:20,
											color:'#576996',
											text:row_b.name
										});
										tvRow.add(userLabel);
	
										var statusLabel = Ti.UI.createLabel({
											font:{fontSize:13},
											left:70,
											top:25,
											right:20,
											height:'auto',
											color:'#222',
											text: Getuid[0] + " - " + Getuid[1]
										});
										tvRow.add(statusLabel);
		
										tvRow.uid = row_b.uid;
		
										data[c] = tvRow;
									}
								}
							}
								tableView.setData(data, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
								var NavButton = Ti.UI.createButton({
									title: '',
									backgroundImage: 'backbutton.png'
								});
								win.leftNavButton = NavButton;
								NavButton.addEventListener('click', function(e){
									Ti.App.currentNavGroup.openWindow(win2);
								}); 
								
								Ti.App.currentNavGroup.openWindow(win);
    
     					}
     					 				};
					
      				xhr.send({
        				"FriendsUID": message,
        				"GameID": Ti.App.MatchID
					}); 
				Ti.API.info(message);
			}
			
		}); 
}



var friendsPredictions = Ti.UI.createWindow({
		title: 'Match Prediction',
		url: 'FriendsPredictions.js',
		backgroundColor: '#8ac60c'
});

function getData(){	
	var GoalsA = 
	[	
		{properties: {title:'0',height:44}},
		{properties: {title:'1',height:44}},
		{properties: {title:'2',height:44}},
		{properties: {title:'3',height:44}},
		{properties: {title:'4',height:44}},
		{properties: {title:'5',height:44}},
		{properties: {title:'6',height:44}},
		{properties: {title:'7',height:44}},
		{properties: {title:'8',height:44}},
		{properties: {title:'9',height:44}},
		{properties: {title:'10',height:44}},
		{properties: {title:'11',height:44}},
		{properties: {title:'12',height:44}},
		{properties: {title:'13',height:44}},
		{properties: {title:'14',height:44}},
		{properties: {title:'15',height:44}},
	];
	return GoalsA;
}

function getDrawData(){	
	var DrawGoals = 
	[	
		{properties: {title:'0 - 0',height:44}},
		{properties: {title:'1 - 1',height:44}},
		{properties: {title:'2 - 2',height:44}},
		{properties: {title:'3 - 3',height:44}},
		{properties: {title:'4 - 4',height:44}},
		{properties: {title:'5 - 5',height:44}},
		{properties: {title:'6 - 6',height:44}},
		{properties: {title:'7 - 7',height:44}},
		{properties: {title:'8 - 8',height:44}},
		{properties: {title:'9 - 9',height:44}},
		{properties: {title:'10 - 10',height:44}},
		{properties: {title:'11 - 11',height:44}},
		{properties: {title:'12 - 12',height:44}},
		{properties: {title:'13 - 13',height:44}},
		{properties: {title:'14 - 14',height:44}},
		{properties: {title:'15 - 15',height:44}},
	];
	return DrawGoals;
}

var section1 = Ti.UI.createListSection({headerTitle:'Goals'});
section1.setItems(getData());
var GoalsSelectA = Ti.UI.createListView({
	top: '60%',
	width: '25%',
	height : '20%',
	left: '5%',
	sections: [ section1 ],
	backgroundColor: 'blue'
});

var section2 = Ti.UI.createListSection({headerTitle:'Goals'});
section2.setItems(getDrawData());
var GoalsSelectC = Ti.UI.createListView({
	top: '60%',
	width: '30%',
	height : '20%',
	left: '35%',
	sections: [ section2 ],
	backgroundColor: 'blue'
});

var GoalsSelectB = Ti.UI.createListView({
	top: '60%',
	width: '25%',
	height : '20%',
	right: '5%',
	sections: [ section1 ],
	backgroundColor: 'blue'
});


Ti.UI.currentWindow.add(GoalsSelectA);
GoalsSelectA.hide();
Ti.UI.currentWindow.add(GoalsSelectB);
GoalsSelectB.hide();
Ti.UI.currentWindow.add(GoalsSelectC);
GoalsSelectC.hide();


var teamAname = Ti.App.TeamAName + "-Flag-256.png";
var teamBname = Ti.App.TeamBName + "-Flag-256.png";	
var teamAimage = Ti.UI.createImageView({
	top: '5%',
	left: '5%',
	height: '25%',
	width: '30%',
	image: teamAname
});
var teamBimage = Ti.UI.createImageView({
	top: '5%',
	right: '5%',
	height: '25%',
	width: '30%',
	image: teamBname
}); 

var Vsimage = Ti.UI.createImageView({
	top: '15%',
	right: '40%%',
	height: '10%',
	width: '20%',
	image: 'Vs.png'
});  

var winButton = Ti.UI.createButton({
	top: '45%',
	left: '2.5%',
	height: '10%',
	width: '30%',
	backgroundImage: 'greenbutton.png',
	title: 'WIN',
	toggle: false
});

var drawButton = Ti.UI.createButton({
	top: '45%',
	left: '35%',
	height: '10%',
	width: '30%',
	backgroundImage: 'greenbutton.png',
	title: 'DRAW',
	toggle: false
});

var winBButton = Ti.UI.createButton({
	top: '45%',
	left: '67.5%',
	height: '10%',
	width: '30%',
	backgroundImage: 'greenbutton.png',
	title: 'WIN',
	toggle: false
});

winButton.addEventListener('click', function(e){
	SubmitButton.hide();
	GoalsSelectB.hide();
	if (drawButton.toggle == true)
	{
		drawButton.toggle = false;
		drawButton.backgroundImage = "greenbutton.png";
	}
	if (winBButton.toggle == true)
	{
		winBButton.toggle = false;
		winBButton.backgroundImage = "greenbutton.png";
	}
	if (e.source.toggle == false)
	{
		e.source.toggle = true;
		e.source.backgroundImage = "bluebutton.png";
		GoalsSelectA.show();
		//GoalsSelectB.show();
		GoalsSelectC.hide();
	}
});

drawButton.addEventListener('click', function(e){
	SubmitButton.hide();
	if (winButton.toggle == true)
	{
		winButton.toggle = false;
		winButton.backgroundImage = "greenbutton.png";
	}
	if (winBButton.toggle == true)
	{
		winBButton.toggle = false;
		winBButton.backgroundImage = "greenbutton.png";
	}
	if (e.source.toggle == false)
	{
		e.source.toggle = true;
		e.source.backgroundImage = "bluebutton.png";
		GoalsSelectA.hide();
		GoalsSelectB.hide();
		GoalsSelectC.show();
	}
});

winBButton.addEventListener('click', function(e){
	GoalsSelectA.hide();
	SubmitButton.hide();
	if (winButton.toggle == true)
	{
		winButton.toggle = false;
		winButton.backgroundImage = "greenbutton.png";
	}
	if (drawButton.toggle == true)
	{
		drawButton.toggle = false;
		drawButton.backgroundImage = "greenbutton.png";
	}
	if (e.source.toggle == false)
	{
		e.source.toggle = true;
		e.source.backgroundImage = "bluebutton.png";
		//GoalsSelectA.show();
		GoalsSelectB.show();
		GoalsSelectC.hide();
	}
});


GoalsSelectA.addEventListener('itemclick', function(e){
	GoalTeamA = section1.getItemAt(e.itemIndex).properties.title;
	Ti.API.log(GoalTeamA);	
	if (winButton.toggle == true)
	{
		GoalsSelectB.show();
	}
	else 
	{
		if (parseInt(GoalTeamA) > parseInt(GoalTeamB))
		{	
			GoalsSelectA.hide();
			SubmitButton.hide();
			var dialog = Ti.UI.createAlertDialog({
    			message: 'Your score prediction does not match with your match result prediction ' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else if (parseInt(GoalTeamB) == parseInt(GoalTeamA))
		{	
			GoalsSelectA.hide();
			SubmitButton.hide();
			var dialog = Ti.UI.createAlertDialog({
    			message: 'You have NOT predicted a draw as your predicted score states' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else
		{
			SubmitButton.show();
		}
	}
});

GoalsSelectB.addEventListener('itemclick', function(e){
	GoalTeamB = section1.getItemAt(e.itemIndex).properties.title;
	Ti.API.log(GoalTeamB);
	if (winBButton.toggle == true)
	{
		GoalsSelectA.show();
	}
	else 
	{
		if (parseInt(GoalTeamB) > parseInt(GoalTeamA))
		{	
			GoalsSelectB.hide();
			SubmitButton.hide();
			var dialog = Ti.UI.createAlertDialog({
    			message: 'Your score prediction does not match with your match result prediction ' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else if (parseInt(GoalTeamB) == parseInt(GoalTeamA))
		{	
			GoalsSelectB.hide();
			SubmitButton.hide();
			var dialog = Ti.UI.createAlertDialog({
    			message: 'You have NOT predicted a draw as your predicted score states' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else
		{
			SubmitButton.show();
		}
	}
});

GoalsSelectC.addEventListener('itemclick', function(e){
	DrawGoal = section2.getItemAt(e.itemIndex).properties.title;
	Ti.API.log(DrawGoal);
	var goal = DrawGoal.split('-');
	GoalTeamA = goal[0];
	GoalTeamB =  goal[1];
	SubmitButton.show();
});


SubmitButton = Ti.UI.createButton({
	bottom: '10%',
	title: ' SUBMIT ',
	backgroundImage: 'boxx.png',
	width: '60%'
});

Ti.UI.currentWindow.add(SubmitButton);
SubmitButton.hide();

SubmitButton.addEventListener('click', function(e){
	Ti.API.log("Checking Goals: " + parseInt(GoalTeamA) + " " + parseInt(GoalTeamB));
	
	if (drawButton.toggle == true)
	{
		var dialog = Ti.UI.createAlertDialog({
    		message: 'Your Prediction is : ' + DrawGoal,
    		buttonNames: ['Confirm', 'Cancel'],
    		title: 'Confirm Your Score'
 	});
 		
 	dialog.addEventListener('click', function(e){
   		if (e.index === 0)
    	{
      		Ti.API.info('The confirm button was clicked');
    		var xhr = Ti.Network.createHTTPClient();
    		xhr.open('POST','http://codespikestudios.com/prediction/Test.php');
    		xhr.setRequestHeader('User-Agent','My User Agent');
    		xhr.onload = function()
     	{
      		Ti.API.log("Fr response is : " + this.responseText);

     	};
     
      	xhr.send({
        	"teamGoalsA":parseInt(GoalTeamA),
        	"teamGoalsB":parseInt(GoalTeamB),
        	"FbID":Ti.App.Fbid,
        	"matchID": Ti.App.MatchID
		});
		Get_friends();
    	}
    	
    	if (e.index === 1)
   		{
   			Ti.API.log('Cancel was clicked');
   		}
  	});
  	dialog.show();
	}
	if (winButton.toggle == true)
	{
		if (parseInt(GoalTeamB) > parseInt(GoalTeamA))
		{
			var dialog = Ti.UI.createAlertDialog({
    			message: 'Your score prediction does not match with your match result prediction ' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else if (parseInt(GoalTeamB) == parseInt(GoalTeamA))
		{
			var dialog = Ti.UI.createAlertDialog({
    			message: 'You have NOT predicted a draw as your predicted score states' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else
		{
			var dialog = Ti.UI.createAlertDialog({
    			message: 'Your Prediction is : ' + GoalTeamA + " - " + GoalTeamB,
    			buttonNames: ['Confirm', 'Cancel'],
    			title: 'Confirm Your Score'
 			});
 			dialog.addEventListener('click', function(e){
   				if (e.index === 0)
    			{
      				Ti.API.info('The confirm button was clicked');
    				var xhr = Ti.Network.createHTTPClient();
    				xhr.open('POST','http://codespikestudios.com/prediction/Test.php');
    				xhr.setRequestHeader('User-Agent','My User Agent');
    				xhr.onload = function()
     			{
      				Ti.API.log("Fr response is : " + this.responseText);
				};
     
      			xhr.send({
        			"teamGoalsA":GoalTeamA,
        			"teamGoalsB":GoalTeamB,
        			"FbID":Ti.App.Fbid,
        			"matchID": Ti.App.MatchID
				});
				Get_friends();
    			}
    	
    			if (e.index === 1)
   				{
   					Ti.API.log('Cancel was clicked');
   				}
  				});
  			dialog.show();
		}
	}
	if (winBButton.toggle == true)
	{	
		
		if (parseInt(GoalTeamA) > parseInt(GoalTeamB))
		{
			var dialog = Ti.UI.createAlertDialog({
    			message: 'Your score prediction does not match with your match result prediction ' ,
    			ok: 'Okay', 
    			title: 'Confirm Your Score'
 			}).show();
		}
		else if (parseInt(GoalTeamA) == parseInt(GoalTeamB))
		{
			var dialog = Ti.UI.createAlertDialog({
    			message: 'You have NOT predicted a draw as your predicted score states' ,
    			ok: 'Okay',
    			title: 'Confirm Your Score'
 			}).show();
		}
		else
		{
			var dialog = Ti.UI.createAlertDialog({
    			message: 'Your Prediction is : ' + GoalTeamA + " - " + GoalTeamB,
    			buttonNames: ['Confirm', 'Cancel'],
    			title: 'Confirm Your Score'
 			});
 			dialog.addEventListener('click', function(e){
   			if (e.index === 0)
    		{
      			Ti.API.info('The confirm button was clicked');
    			var xhr = Ti.Network.createHTTPClient();
    			xhr.open('POST','http://codespikestudios.com/prediction/Test.php');
    			xhr.setRequestHeader('User-Agent','My User Agent');
    			xhr.onload = function()
     			{
      				Ti.API.log("Fr response is : " + this.responseText);

     			};
     
      			xhr.send({
        			"teamGoalsA":GoalTeamA,
        			"teamGoalsB":GoalTeamB,
        			"FbID":Ti.App.Fbid,
        			"matchID": Ti.App.MatchID
				});
				Get_friends();
    			}
    	
    		if (e.index === 1)
   			{
   				Ti.API.log('Cancel was clicked');
   			}
  			});
    		dialog.show();
		}
		
	}
});

Ti.UI.currentWindow.add(winButton);
Ti.UI.currentWindow.add(drawButton);
Ti.UI.currentWindow.add(winBButton);
Ti.UI.currentWindow.add(teamAimage);
Ti.UI.currentWindow.add(teamBimage);
Ti.UI.currentWindow.add(Vsimage);