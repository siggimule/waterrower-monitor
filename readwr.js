
const fs = require('fs');
const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')
const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 1200
})
const { PerformanceObserver, performance } = require('perf_hooks');

//initialize stream object, needs to be done before loop to persist data
myStream = require('./mystream');
logfile = 'logs/' + Date.now() + '-raw.log';

//start main loop that receives byte stream from waterrower
const parser = port.pipe(new ByteLength({length: 1}))
parser.on('data', processbuffer) // will have 8 bytes per data event


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