from bs4 import BeautifulSoup
import requests
import time
import csv
from datetime import datetime


URL =  "http://192.168.0.212/"
URL2 = "http://192.168.0.204/"

with open('eviro_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Room", "Time", "Temperature", "Humidity"])
    for i in range(0,5):
        page = requests.get(URL)
        page2 = requests.get(URL2)

        soup = BeautifulSoup(page.content, 'html.parser')
        soup2 = BeautifulSoup(page2.content, 'html.parser')

        temp = soup.find(id="temperature")
        humd = soup.find(id="humidity")

        temp2 = soup2.find(id="temperature")
        humd2 = soup2.find(id="humidity")

        #Get current time
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")

        #Write to CSV    
        writer.writerow(["1", current_time, temp.text, humd.text])
        writer.writerow(["2", current_time, temp2.text, humd2.text])

        #Write to consol
        print("~~~~~~~~~~~~~~~")
        print("Room 1|\tTime: " + current_time + "\tTemp: " + temp.text + "\tHumd: " + humd.text)
        print("Room 2|\tTime: " + current_time + "\tTemp: " + temp2.text + "\tHumd: " + humd2.text)
        time.sleep(1)

file.close()

