var amqp = require('amqp');
var conn = amqp.createConnection();
var schedule = require('amqp-schedule')(conn);
conn.once('ready', function() {
  conn.queue('foobar', function(q) {
 
  });
  schedule('dead', 'foobar', { foobar: '10s after ' + new Date() }, 1000*10, { content_type: 'application/json' });
  schedule('dead', 'foobar', { foobar: '3s after ' + new Date() }, 1000*3, { content_type: 'application/json' });
});