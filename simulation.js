/*

Byte 0 Identification Number = FEh
Byte 1 Distance covered in last second in 0.1m units (as used by the distance display)

Byte 0 Identification Number = FFh
Byte 1 Current no of Strokes per minute (equal to the displayed stroke rate)
Byte 2 Current Speed in 0.1m/s units (equal to the displayed speed)


*/

"use strict";


var values = ['fe','00','fe','15','fe','11','fe','0e','ff','16','0c','fe','0e','fe','0e']

/*in_fe = false;
in_ff = false;
partial_distance = 0;
total_distance = 0;
byte_1 = false;
total_strokes = 0;
*/

const fs = require('fs');
var myStream = require('./mystream');
var mybyte;

//simulation run by using a previous log 
var reader = fs.createReadStream ('logs/1586675408917-raw.log',{fd:null,encoding:'latin1'});

reader.on ('readable', getbyte);

function getbyte(){
  var chunk;
  while (null !== (chunk = reader.read(2) /* here */)) {
    processbuffer(chunk); // chunk is one byte
  }
}

function processbuffer(data){

    try {
        mybyte = data.toString('hex');
   //   log_file(mybyte);
        myStream.readStream(mybyte); 
        console.log(myStream.getStreamValue()); 

    } catch(err) {
            console.log(err);
    }
}


/*
values.forEach(function(item, index, array) {
    
   // console.log(item, index);  
    myStream.readStream(item); 
    console.log(myStream.getStreamValue()); 
    
         
    } 
); // end loop

*/
