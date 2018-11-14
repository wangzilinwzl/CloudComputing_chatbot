
exports.handler = function(event, context, callback)  {
  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
    // TODO implement
    var AWS = require('aws-sdk');
    var sen = 'before';
    AWS.config.update({
        region: "us-east-1"
    });
    var myMap = new Map([['xhrAsync', false]]);



  var lexruntime = new AWS.LexRuntime({httpOptions : {xhrAsync : false}});
    var params = {
  botAlias: 'bo', /* required */
  botName: 'DinnerConcierge', /* required */
  inputText: 'I want to book a restaurant', /* required */
  userId: 'testuser', /* required */
  requestAttributes: {
    '<String>': 'STRING_VALUE',
    /* '<String>': ... */
  },
  sessionAttributes: {
    '<String>': 'STRING_VALUE',
    /* '<String>': ... */
  }
};
lexruntime.postText(params, function(err, data) {
    console.log('dasdasdas')
  if (err) console.log(err, err.stack); // an error occurred
//   else  {
//       //var reply = data.message;
//       console.log(data); 
//   }   
  else {
    console.log(data.message)
    sen = data.message;
  }// successful response
});
    
    
    sleep(3000);
    console.log(sen);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
