Currently the dispatcher and the api are seperate services with the hopes 
of adding somekind of order batching service in between. To an extent this 
is completed with RabbitMq, however, the set of orders for a delivery is
not just defined by arrival, but also location (shortest path). 

Set up (UNIX):
	1. clone repo  - 'git clone https://github.com/NashBaughn/Delivery-Dispatcher.git'
	2. install npm - 'cd Delivery-Dispatcher && npm install'
	3. start bmg-net - 'npm run-script dev'
	4. Error! There's more!

Env Varaibles:
	1.) For various reason the code gets it database parameters from env variables
		- Copy and paste the following into your .bash_profile. 
			'''
			export BMG_DATABASE_NAME="bmg_test_api"
			export BMG_DATABASE_USERNAME="user"
			export BMG_DATABASE_PASSWORD="user_password"
			export BMG_RABBITMQ_QUEUE_NAME="BMG_orders"
			'''
Postgres:
	bmg-net uses postgres as a local sql database. 
	Installation (with command prompt):
		1.) Follow instructions at: https://postgresapp.com/
		2.) With the GUI, open up a command line
		3.) Createa user - 'CREATE USER username WITH PASSWORD 'user_password';'
		4.) Grant new user privileges - 'GRANT ALL PRIVILEGES ON DATABASE "database_name" to username;'
			note - These credentials should maetch the env varaibles. 

RabbitMq:
	Great queueing service for orders as the come in. Possibly will be replaced.
	Installation: https://www.rabbitmq.com/download.html
		1.) Start the server from the command line - 'rabbitmq-server'


Should work now with 'npm run-script dev'


