function testStorage(){
	if (window.localStorage) {
		$( ".container #localStorage" ).html( "true" );
	}
	else{
		$( ".container #localStorage" ).html( "false" );
	};
};

function initPopup(){
	alert("xxx");
	$( "#add" ).on( "click", function( event ) {
		var serverUrl = $( "#serverUrl" ).val(),
			projectKey = $( "#projectKey" ).val();
			alert("sss");
		if ( serverUrl && projectKey ) {
			var buildUrl = serverUrl + "/job/" + projectKey + "/lastBuild/api/json";
			// var builds = JSON.parse( window.localStorage.getItem("builds") );
			alert(buildUrl);
			window.localStorage.setItem( "builds", buildUrl );
			addBuildItem( projectKey, 0, null );
		};
	} );
	$( "#update" ).on( "click", getBuildStatus );
};

function getBuildStatus(){
	// $.ajax({
	// 	url: window.localStorage.getItem( "builds" ),
	// 	success: function( response ) {
	// 		var jsonResponse = JSON.parse(response),
	// 			status;
	// 		alert(jsonResponse);
	// 		if ( jsonResponse.building ){
	// 			status = "building"; 
	// 		}else{
	// 			status = jsonResponse.result;
	// 		}
	// 		updateBuildItem("test", jsonResponse.number, status);
	// 	}
	// });

	var xhr = new XMLHttpRequest();
	xhr.open("GET", window.localStorage.getItem( "builds" ), true);
	xhr.onreadystatechange = function() {
  		if (xhr.readyState == 4) {
  			alert(xhr.responseText);
    	// JSON.parse does not evaluate the attacker's scripts.
    		var resp = JSON.parse(xhr.responseText),
    			status;
			if ( resp.building ){
				status = "building"; 
			}else{
				status = resp.result;
			}
			alert("status:" + status.toLowerCase() +" num:" + resp.number);
			updateBuildItem("test", resp.number, status.toLowerCase());
  		}
	}
	xhr.send();
};

function updateBuildItem( buildKey, buildNumber, status ){
	$( "#" + buildKey + " .number").removeClass("success fail building error").addClass( status );
	$( "#" + buildKey + " .number").text(buildNumber);
};

function addBuildItem( buildKey, buildNumber, status ){
	var st = status || "",
		buildItemDiv = '<div id="buildKey" class="buildItem"><span class="number default" title="Build number">buildNum</span><span class="key" title="Build key">buildKey</span></div>';
	$( "#buildList" ).append( buildItemDiv.replace( /buildNum/, buildNumber ).replace( /buildKey/g, buildKey ) );
};

initPopup();
testStorage();