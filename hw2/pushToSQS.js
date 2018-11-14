
'use strict';
var QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/927044690892/DiningConcierge';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
    region: 'us-east-1'
});
// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const location = slots.Locations;
    const cuisine = slots.Cuisine;
    const people = slots.People;
    const phone = slots.Phone;
    const time = slots.Time;
    // var info = {
    //     location : location,
    //     cuisine : cuisine,
    // };
   
    
    callback(close(sessionAttributes, 'Fulfilled',
    //{'contentType': 'PlainText', 'content': `Okay, I have ordered your ${size} ${pizzaKind} pizza on ${crust} crust`}));
    {'contentType': 'PlainText', 'content': `You’re all set. Expect my recommendations shortly! Have a good day.`}));
    
}
 
// --------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
     var params = {
        MessageBody: JSON.stringify(event),
        //MessageBody: "hello, can you receive me",
        //MessageBody  : JSON.stringify(info),
        QueueUrl: QUEUE_URL
    };
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log('error:', "Fail Send Message" + err);
            context.done('error', "ERROR Put SQS"); // ERROR with message
        } else {
            //console.log('data:', data.MessageId);
            context.done(null, ''); // SUCCESS 
        }
    });
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};