Ti.include('suds.js');

var PickTeam = Ti.UI.createLabel({
    text: 'PICK YOUR TEAM',
    font: {
		fontSize: '25%',
		fontFamily : Ti.App.customFont
	},
	color: 'FFA302',
	center: {x:'50%' , y:'8%'}
});

var TeamRules = Ti.UI.createLabel({
    text: '-Favorite team can be chosen only once' + '\n' + '-Bonus Points will be awarded everytime your team proceeds to the next round',
    font: {
		fontSize: '11%',
		fontFamily : Ti.App.customFont
	},
	color: 'FFA302',
	center: {x:'50%' , y:'15%'}
});

var TeamsScrollView = Ti.UI.createScrollView({
	showHorizontalScrollIndicator: true,
	top: '10%',
	height: '60%'
});
var teamFlags = [];
var CountryName =[];
var url_abc = "http://footballpool.dataaccess.eu/data/info.wso";
var callparams_abc = {

	};
var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://footballpool.dataaccess.eu'
});
	
try 
	{
	    	suds_abc.invoke('Teams', callparams_abc, function(xmlDoc) {
	        var TeamName = xmlDoc.documentElement.getElementsByTagName('sName');
	        if (TeamName.length > 0)
	        {
	        	
	      /*    var TopValue_b = (topValue/480)* 100;
	          	var perTopVakue = TopValue_b.toString() + '%';
	          	var percentage = (btnH/480)* 100;
	          	var perBtnH = percentage.toString() + '%'; */
	          	
	          	var btnW = '200';

	        	for (var i = 0; i < TeamName.length; i++)
	        	{	
	        		var btnW = '200';
	          		var widthValue = 40 + ( btnW * i);
	          		
	          		var btnWiPad = '300';
	          		var widthValueiPad = 70 + ( btnWiPad * i);
	          		var Name = TeamName.item(i).text.split(' ').join('-');
	          		if (Name == "Bosnia-&-Herzegovina")
						{
							Name = "Bosnia";
						}
	        		Ti.API.log( Name);
	        		var teamAname = Name + "-Flag-256.png";
	        		
	        		
					if (Ti.Platform.osname == 'iphone' ) 
					{	
		        		teamFlags[i] = Ti.UI.createImageView({
		        			top: '20%',
		        			image: teamAname,
		        			left: widthValue,
		        			width: btnW ,
		        			height: '50%',
		        			name: Name
	        			});
	        		}	
	        		if (Ti.Platform.osname == 'ipad' ) 
					{	
		        		teamFlags[i] = Ti.UI.createImageView({
		        			top: '20%',
		        			image: teamAname,
		        			left: widthValueiPad,
		        			width: btnWiPad ,
		        			height: '50%',
		        			name: Name
	        			});
	        		}		        		
	        		teamFlags[i].addEventListener('click', function(e){
	        			Ti.App.FavTeam = e.source.name;
	        			//Ti.API.log(Ti.App.FavTeam);
	        			var dialog = Ti.UI.createAlertDialog({
    							message: 'Your Favorite Team is  : ' + Ti.App.FavTeam,
    							buttonNames: ['Confirm', 'Cancel'],
    							title: 'Confirm Your Favorite Team'
 						});
 						dialog.addEventListener('click', function(e){
   							if (e.index === 0)
    						{	
    							Ti.UI.currentWindow.removeAllChildren();
    							var xhr = Ti.Network.createHTTPClient();
				    			xhr.open('POST','http://codespikestudios.com/prediction/InsertUser.php');
				    			xhr.setRequestHeader('User-Agent','My User Agent');
				    			xhr.onload = function()
				     			{
				      				
									Ti.App.TabGroup.open();
				     			};
				     
				      			xhr.send({
				        			"Score": 0,
				        			"FbID":Ti.App.Fbid,
				        			"Favteam": Ti.App.FavTeam,
				        			"Username": Ti.App.Username
								}); 
    							
    						}
    					});
 						dialog.show();
	        		});
	        		if (Ti.Platform.osname == 'iphone' ) 
					{	
		        		CountryName[i] = Ti.UI.createLabel({
		        			text: Name,
		        			color: 'white',
		        			top: '70%',
		        			height: '20%',
		        			font: {
								fontSize: '20%',
								fontFamily : Ti.App.customFont
							},
		        		//	left: widthValue,
		        			center: {x:teamFlags[i].left + btnW/2 , y: 150}
		        		//	width: btnW,
	        			});
	        	   }
	        	   if (Ti.Platform.osname == 'ipad' ) 
					{
						CountryName[i] = Ti.UI.createLabel({
		        			text: Name,
		        			color: 'white',
		        			top: '70%',
		        			height: '20%',
		        			font: {
								fontSize: '20%',
								fontFamily : Ti.App.customFont
							},
		        		//	left: widthValue,
		        			center: {x:teamFlags[i].left + btnWiPad/2 , y: 150}
		        		//	width: btnW,
	        			});	
					}
	        		TeamsScrollView.add(CountryName[i]);
	        		TeamsScrollView.add(teamFlags[i]);
	        	}
	        }
	     });
	}
catch(e) 
	 {
	    Ti.API.error('Error: ' + e);
	 } 
Ti.UI.currentWindow.add(PickTeam);
Ti.UI.currentWindow.add(TeamRules);
Ti.UI.currentWindow.add(TeamsScrollView);