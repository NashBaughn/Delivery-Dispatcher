const onStartInfo = require('./utils/envInfo');
const express =  require('express');
const port = process.env.DQ_PORT || 3000;
const host = process.env.QD_HOST || 'localhost';
const bodyParser = require('body-parser');
const app  = express();
const apiService = require('./api');
const dispatcherService = require('./dispatcher');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiService.app);

apiService.init()
.then(() => {
	app.listen(port, host, (err) => {
		if(err){ console.log("error") }
		console.log("Listening on " + host+":"+port)
	});
}).catch((err) => {
	console.log(err)
});

