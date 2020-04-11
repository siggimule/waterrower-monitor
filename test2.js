/*

Byte 0 Identification Number = FEh
Byte 1 Distance covered in last second in 0.1m units (as used by the distance display)

Byte 0 Identification Number = FFh
Byte 1 Current no of Strokes per minute (equal to the displayed stroke rate)
Byte 2 Current Speed in 0.1m/s units (equal to the displayed speed)


*/



var values = ['fe','00','fe','15','fe','11','fe','0e','ff','16','0c','fe','0e','fe','0e']

/*in_fe = false;
in_ff = false;
partial_distance = 0;
total_distance = 0;
byte_1 = false;
total_strokes = 0;
*/

myStream = require('./mystream');

values.forEach(function(item, index, array) {
    
   // console.log(item, index);  
    myStream.readStream(item); 
    console.log(myStream.getStreamValue()); 
    
         
    } 
); // end loop


