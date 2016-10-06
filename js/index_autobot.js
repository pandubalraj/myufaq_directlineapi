var app = angular.module('submitExample',[]);
app.controller('ExampleController', ['$scope','$http','$compile', function($scope, $http, $compile) {
	var i;
	$scope.id = 0;
	  function GetConversationId()
	  {
		  if ($scope.name === undefined)
		  {
			$http({
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/json',
					'Authorization': 'BotConnector 4c77nGWykYc.cwA.vz0.UCwuwuEYP0XBra9ItKk4VG3bNaOWRXHGHjpYiuGXJQQ'
					},
				  url: 'https://directline.botframework.com/api/conversations'
				})
				.then(function(response) {
					$scope.conversationId = response.data['conversationId'];
					console.log("Conversation ID: " + $scope.conversationId);
					j('<div class="message loading new"><figure class="avatar"><img src="icon.png" /></figure><span></span></div>').appendTo(j('.mCSB_container'));
					setTyping();
					updateScrollbar();
					setTimeout(function(){ 
						PostMessage();
					},1000);
			});
		  }
		  else
		  {
			setTimeout(function(){ 
				PostMessage();
			},1000);
		  }
	  }

	  function PostMessage()
		  {
			  if ($scope.name === undefined)
			  {
				$http({
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'BotConnector 4c77nGWykYc.cwA.vz0.UCwuwuEYP0XBra9ItKk4VG3bNaOWRXHGHjpYiuGXJQQ'
				},
				url: 'https://directline.botframework.com/api/conversations/'+$scope.conversationId+'/messages',
				data: {
				"conversationId":$scope.conversationId,
				"text": "Hi"
				}
				})
				.success(function(data, status){
				setTimeout(function(){ 
					GetMessage();
				}, 3000);
				});	  
			  }
			  else
			  {
				$http({
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'BotConnector 4c77nGWykYc.cwA.vz0.UCwuwuEYP0XBra9ItKk4VG3bNaOWRXHGHjpYiuGXJQQ'
				},
				url: 'https://directline.botframework.com/api/conversations/'+$scope.conversationId+'/messages',
				data: {
				"conversationId":$scope.conversationId,
				"text":$scope.name,
				"from":$scope.fromBot
				}
				})
				.success(function(data, status){
					setTimeout(function(){ 
					GetMessage();
				}, 3000);
				});
			  }
		  }
		
		function GetMessage()
		{
		$http({
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'BotConnector 4c77nGWykYc.cwA.vz0.UCwuwuEYP0XBra9ItKk4VG3bNaOWRXHGHjpYiuGXJQQ'
			},
			url: 'https://directline.botframework.com/api/conversations/'+$scope.conversationId+'/messages',
			}).success(function(response){
			getNextID(response["messages"], true);
			if ($scope.fromBot === undefined) { $scope.fromBot = response["messages"][0]["from"]; } 
		});
		}
	  
	  var lastTemp = 0;
	  function getNextID(resp, skipLast){
		  for(i = 0; i < (resp.length - lastTemp); i++){
			if(!skipLast){
				if(resp[i + lastTemp]["text"] === undefined){
					botMessage(resp[i + lastTemp]["images"][0]);
				}
				else{
					botMessage(resp[i + lastTemp]["text"]);
				}
			}
			skipLast = false;
		  }
		  lastTemp = resp.length;
	  }
	  
	  $scope.submit = function() {	
		insertMessage(j('.message-input').val());
		if ($scope.name) {
			GetConversationId();
		}
      }
	  
var messages = j('.messages-content'), d, i = 0, msg = "", botmsg = "";

j(window).load(function () {
  messages.mCustomScrollbar();
  GetConversationId();
});

function updateScrollbar() {
  messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function setDate() {
  d = new Date();
  j('<div class="timestamp">' + formatAMPM(d) + '</div>').appendTo(j('.message'));
}

function setTyping() {
  j('<div class="timestamp">Typing...</div>').appendTo(j('.message:last'));
}

function insertMessage(msg) {
  if (j.trim(msg) == '') {
    return false;
  }
  j('<div class="message message-personal">' + msg + '</div>').appendTo(j('.mCSB_container')).addClass('new');
  setDate();
  j('.message-input').val(null);
  updateScrollbar();
}

// function botMessage(botmsg) {
  // if (j('.message-input').val() != '') {
    // return false;
  // }
  // j('.message.loading').remove();
    // j('.message .timestamp').remove();
    // j('<div class="message new"><figure class="avatar"><img src="icon.png" /></figure>' + botmsg + '</div>').appendTo(j('.mCSB_container')).addClass('new');
	// playSound('bing');
    // setDate();
    // updateScrollbar();
// }

	function botMessage(botmsg) {
		console.log(botmsg);
		if (j('.message-input').val() != '') {
			return false;
		}
		j('.message.loading').remove();
		j('.message .timestamp').remove();
		var options = getArrayStringBotMsg(botmsg);
			var actualOptions = '<div class="message new"><figure class="avatar"><img src="icon.png" /></figure>';
			 if(options.length > 1){
				 actualOptions += options[0];
				 for (i = 1; i < options.length; i++) {
					actualOptions += '<button class="button" ng-click="optionClick(\''+ options[i] +'\')" value="'+options[i]+'">'+options[i]+'</button><br>';
				}
			}
			else if (options.length ==1) {
				actualOptions += options[0];
			}
			// // actualOptions += '</div>';
		$scope.test(actualOptions);
		playSound('bing');
		setDate();
		updateScrollbar(); 
	}

	function getArrayStringBotMsg(bmsg){
		check_bmsg = /\n/.test(bmsg);
		var bmessage = [];
		if (check_bmsg === false){
			bmessage = bmsg.split("\n");
		}
		else{
			bmsg = bmsg.split("\n");
			bmessage = bmsg.map(function(s){ return s.trim()});
		}
		return bmessage;
	}
	
	$scope.test = function(actualOptions) {
		var el = actualOptions;
		var element = angular.element(document.querySelector('.mCSB_container'));
		var generated = element.append(el);
		$compile(generated.contents())($scope);
	}

	$scope.optionClick = function(value){
		var choice_value = value.split(".")[0];
		$scope.name = choice_value;
		setTimeout(function(){ 
			$scope.submit();
		}, 10);
	}
	
function playSound(filename) {
		document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
	}
}]);

app.controller('ChatTitleCtrl', ['$scope', function ($scope) {
	$scope.maximChatbox = function () {
		console.log("maxim");
		var e = document.getElementById("minim-chat");
		e.style.display = "block";
		var e = document.getElementById("maxi-chat");
		e.style.display = "none";
		var e = document.getElementById("chatbox");
		e.style.margin = "0";
		var e = document.getElementById("animHelpText");
		e.style.display = "none";
	};
	$scope.minimChatbox = function () {
		console.log("minim");
		var e = document.getElementById("minim-chat");
		e.style.display = "none";
		var e = document.getElementById("maxi-chat");
		e.style.display = "block";
		var e = document.getElementById("chatbox");
		e.style.margin = "0 0 -53vh 0";
		var e = document.getElementById("animHelpText");
		e.style.display = "block";
	};
}]);