exports.handler = function(event, context, callback) {
    // TODO implement
    var AWS = require('aws-sdk');
    var slots = JSON.parse(event.Records[0].body).currentIntent.slots;
    var cuisine = slots.Cuisine;
    var phone = slots.Phone;
    var location = slots.Locations;
    var time = slots.Time;
    var people = slots.People;
    var phone1 = '+19293106827';
    
    console.log("Prediction 1");
    console.log(typeof phone)
    var sns = new AWS.SNS();
    sns.publish({
      Message: 'cuisine type :' + cuisine,
      PhoneNumber: phone1
    }, function (err, data) {
    if (err) {
      console.log(err.stack);
      return;
    }

console.log("push sent");
});
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    console.log(phone);
    //console.log(event.Records[0].body.currentIntent.slots.Phone);
    console.log(JSON.stringify(event));
    return response;
};