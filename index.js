var app = require('express')();
var http = require('http').Server(app);
const kafka = require('kafka-node');
require('dotenv').config()

try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient(process.env.KAFKA_SERVER);
    let consumer = new Consumer(
      client,
      [{ topic: 'contoh-topic', partition: 0 }],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
      }
    );
    consumer.on('message', async function(message) {
      console.log('here');
      console.log(
        'kafka-> ',
        message.value
      );
    })
    consumer.on('error', function(err) {
      console.log('error', err);
    });
  }
  catch(e) {
    console.log(e);
  }


http.listen(process.env.APP_LISTEN || 4700, () => {
    console.log('producer listen on : '  +process.env.APP_LISTEN);
});