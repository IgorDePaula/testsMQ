var amqp = require('amqplib');

amqp.connect('amqp://localhost')
        .then(function (conn) {
            console.log('Conectado!');
            return conn.createChannel();
        }).then(function (ch) {
    console.log('Canal criado!');
    ch.prefetch(1);


    ch.consume('banco', function (msg) {
        setTimeout(function () {
            console.log("%s Mensagem recebida: %s", new Date(), msg.content.toString());
            ch.ack(msg);
        }, 2000);
    });

});