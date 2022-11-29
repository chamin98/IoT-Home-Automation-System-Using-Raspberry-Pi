import RPi.GPIO as GPIO 
import pyrebase 
from time import sleep
import time
import board
import busio as io
import adafruit_mlx90614
import datetime
import pytz
import json


config = {
  "apiKey": "6OtjiwFM57Dtsa2E2iNWPtN7gNY25f7Nhp7xljll",
  "authDomain": "cseproject-27665.firebaseapp.com",
  "databaseURL": "https://cseproject-27665-default-rtdb.asia-southeast1.firebasedatabase.app",
  "storageBucket": "project-id.appspot.com"
}

firebase = pyrebase.initialize_app(config)
i2c = io.I2C(board.SCL, board.SDA, frequency=100000)
mlx = adafruit_mlx90614.MLX90614(i2c)

Fan_1 = 5
Switch_1 = 16
Bulb_1 = 25

GPIO.setmode(GPIO.BCM)   
GPIO.setwarnings(False)
GPIO.setup(Fan_1,GPIO.OUT)
GPIO.setup(Switch_1,GPIO.OUT)
GPIO.setup(Bulb_1,GPIO.OUT)

current_time = datetime.datetime.now(pytz.timezone('Asia/Kolkata'))

try:
    
    
    
    while True:
        db = firebase.database()
        #ProjectBucket = database.child("Bulb")     
        RELAY1val = db.child("Relays").child("Fan_1").get().val()
        RELAY2val = db.child("Relays").child("Switch_1").get().val()
        RELAY3val = db.child("Relays").child("Bulb_1").get().val()
        
        print(RELAY1val)
        print(RELAY2val)
        print(RELAY3val)
        
        
        
        #Relay 1
        if RELAY1val:
            print("Relay 1 is now on.")
            GPIO.output(Fan_1, GPIO.HIGH)
        else:
            print("Relay 1 is now Off")
            GPIO.output(Fan_1, GPIO.LOW)
        sleep(1)
        
        #Relay 2
        if RELAY2val:
            print("Relay 2 is now off.")
            GPIO.output(Switch_1, GPIO.LOW)
        else:
            print("Relay 2 is now on")
            GPIO.output(Switch_1, GPIO.HIGH)
        sleep(1)
        
        #Relay 3
        if RELAY3val:
            print("Relay 3 is now off.")
            GPIO.output(Bulb_1, GPIO.LOW)
        else:
            print("Relay 3 is now on")
            GPIO.output(Bulb_1, GPIO.HIGH)
        sleep(1)
    
    
        print("Send Data to Firebase Using Raspberry Pi")
        print("—————————————-")
       
        print()
    
    #while True:
        ambientString = "{:.2f}".format(mlx.ambient_temperature)
        objectString = "{:.2f}".format(mlx.object_temperature)

        ambientCelsius = float(ambientString)
        objectCelsius = float(objectString)
        
        currentDate = str(current_time.date())
        currentTime = str(current_time.time())

        print("Ambient Temp: {} °C".format(ambientString))
        print("Object Temp: {} °C".format(objectString))
        print()

        data = {
        "ambient": ambientCelsius,
        "date": str(currentDate),
        "time": str(currentTime),
        # "object": objectCelsius,
        }
        
        db.child("mlx90614").child("current").set(data)
        db.child("mlx90614").child("history").push(data)
  
        #break

        time.sleep(2)

    
    
                    
except KeyboardInterrupt: 
    print("Ended")
    GPIO.cleanup()

