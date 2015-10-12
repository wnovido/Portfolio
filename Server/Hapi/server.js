var Hapi 	 = require('hapi');
var server 	 = new Hapi.Server('localhost', 8801, { cors: true }); //what if deployed in cloud???
var routes 	 = require('./routes');
var Mongoose = require('mongoose');

// MongoDB Connection
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/portfolio_wilson_novido';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
Mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});


var rootHandler = function(request, reply) {
	reply({ message: "Hello from Portfolio App!"});
};


// Set root route
server.route({
	method: 'GET',
	path: '/',
	handler: rootHandler
});

routes.init(server);

server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});
