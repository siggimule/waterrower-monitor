#!/usr/bin/python
import serial
ser = serial.Serial('/dev/ttyUSB0',1200)
read_byte = ser.read()
while read_byte is not None:
    read_byte = ser.read()
    print '%x' % ord(read_byte)

