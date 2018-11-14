exports.handler = function(event, context, callback)  {
    // TODO implement
    var AWS = require('aws-sdk');
    var lexruntime = new AWS.LexRuntime();
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
  }// successful response
});
    
    
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};