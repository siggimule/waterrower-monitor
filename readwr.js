/*
node readwr.js simulation -f logs/1586675408917-raw.log -i 500
*/


"use strict";

const fs = require('fs');
const yargs = require('yargs');
const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')


const argv = yargs
    .command('simulation', 'Simulation mode', {
        file: {
            description: 'Logfile to read',
            alias: 'f',
            type: 'string',
        },

        interval: {
          description: 'Reading interval',
          alias: 'i',
          type: 'integer',
      }
    })
    .option('log', {
        alias: 'l',
        description: 'Write logfile of raw data',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

/*********************************************************************************************************** */


var myStream = require('./mystream'); 

if (argv._.includes('simulation')) {
  console.log("Simulation mode...");
    //argv.file ;
    var reader = fs.createReadStream (argv.file,{fd:null,encoding:'latin1'});
    
    reader.on ('readable', getbyte);

    function getbyte(){
     var chunk;
      while (null !== (chunk = reader.read(2) /* here */)) {
        processbuffer(chunk); // chunk is one byte
        sleep(argv.interval);
        
    }
}
    
} else {

  console.log("Live mode...")

  const port = new SerialPort('/dev/ttyUSB0', { baudRate: 1200})

  //initialize stream object, needs to be done before loop to persist data

  if (argv.log) {
    var logfile = 'logs/' + Date.now() + '-raw.log';
  }
  
  //start main loop that receives byte stream from waterrower
  const parser = port.pipe(new ByteLength({length: 1}))
  parser.on('data', processbuffer)

}


/*********************************functions************************************** */

function processbuffer(data){

    try {
        var mybyte = data.toString('hex');
       // log_file(mybyte);
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


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}