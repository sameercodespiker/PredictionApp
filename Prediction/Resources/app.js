
var win1 = Titanium.UI.createWindow({  
    title:'Window 1',
    backgroundColor:'#fff',
    
});

var win2 = Ti.UI.createWindow({
	title: 'Match centre',
	url: 'matchCentre.js'
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

var fb = require('facebook');
fb.appid = 704027519640918;
fb.permissions = ['publish_stream', 'read_stream'];
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
        	alert(e.result + " This is my Data");
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
 fb.authorize(); 
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
//win1.add(wcImage);
win1.add(checkUseridButton);
win1.add(userId);
win1.add(nextWinButton);
win1.open();
