	Ti.include('suds.js');

var win1 = Titanium.UI.createWindow({  
    title:'Window 1',
    backgroundColor:'#fff',
    
});

var win2 = Ti.UI.createWindow({
	title: 'Match Center',
	url: 'matchCentre.js',
	backgroundColor: '#8ac60c'
});

var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: win2
	});


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
        	Ti.API.log(e.result + " This is my Data");
        	//win1.close();
			//Ti.App.currentNavGroup = NavGroup;
			//NavGroup.open();
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

var nextWinButton = Ti.UI.createButton({
	title: 'NEXT',
	top : '80%',
    left: '20%',
    width: '60%',
});

nextWinButton.addEventListener('click', function(e){
	win1.close();
	Ti.App.currentNavGroup = NavGroup;
	NavGroup.open();
});


queryButton.addEventListener('click', function(e){

/*	fb.requestWithGraphPath('me/friends',{}, 'GET', function(e)
	{
    	if (e.success) 
    	{	
    		var Jsona = e.result;
    		var result = JSON.parse(Jsona);
    		
    		for (var c=0; c<result.length; c++)
			{
				var row = result[c];
				Ti.API.log("for loop: " + c + " " + result[c]);
			}
    		Ti.API.log("Success!  From FB: " + result);
    	} 
    	else
    	{
        	if (e.error) 
        	{
            	alert(e.error);
        	}
        	else
        	{
            	alert("Unkown result");
       		}
    	}
	}); */
	
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
			var result = JSON.parse(r.result);
			var data = [];
			var xhr = Ti.Network.createHTTPClient();
    		
			for (var c = 0; c < result.length ; c++)
			{
				var row = result[c];
				Ti.API.log(c + " " + row.uid);
				xhr.open('POST','http://codespikestudios.com/prediction/GetFriends.php');
    			xhr.setRequestHeader('User-Agent','My User Agent');
    			xhr.onload = function()
     			{
      				Ti.API.log("Fr response is : " + c + " " + row.uid + "  " + this.responseText);

     			};
     			
      			xhr.send({
        			"teamGoalsA": row.uid,
				});
			}
		}); 
});

win1.add(checkUseridButton);
win1.add(userId);
win1.add(nextWinButton);
win1.open();
