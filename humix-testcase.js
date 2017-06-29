var HumixSense = require('humix-sense');

var config = {
    "moduleName" : "humix-testcase-module",
    "commands" : ["output"],
    "events" : ["input"],
    "log" : [
      {
        file : './humix-test-module.log',
        level : 'info'
      }
    ],
    "debug" : true
};

var humix = new HumixSense(config);
var hsm;

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;
    var log = hsm.getLogger();
    
    // command1 is a sync command. 
    // When finished, the result is passed back to humix-think via 
    // the 'done' callback. 

    hsm.on("output", function (data) { 
        console.log('do something with output. data:'+data);               
    })
});

// publish a dummy data in every 5 seconds.
setInterval(function () {

    if (hsm) {
        hsm.event('input', (new Date).getTime());
    }

}, 5000);
