//nodejs

'use strict';
console.log('Loading hello world function');
 
exports.handler = function(event, context, callback) {
    let name = "you";
    let city = 'World';
    let time = 'day';
    let day = '';
    let responseCode = 200;
    let sentence = 'I do not understand'
    console.log("request: " + JSON.stringify(event));
    
    // This is a simple illustration of app-specific logic to return the response. 
    // Although only 'event.queryStringParameters' are used here, other request data, 
    // such as 'event.headers', 'event.pathParameters', 'event.body', 'event.stageVariables', 
    // and 'event.requestContext' can be used to determine what response to return. 
    //
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters.name !== undefined && 
            event.queryStringParameters.name !== null && 
            event.queryStringParameters.name !== "") {
            console.log("Received name: " + event.queryStringParameters.name);
            name = event.queryStringParameters.name;
        }
    }
    
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.proxy !== undefined && 
            event.pathParameters.proxy !== null && 
            event.pathParameters.proxy !== "") {
            console.log("Received proxy: " + event.pathParameters.proxy);
            city = event.pathParameters.proxy;
        }
    }
    
    if (event.headers !== null && event.headers !== undefined) {
        if (event.headers['day'] !== undefined && event.headers['day'] !== null && event.headers['day'] !== "") {
            console.log("Received day: " + event.headers.day);
            day = event.headers.day;
        }
    }
    
    if (event.messages !== null && event.messages !== undefined) { 
        //let body = JSON.parse(event.messages[0])
        if(event.messages == "Hi"){
            sentence = "Hello there, how can I help you?";
        } else if(event.messages == "Who are you"){
            sentence = "I am a Columbia student";
        } else if(event.messages == "Go away"){
            sentence = "Alright, I will see you next year";
        } else if(event.messages == "What"){
            sentence = "what is what";
        } 
    }
 
    let greeting = sentence;

    var responseBody = {
        message: greeting,
        input: event
    };
    
    // The output from a Lambda proxy integration must be 
    // of the following JSON object. The 'headers' property 
    // is for custom response headers in addition to standard 
    // ones. The 'body' property  must be a JSON string. For 
    // base64-encoded payload, you must also set the 'isBase64Encoded'
    // property to 'true'.
    var response = {
        statusCode: responseCode,
        headers: {
            'Content-Type': 'application/json',
            "X-Requested-With": '*',
            "Access-Control-Allow-Headers": 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'POST, GET, OPTIONS'
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    callback(null, response);
};