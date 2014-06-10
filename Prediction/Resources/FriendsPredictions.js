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


var b1 = Ti.UI.createButton({
		title:'Run Query',
		width:200,
		height:40,
		top:10
	});
b1.addEventListener('click', function() {
		if (!fb.loggedIn)
		{
			Ti.UI.createAlertDialog({title:'Facebook', message:'Login before running query'}).show();
			return;
		}
	
		runQuery();
});

Ti.UI.currentWindow.add(b1);

var fb = require('facebook');
fb.appid = 704027519640918;
fb.permissions = ['user_friends' , 'publish_stream', 'read_stream'];

function runQuery() {
	
	
		var tableView = Ti.UI.createTableView({
			minRowHeight: '35%',
			top: '40%',
			left: '1%',
			width: '45%',
			height: '50%'
			});
		
		Ti.UI.currentWindow.add(tableView);
	
		// run query, populate table view and open window
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
			for (var c=0;c<result.length;c++)
			{
				var row = result[c];
	
				var tvRow = Ti.UI.createTableViewRow({
					height:'auto',
					selectedBackgroundColor:'blue',
					backgroundColor:'green'
				});
				var imageView;
				imageView = Ti.UI.createImageView({
					image:row.pic_square === null ? '/images/custom_tableview/user.png' : row.pic_square,
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
					text:row.name
				});
				tvRow.add(userLabel);
	
				var statusLabel = Ti.UI.createLabel({
					font:{fontSize:13},
					left:70,
					top:25,
					right:20,
					height:'auto',
					color:'#222',
					text:'2-1'
				});
				tvRow.add(statusLabel);
	
				tvRow.uid = row.uid;
	
				data[c] = tvRow;
			}
			
			tableView.setData(data, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
			
			
		});
	}

Ti.UI.currentWindow.add(teamAimage);
Ti.UI.currentWindow.add(teamBimage);
