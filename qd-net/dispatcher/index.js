const config   = require('./config.json');
const dispatcher   = require('./services/dispatcherModule');

// start up dispatchers
for (var city in config.hubs) {
	var hub = config.hubs[city];
	var hubDispatcher = new dispatcher(city, hub.queue_name, hub.queue_host);
	hubDispatcher.start();
}