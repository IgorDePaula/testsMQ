var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'hello';
        ch.assertQueue(q,{durable:true});
        ch.sendToQueue(q, new Buffer('Hello World!'));
        console.log('[x] sent "hello world"');
    });
});