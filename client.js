var amqp = require('amqplib');
var i=0;
amqp.connect('amqp://localhost')
        .then(function (conn) {
            console.log('Conectado!');
    return conn.createChannel();
        }).then(function(ch){
            console.log('Canal criado!');
            setInterval(function(){
                console.log('-> Enviando Mensagens');
                ch.sendToQueue('messages',new Buffer('Hello World '+i));
                i++;
            },1000);
        });