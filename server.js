var amqp = require('amqplib');
var http = require('http');
amqp.connect('amqp://localhost')
        .then(function (conn) {
            console.log('Conectado!');

            http.Server(function (req, res) {
                var channel = null;
                conn.createChannel()
                        .then(function (ch) {
                            channel = ch;
                            return ch.assertQueue('',
                                    {
                                        exclusive: true,
                                        autoDelete: true
                                    });
                        }).then(function (q) {
                    console.log("Fila criada: %s", q.queue);
                    channel.consume(q.queue,function(msg){
                        res.writeHead('200',{
                            'Content-Type':'application/json'
                        });
                        res.end(msg.content);
                        //ch.sendToQueue();
                    },{
                        noAck:true
                    });
                    channel.sendToQueue('banco', new Buffer(),{
                        replyTo:q.queue
                    });
                });


            }).listen(8080);
        });