/*
node monitorwr.js simulation -f logs/1586675408917-raw.log -i 500
*/


"use strict"

var express = require('express')
var app = express()
const fs = require('fs')
const yargs = require('yargs')
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

    .command('live', 'Live mode', {
      log: {
          description: 'Logfile to write',
          alias: 'l',
          type: 'string',
      }
  })
    .help()
    .alias('help', 'h')
    .argv;


/********************************************main********************************************** */

//Web Server stuff
app.use(express.static('public'))

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})

app.get('/',function (req, res) {
  res.sendFile( __dirname + "/public/" + "index.htm" )
})

app.get('/value', function (req, res) {
  res.send(JSON.stringify(myStream.getStreamValue()))
})

//Waterrower data streams
var myStream = require('./mystream')

if (argv._.includes('simulation')) {
  console.log("Simulation mode...")
    //argv.file ;
   
  var reader = fs.createReadStream (argv.file,{fd:null,encoding:'latin1'}); 
  reader.on ('readable', getbyte);
      
  async function getbyte(){
    var chunk;
    while (null !== (chunk = reader.read(2) )) {
      processbuffer(chunk)
      await sleep(argv.interval)
    }        
  }    
} 

if (argv._.includes('live')) {
  console.log("Live mode...")
  const port = new SerialPort('/dev/ttyUSB0', { baudRate: 1200})
  
  if (argv.log) {
    var logfile = 'logs/' + Date.now() + '-raw.log'
  }
  
  const parser = port.pipe(new ByteLength({length: 1}))
  parser.on('data', processbuffer)

}


/*********************************functions************************************** */

function processbuffer(data){
  try {
    var mybyte = data.toString('hex')
    myStream.readStream(mybyte)
    // console.log(myStream.getStreamValue()); 
  } catch(err) {
    console.log(err)
  }
}

function log_file (data){
  fs.appendFile( logfile, data, (err) => {
    if (err) throw err
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}   