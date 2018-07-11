Currently the dispatcher and the api are seperate services with the hopes 
of adding somekind of order batching service in between. To an extent this 
is completed with RabbitMq, however, the set of orders for a delivery is
not just defined by arrival, but also location (shortest path). 