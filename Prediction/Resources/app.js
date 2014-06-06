Ti.include('suds.js');

var tabGroup = Ti.UI.createTabGroup({
	tabDividerColor : 'yellow'
});

var win1 = Titanium.UI.createWindow({  
    title:'Window 1',
    backgroundImage: 'background.png',
    barImage: 'topTitleBar.png' 
});

var win2 = Ti.UI.createWindow({
	title: 'Match Center',
	url: 'matchCentre.js',
	backgroundImage: 'background.png',
	barImage: 'topTitleBar.png' 
});

var favTeam = Ti.UI.createWindow({
	title: 'Select Your Team',
	 backgroundImage: 'background.png',
	url: 'FavoriteTeam.js'
});

var leaderboard = Ti.UI.createWindow({
	title: 'LeaderBoard',
	 backgroundImage: 'background.png',
	url: 'LeaderBoard.js',
	barImage: 'topTitleBar.png' 
});

var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: win2
	});

var appTab = Ti.UI.createTab({
	title: 'Match Preditcion',
	icon: 'KS_nav_views.png',
	window: win2
});

var leaderboardTab = Ti.UI.createTab({
	title: 'Leaderboard',
	icon: 'KS_nav_ui.png',
	window: leaderboard
});
tabGroup.addTab(appTab);
tabGroup.addTab(leaderboardTab);

Ti.App.TabGroup = tabGroup;
Ti.App.Tab = appTab;

var userId = Ti.UI.createLabel({
	title:'No user Id',
	height:'auto',
	top: '20%',
	left: '20%',
	width: '60%',
	height: '20%',
	font:{fontSize:13},
	color:'#777'
});

var checkUseridButton = Ti.UI.createButton({
	title:'Display Properties',
	top: '50%',
	left: '20%',
	height: '10%',
	width: '60%'
});

var queryButton =  Ti.UI.createButton({
		title:'Run Query',
		width:200,
		height:40,
		top:10
	});

win1.add(queryButton);

var nextWinButton = Ti.UI.createButton({
	title: 'NEXT',
	top : '80%',
    left: '20%',
    width: '60%',
});

nextWinButton.addEventListener('click', function(e){
	win1.close();
	Ti.App.currentNavGroup = NavGroup;
	//NavGroup.open();
	tabGroup.open();
});

//favTeam.add(nextWinButton);


var fb = require('facebook');
fb.appid = 200188770129860;
//fb.appid = 495338853813822;
fb.permissions = ['user_friends' , 'publish_stream', 'read_stream'];
fb.addEventListener('login', function(e) 
{
    if (e.success) 
    {
        //userId.text = " User Id = " + fb.uid + " User Name: " + JSON.stringify(fb.data);
        Ti.API.log(fb.uid);
        fb.requestWithGraphPath('me', {}, 'GET', function(e) {
    	if (e.success) 
    	{	
    		var JsonString = e.result;
    		var FbDetailObject = JSON.parse(JsonString);
    		userId.text = FbDetailObject.name + " " + fb.uid;
    		Ti.App.Fbid = fb.uid;
    		Ti.App.Username = FbDetailObject.name;
        	Ti.API.log(e.result + " This is my Data");
			favTeam.open();
   		} 
   		else if (e.error) 
   		{
        	alert(e.error);
    	} 
   	    else 
   	    {
        	alert('Unknown response');
    	}
});
    }
});
 fb.authorize(); 
fb.addEventListener('logout', function(e) {
    	//alert('Logged out');
});

// Add the button.  Note that it doesn't need a click event listener.
win1.add(fb.createLoginButton({
    top : '60%',
    left: '20%',
    width: '60%',
    style : fb.BUTTON_STYLE_WIDE
}));

checkUseridButton.addEventListener('click', function(e){
if (!fb.loggedIn)
		{
			Ti.UI.createAlertDialog({title:'Facebook', message:'Login before accessing properties'}).show();
			return;
		}	
});




queryButton.addEventListener('click', function(e){

		var query = "SELECT uid, name, pic_square, status FROM user ";
		query +=  "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + fb.uid + ")";
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
     						win.open();
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
								win.open({modal:true});
    
     					}
     					 				};
					
      				xhr.send({
        				"FriendsUID": message,
        				"GameID": "Match 10"
					}); 
				Ti.API.info(message);
			}
			
		}); 
});

win1.add(checkUseridButton);
win1.add(userId);
win1.add(nextWinButton);
win1.open();
