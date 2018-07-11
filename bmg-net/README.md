Currently the dispatcher and the api are seperate services with the hopes 
of adding somekind of order batching service in between. To an extent this 
is completed with RabbitMq, however, the set of orders for a delivery is
not just defined by arrival, but also location (shortest path). 

Set up (UNIX):<br/>
1.) clone repo  - 'git clone https://github.com/NashBaughn/Delivery-Dispatcher.git'<br/>
2.) install npm - 'cd Delivery-Dispatcher && npm install'<br/>
3.) start bmg-net - 'npm run-script dev'<br/>
4.) Error! There's more!<br/>

Env Varaibles:<br/>
	1.) For various reason the code gets it database parameters from env variables<br/>
		a.) Copy and paste the following into your .bash_profile. <br/>
			'''
			export BMG_DATABASE_NAME="bmg_test_api"
			export BMG_DATABASE_USERNAME="user"
			export BMG_DATABASE_PASSWORD="user_password"
			export BMG_RABBITMQ_QUEUE_NAME="BMG_orders"
			'''
Postgres:<br/>
	bmg-net uses postgres as a local sql database.<br/>
	Installation (with command prompt):<br/>
		1.) Follow instructions at: https://postgresapp.com/<br/>
		2.) With the GUI, open up a command line<br/>
		3.) Createa user - 'CREATE USER username WITH PASSWORD 'user_password';'<br/>
		4.) Grant new user privileges - 'GRANT ALL PRIVILEGES ON DATABASE "database_name" to username;'<br/>
			note - These credentials should maetch the env varaibles. 

RabbitMq:<br/>
	Great queueing service for orders as the come in. Possibly will be replaced.
	Installation: https://www.rabbitmq.com/download.html
		1.) Start the server from the command line - 'rabbitmq-server'<br/>


Should work now with 'npm run-script dev'<br/>


