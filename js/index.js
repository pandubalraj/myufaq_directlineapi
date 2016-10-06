var app = angular.module('submitExample',[]);
app.controller('ExampleController', ['$scope','$http', function($scope, $http) {
	  function GetConversationId()
	  {
		$http({
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				'Authorization': 'BotConnector rlWqzfvMwAI.cwA.Gbc.W6soQ2Ce065W-UTXJFmTcP7aRwUptv4p1rLWRJTbzK4'
				},
			  url: 'https://directline.botframework.com/api/conversations'
			})
			.then(function(response) {
			console.log("Inside GetConversationId");
				$scope.conversationId = response.data['conversationId'];
				j('<div class="message loading new"><figure class="avatar"><img src="icon.png" /></figure><span></span></div>').appendTo(j('.mCSB_container'));
				setTyping();
				updateScrollbar();
				setTimeout(function(){ 
					PostMessage();
				},1000);
		});
	  }

	  function PostMessage()
		  {
		  console.log("$scope.conversationId"+$scope.conversationId);
			$http({
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'BotConnector rlWqzfvMwAI.cwA.Gbc.W6soQ2Ce065W-UTXJFmTcP7aRwUptv4p1rLWRJTbzK4'
				},
				url: 'https://directline.botframework.com/api/conversations/'+$scope.conversationId+'/messages',
				data: {
				"conversationId":$scope.conversationId,
				"text":$scope.name
				}
			})
			.success(function(data, status){


			setTimeout(function(){ 
				GetMessage();
			}, 3000);
			});
		  }

		  // function printLetterByLetter(destination, message, speed){
			// var i = 0;
			// var interval = setInterval(function(){
				// document.getElementById(destination).innerHTML += message.charAt(i);
				// i++;
				// if (i > message.length){
					// clearInterval(interval);
				// }
				// }, speed);
			// }

		function GetMessage()
		{
			$http({
				method: 'GET',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'BotConnector rlWqzfvMwAI.cwA.Gbc.W6soQ2Ce065W-UTXJFmTcP7aRwUptv4p1rLWRJTbzK4'
				},
				url: 'https://directline.botframework.com/api/conversations/'+$scope.conversationId+'/messages',
				}).success(function(response){
				botMessage(response["messages"][1]["text"]);
			});
		}
	  
	  $scope.submit = function() {	
	  console.log('test');
	  insertMessage(j('.message-input').val());
		if ($scope.name) {
			console.log('scope.test');
			console.log($scope.name);
			GetConversationId();
		}
      }
	  
var messages = j('.messages-content'), d, i = 0, msg = "", botmsg = "";

j(window).load(function () {
  messages.mCustomScrollbar();
  setTimeout(function () {
    botMessage("Hi! I am ChatBot. Please ask your question.");
  }, 100);
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
  j('<div class="timestamp">' + formatAMPM(d) + '</div>').appendTo(j('.message:last'));
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

function botMessage(botmsg) {
  if (j('.message-input').val() != '') {
    return false;
  }
  j('.message.loading').remove();
  j('.message .timestamp').remove();
  j('<div class="message new"><figure class="avatar"><img src="icon.png" /></figure>' + botmsg + '</div>').appendTo(j('.mCSB_container')).addClass('new');
	playSound('bing');
    setDate();
    updateScrollbar();
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