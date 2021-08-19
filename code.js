window.onload = function () {
    main();
    setCurrentDate(); 
}

//Sets current date in the html
function setCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    // console.log(today)
    document.getElementById("select-date").max = today;
    document.getElementById("select-date").value = today;
}

function main () {
    //GET YOUR time (t) and temperature (T), Humidity (H) values from CSV
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    //Choose a date that determines the csv file that the data is retrieved from
    var selected_date = document.getElementById("select-date").value.split("-");
    //Convoluted way to get rid of 0's in day numbers
    if(selected_date[1].includes("0")){
        selected_date[1] = selected_date[1].split("0")[1]; 
    }
    selected_date = selected_date[0] + '_' + selected_date[1] + '_' + selected_date[2];
    console.log(selected_date)

    dataPath = 'http://localhost:5500/data/edata_' + selected_date + '.csv';


    //Get particular day edata_YYYY_M_DD
    var response = httpGet(dataPath);
    var data = response.split("\n"); //Remove new line characters
    
    //I think this adds spacing to the data? Like a whitespace
    var dataArray = [], size = 1;
    while (data.length > 0){
        dataArray.push(data.splice(0, size));
        }

    var data = []; //wipes data variable

    numRooms = 0; //Start with 0 rooms and find the total number from data
    for (var i = 0; i < dataArray.length; i++) {
    data[i] = dataArray[i].toString().split(","); //Sets data[i] to an array of data for a particular time
    if(data[i][0] > numRooms){
        numRooms = data[i][0]; //Adds more rooms if larger room num detected
    }
    }
    //console.log(numRooms);

    //Init Data Vals
    //For each room, push numRoom empty arrays into each timeVals, tempVals, humdVals representing a data column for each room
    var timeVals = [];
    var tempVals = [];
    var humdVals = [];
    for(var j = 0; j < numRooms; j++){
        timeVals.push([]);
        tempVals.push([]);
        humdVals.push([]);
    }
    //console.log(timeVals)
    //Set Data Vals
    for (var i = 0; i < data.length; i++){
        for(var j = 0; j < numRooms+1; j++){
            if(j+1 == data[i][0]){
                //console.log(data[i][1])
                newT = new Date(data[i][1].substr(1,data[i][1].length)); //Parse time from data
                
                // console.log(data[i][1].substr(1,data[i][1].length))
                timeVals[j].push(newT); //Time
                tempVals[j].push(data[i][2]); //Temp
                humdVals[j].push(data[i][3].substr(0,data[i][3].length-2)); //Humidty
            }
        }
    }


    //WRITE VALUES
    dataTempPPS1 = [];
    dataTempPPS2 = [];
    for(i = 0; i < timeVals[0].length; i++){
        dataTempPPS1[i] = {x: timeVals[0][i], y: parseFloat(tempVals[0][i])};
    }
    for(i = 0; i < timeVals[0].length; i++){
        dataTempPPS2[i] = {x: timeVals[0][i], y: parseFloat(tempVals[1][i])};
    }

    dataHumdPPS1 = [];
    dataHumdPPS2 = [];
    for(i = 0; i< timeVals[0].length; i++){
        dataHumdPPS1[i] = {x: timeVals[0][i], y: parseFloat(humdVals[0][i])}
    }
    for(i = 0; i< timeVals[0].length; i++){
        dataHumdPPS2[i] = {x: timeVals[0][i], y: parseFloat(humdVals[1][i])}
    }

    console.log(dataHumdPPS1);

    // console.log(dataTempPPS1)
    // console.log(tempVals[1])
    var x = new Date(timeVals[0][1])
    console.log(x)

    //GET YOUR t and T, H values from CSV



    //PLOT VALUES
    var tempChart = new CanvasJS.Chart("chartContainer_temp", {
        title:{
            text: "Temperature"   
            },
        data: [
        {
            type: "line",
            dataPoints: dataTempPPS1,
            legendText: "Living Room",
            showInLegend: true
            
        },
        {
            type: "line",
            dataPoints: dataTempPPS2,
            legendText: "Connor's Room",
            showInLegend: true
            
        }
    ]
    });

    var humdChart = new CanvasJS.Chart("chartContainer_humd", {
        title:{
            text: "Humidity"   
            },
        data: [
        {
            type: "line",
            dataPoints: dataHumdPPS1,
            legendText: "Living Room",
            showInLegend: true
            
        },
        {
            type: "line",
            dataPoints: dataHumdPPS2,
            legendText: "Connor's Room",
            showInLegend: true
            
            
        }
    ]
    });
    

    tempChart.render();
    humdChart.render();
}