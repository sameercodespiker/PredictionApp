var win = Titanium.UI.currentWindow;
 
var scrollView_predicted = Ti.UI.createScrollView({
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

		
		
		if (this.responseText == null)
		{
			
		}
		else{
			var predicted_matches = this.responseText.split("%");
			for (var i = 0; i < predicted_matches.length - 1; i ++)
			{	
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
					teamA: details[3],
					teamB: details[4],
					Score: details[0] + "-" + details[1]
				});
				teamA[i] = Ti.UI.createLabel({
					text: details[3],
					top: '10%',
					color: '#aa1a2d',
					left: '5%',
					font: {
						fontSize: '20%',
						fontFamily : Ti.App.customFont
					}
				});
				teamB[i] = Ti.UI.createLabel({
					text: details[4],
					top: '10%',
					color: '#aa1a2d',
					right: '5%',
					font: {
						fontSize: '20%',
						fontFamily : Ti.App.customFont
					}
				});
				var teamAname = details[3] + "-Flag-256.png";
				var teamBname = details[4] + "-Flag-256.png";				
				teamAimage[i] = Ti.UI.createImageView({
							bottom: '10%',
							left: '5%',
							height: '40%',
							width: '10%',
							image: teamAname
						});
			    teamBimage[i] = Ti.UI.createImageView({
							bottom: '10%',
							right: '5%',
							height: '40%',
							width: '10%',
							image: teamBname
						}); 
						
				predicted_score[i] = Ti.UI.createLabel({
					text: details[0] + "-" + details[1],
					center: {x:'50%' , y:'50%'},
					font: {
						fontSize: '25%',
						fontFamily : Ti.App.customFont
					},
					color: '#aa1a2d'
				});
			
		matches[i].add(teamA[i]);
		matches[i].add(teamB[i]);
		matches[i].add(teamBimage[i]);
		matches[i].add(teamAimage[i]);
		matches[i].add(predicted_score[i]);
		
		matches[i].addEventListener('click', function(e){

		
					var data = {
					    link : "http://www.codespikestudios.com",
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

		scrollView_predicted.add(matches[i]);		
		}
		
		}
	};
					     
	xhr.send({
	"UserId": Ti.App.Fbid
	}); 

});
Ti.UI.currentWindow.add(scrollView_predicted);