/*

http://www.waterrower.biz/en/accessories_software_spec.htm

Byte 0 Identification Number = FEh
Byte 1 Distance covered in last second in 0.1m units (as used by the distance display)

Byte 0 Identification Number = FFh
Byte 1 Current no of Strokes per minute (equal to the displayed stroke rate)
Byte 2 Current Speed in 0.1m/s units (equal to the displayed speed)

*/

"use strict"

var partialDistance, totalDistance, currentStrokerate, totalStrokes, currentSpeed, lastByte, secondByte, sessionStartDate

partialDistance = 0
totalDistance = 0
currentStrokerate = 0
totalStrokes = 0
currentSpeed = 1
lastByte = 0
secondByte = false
sessionStartDate = Date.now()
var sessionElapsedTime = 0
var timestamp = 0



// You're returning an object with property values set above

exports.getStreamValue = function () {
    return {
        timestamp: timestamp,
        sessionStartDate : sessionStartDate,
        sessionElapsedTime : timestamp - sessionStartDate,
        partialDistance: partialDistance,
        totalDistance: totalDistance,
        currentStrokerate: currentStrokerate,
        totalStrokes: totalStrokes,
        currentSpeed: currentSpeed
    }
}



module.exports.readStream = function(myByte){

    var byteValue =  parseInt(myByte,16)
    timestamp = Date.now()

    if (lastByte == 'fe'){
        partialDistance = byteValue
        totalDistance += partialDistance

    }

    if (lastByte == 'ff'){
        currentStrokerate = byteValue
        totalStrokes++
        secondByte = true
    }

    if ((secondByte == true) && (lastByte != 'ff') ){
        currentSpeed = byteValue
        secondByte = false 
        
    }
    
    lastByte = myByte     

}


