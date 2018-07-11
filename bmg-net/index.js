console.log("database name: "+process.env.BMG_DATABASE_NAME)
console.log("database username: "+process.env.BMG_DATABASE_USERNAME)
console.log("database password: "+process.env.BMG_DATABASE_PASSWORD)
console.log("rabbitmq queuename: "+process.env.BMG_RABBITMQ_QUEUE_NAME)


const express =  require('express');
const port = process.env.BMG_PORT || 3000;
const host = process.env.BMG_HOST || 'localhost';
const bodyParser = require('body-parser');

//const port = require('./port');

const app  = express();
const bmgApi = require('./bmg-api');
//const bmgDispatcher = require('./bmg-dispatcher');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log('- - - - - - - - ')
// console.log(bmgApi)
// console.log('- - - - - - - - ')
app.use('/api', bmgApi.app);
//app.use('/dispatch', bmgDispatcher.app);

bmgApi.init()
.then(() => {
	app.listen(port, host, (err) => {
		if(err){ console.log("error") }
		console.log("Listening on " + host+":"+port)
	});
}).catch((err) => {
	console.log(err)
});

