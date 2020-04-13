"use strict";

const fs = require('fs');
const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')


var timeoutScheduled = Date.now();

setImmediate(() => {
    console.log('immediate timer');
  });

  setInterval(function () { 
    console.log('second passed'); 
}, 5000);

setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;
  
    console.log(`${delay}ms have passed since I was scheduled`);
  }, 5000);
  


const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 1200, autoOpen: false 
})

// Read data that is available but keep the stream in "paused mode"
//port.on('readable', function () {
//    console.log('Data:', port.read())
//  })



 port.on('open', showPortOpen);
 // port.on('data', readSerialData);
 port.on('close', showPortClose);
 port.on('error', showError);

  function showPortOpen() {
    console.log('port open. Data rate: ' + port.baudRate);
 }
  
 function readSerialData(data) {
    console.log(data);
 }
  
 function showPortClose() {
    console.log('port closed.');
 }
  
 function showError(error) {
    console.log('Serial port error: ' + error);
 }

//initialize stream object, needs to be done before loop to persist data
//myStream = require('./mystream');
//logfile = 'logs/' + Date.now() + '-raw.log';

//start main loop that receives byte stream from waterrower
//const parser = port.pipe(new ByteLength({length: 1}))
//parser.on('data', processbuffer) // will have 8 bytes per data event



/*
function processbuffer(data){

    try {
        mybyte = data.toString('hex');
        log_file(mybyte);
        myStream.readStream(mybyte); 
        console.log(myStream.getStreamValue()); 

    } catch(err) {
            console.log(err);
    }
}


function log_file (data){
    fs.appendFile( logfile, data, (err) => {
        if (err) throw err;
      });
}

*/