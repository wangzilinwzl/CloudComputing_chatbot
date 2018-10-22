//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


// var apigClient = apigClientFactory.newClient({
//   apiKey: 'NU4mPqUV287jgvUO2zhDX4ITy6DQrKc49vfMW2MT'
// });




var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work

// //edit this function to change what the chatbot says

var HttpClient = function() {
    this.post = function(aUrl, aCallback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            if (request.readyState == 4 && request.status == 200)
                aCallback(request.responseText);
        }
        var postData = lastUserMessage;
        request.open( "POST", aUrl, true );  
        request.setRequestHeader('X-API-KEY', 'NU4mPqUV287jgvUO2zhDX4ITy6DQrKc49vfMW2MT');          
        request.send( JSON.stringify(postData) );
    }
}

function chatbotResponse() {
  var request = new XMLHttpRequest();
  //var res="";
  request.open('POST', 'https://nkg23wc55i.execute-api.us-east-2.amazonaws.com/prod/rr',false);

  request.setRequestHeader('X-API-KEY', 'NU4mPqUV287jgvUO2zhDX4ITy6DQrKc49vfMW2MT');

  //var postData = {"messages" : lastUserMessage};
  var postData = lastUserMessage;



  // request.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     // console.log('Status:', this.status);
  //     // console.log('Headers:', this.getAllResponseHeaders());
  //     //postData = {"messages" : lastUserMessage};
  //    var res=JSON.parse(this.response)["message"];
  //     botMessage = res;
  //     botMessage =JSON.parse(this.response)["message"];
  //     console.log("bottMessage:" + botMessage);
  //     console.log(res);
  //     console.log(lastUserMessage);
  //     //console.log('Body:', JSON.stringify(this.response));
  //     // console.log("response:"+JSON.stringif;y(response));
  //   }
  // };

  request.send(JSON.stringify(postData));
  botMessage = JSON.parse(request.responseText)["message"];
  console.log("bottMessage:" + botMessage);
  // var client = new HttpClient();
  // client.post('https://nkg23wc55i.execute-api.us-east-2.amazonaws.com/prod/rr', function(response) {
  //     // do something with response
  //     console.log(JSON.parse(response)["message"];)
  //     botMessage=JSON.parse(response)["message"];
  // });

  //botMessage = res;
  // talking = true;
  // botMessage = "I'm confused"; //the default message

  // if (lastUserMessage === 'hi' || lastUserMessage =='hello') {
  //   const hi = ['what!']
  //   botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  // }

  // if (lastUserMessage === 'name') {
  //   botMessage = 'My name is ' + botName;
  // }
}
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //
// //
// //
//this runs each time enter is pressed.
//It controls the overall input and output

function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}









// //
// //
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************
// //****************************************************************






//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}