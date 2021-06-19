window.onload = function () {

    //GET YOUR t and T, H values from CVS
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    
    var response = httpGet('http://localhost:5500/data.csv');//httpGet('http://192.168.43.41:1880/data.csv');
    var data = response.split("\n");
    var dataArray = [], size = 1;
    while (data.length > 0){
          dataArray.push(data.splice(0, size));
        }

    var data = [];

    numRooms = 0;
    for (var i = 0; i < dataArray.length; i++) {
      data[i] = dataArray[i].toString().split(",");
      if(data[i][0] > numRooms){
          numRooms = data[i][0];
      }
    }
    //console.log(numRooms);

    //Init Data Vals
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
                timeVals[j].push(data[i][1]); //Time
                tempVals[j].push(data[i][2]); //Temp
                humdVals[j].push(data[i][3].substr(0,data[i][3].length-2)); //Humidty
            }
        }
    }
    // console.log(timeVals);
    // console.log(tempVals);
    // console.log(humdVals);

    console.log(timeVals[0][1])
    console.log(Date.parse(timeVals[0][1]))
    // function convert(input) {
    //     return moment(input, 'HH:mm:ss').format('h:mm:ss A');
    // }
    
    // console.log(convert('20:00:00'));
    // console.log(convert('08:00:00'));
    // console.log(convert('16:30:00'));


    //WRITE VALUES
    dataPPS = [];
    for(i = 0; i < timeVals[0].length; i++){
        dataPPS[i] = {x: timeVals[0][i], y: parseFloat(tempVals[0][i])};
    }
    console.log(dataPPS)
    var x = new Date(timeVals[0][1])
    console.log(x)

    //GET YOUR t and T, H values from CVS
    xVals2 = [1, 2, 3, 4, 5, 6, 7];
    yVals2 = ["22:42:16", "22:52:17", "23:02:17", "23:12:17", "23:22:18", "23:32:18", "23:42:19"];
    dataPPS2 = [];

    

    //WRITE VALUES
    for(i = 0; i < xVals2.length; i++){
        dataPPS2[i] = {x: xVals2[i], y: yVals2[i]};
    }


    //PLOT VALUES
    var chart = new CanvasJS.Chart("chartContainer", {
        data: [
        {
            type: "line",
            dataPoints: dataPPS2
            
        }

        ],
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        format: "HH:MM:SS"
                    }
                }]
            }
        }


    });
    

    chart.render();
}