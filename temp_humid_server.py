from bs4 import BeautifulSoup
import requests
import time
import csv
from datetime import datetime
from datetime import date
from os import path


#Gets data from server and returns as an array
##[ROOM_NAME, TIME/DATA, TEMP, HUMD]
def getData(room_url, room_name):
    #Open server webpage
    page = requests.get(room_url)
    soup = BeautifulSoup(page.content, "html.parser")

    #Get temp/humd from server
    temp = soup.find(id="temperature")
    humd = soup.find(id="humidity")

    #Get current time
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")

    data = [room_name, current_time, temp.text, humd.text]
    return data

#Writes data to CSV file
def writeData(data, writer):
    #Write to CSV
    writer.writerow(data)

    #Write to console
    print("Room %s|\tTime: %s\tTemp: %s\tHumd: %s"%(data[0], data[1], data[2], data[3]))

room_urls = [["http://192.168.0.212/", "1"], ["http://192.168.0.204", "2"]]


#generate filename w/ current date
today = date.today()
print("Today's Date: ", today)
todayTuple = today.timetuple()
filename = "edata_%s_%s_%s.csv"%(todayTuple.tm_year, todayTuple.tm_mon, todayTuple.tm_mday)

#if name w/ current date DE, copy old data to temp variable
oldData = []
if path.exists(filename):
    with open(filename, 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            oldData.append(row)
    file.close()
print(oldData)

# write data to file
with open(filename, 'w', newline='') as file:
    writer = csv.writer(file)

    if not oldData:
        writer.writerow(["Room", "Time", "Temperature", "Humidity"])
    else:
        print("Old file detected. Copying old data...")
        for row in oldData:
            writer.writerow(row)

    while True:
        for url in room_urls:
            try:
                data = getData(url[0], url[1])
                writeData(data, writer)
                
            except:
                print("ERROR: Could not get data for one or more of the rooms. Trying again.")
                time.sleep(5)
        time.sleep(1)
        

file.close()

