var win = Titanium.UI.currentWindow;
 
var scrollView_predicted = Ti.UI.createTableView({
			     						minRowHeight: 100,
     						backgroundColor: '#aa1a2d'
});



win.addEventListener('youGotFocus', function(e){

	scrollView_predicted.removeAllChildren();

	var xhr = Ti.Network.createHTTPClient();
	xhr.open('POST','http://codespikestudios.com/prediction/GetUserPrediction.php');
	xhr.setRequestHeader('User-Agent','My User Agent');
	xhr.onload = function()
	{
		
		Ti.API.log(this.responseText);
		var matches = [];
		var teamA = [];
		var teamB = [];
		var teamAimage = [];
		var teamBimage = [];
		var predicted_score = [];
		var tvRow = [];
		var data = [];
		var final_score = [];
		
		if (this.responseText == null)
		{
			
		}
		else{
			var predicted_matches = this.responseText.split("%");
			for (var i = 0; i < predicted_matches.length - 1; i ++)
			{	
				
				tvRow[i] = Ti.UI.createTableViewRow({
											height:'auto',
										//	backgroundImage: 'matchSCore.png',	
											selectedBackgroundColor:'#aa1a2d',
											backgroundColor:'#aa1a2d'					
				});
				
				var viewH = '80';
				var topValue = 10 + (viewH * i);
		        var TopValue_b = (topValue/480)* 100;
		        var perTopValue = TopValue_b.toString() + '%';
		        var percentage = (viewH/480)* 100;
		        var perBtnH = percentage.toString() + '%';			
				var details = predicted_matches[i].split("$");
				matches[i] = Ti.UI.createButton({
					top: perTopValue,
					height: perBtnH,
					left: '1%',
					width: '98%',
					backgroundImage: 'matchSCore.png',
					teamA: details[4],
					teamB: details[5],
					Score: details[0] + "-" + details[1]
				});
			  if (details[4] == "Bosnia-&-Herzegovina")
				{
					details[4] = "Bosnia";
				}
			if (details[5] == "Bosnia-&-Herzegovina")
				{
					details[5] = "Bosnia";
				}
				teamA[i] = Ti.UI.createLabel({
					text: details[4],
					top: '10%',
					color: 'FFA302',
					left: '5%',
					font: {
						fontSize: '20%',
						fontFamily : Ti.App.customFont
					}
				});
				teamB[i] = Ti.UI.createLabel({
					text: details[5],
					top: '10%',
					color: 'FFA302',
					right: '5%',
					font: {
						fontSize: '20%',
						fontFamily : Ti.App.customFont
					}
				});
				if (details[3] == "TBP")
				{
					final_score[i] = Ti.UI.createLabel({
					text: 'Yet to be played',
					center: {x:'50%' , y:'80%'},
					font: {
						fontSize: '10%',
						fontFamily : Ti.App.customFont
					},
					color: 'FFA302'
				});
					tvRow[i].add(final_score[i]);
				}
				else
				{
					final_score[i] = Ti.UI.createLabel({
						text: 'Final Score ' + details[3],
						center: {x:'50%' , y:'80%'},
						font: {
							fontSize: '10%',
							fontFamily : Ti.App.customFont
						},
						color: 'FFA302'
					});
					tvRow[i].add(final_score[i]);
				}
				var teamAname = details[4] + "-Flag-256.png";
				var teamBname = details[5] + "-Flag-256.png";				
				teamAimage[i] = Ti.UI.createImageView({
							bottom: '10%',
							left: '5%',
							height: '40%',
							width: '20%',
							image: teamAname
						});
			    teamBimage[i] = Ti.UI.createImageView({
							bottom: '10%',
							right: '5%',
							height: '40%',
							width: '20%',
							image: teamBname
						}); 
						
				predicted_score[i] = Ti.UI.createLabel({
					text: details[0] + "-" + details[1],
					center: {x:'50%' , y:'50%'},
					font: {
						fontSize: '25%',
						fontFamily : Ti.App.customFont
					},
					color: 'FFA302'
				});
			
	     tvRow[i].add(teamA[i]);
		 tvRow[i].add(teamB[i]);
		 tvRow[i].add(teamBimage[i]);
		 tvRow[i].add(teamAimage[i]);
		 tvRow[i].add(predicted_score[i]);
		
		tvRow[i].addEventListener('click', function(e){

		
					var data = {
					    link : "https://apps.facebook.com/witribe_worldcup/",
					    name : "I made a Prediction :" + e.source.teamA + " " + e.source.Score + " " + e.source.teamB ,
					    message : "I made a Prediction Using Wi-tribe FIFA WorldCup Predictor ",
					    caption : "What's Your Prediction ?",
					    picture : "http://codespikestudios.com/images/witribe_fifa.png",
					    description : "Play Wi-tribe FIFA WorldCup Predictor to Predict the scores of all matches in FIFA World Cup 2014"
					};
					Ti.App.fbApp.dialog("feed", data, function(e) {
					    if(e.success && e.result) {
					       // alert("Success! New Post ID: " + e.result);
					    } 
					    else 
					    	{
					        if(e.error) 
					        {
					            //alert(e.error);
					        } 
					        else 
					        {
					            //alert("User canceled dialog.");
					        }
					    }
					});
		});
		//tvRow[i].add(matches[i]);
		data[i] = tvRow[i];
				
		}
		scrollView_predicted.setData(data, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
		}
	};
					     
	xhr.send({
	"UserId": Ti.App.Fbid
	}); 

});
Ti.UI.currentWindow.add(scrollView_predicted);