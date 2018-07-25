const config   = require('./config.json');
const dispatcher   = require('./services/dispatcherClass');

// start up dispatchers
for (var city in config.hubs) {
	var hub = config.hubs[city];
	var hubDispatcher = new dispatcher(city, hub.queue_name, hub.queue_host);
	hubDispatcher.start();
}