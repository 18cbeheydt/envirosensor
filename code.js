window.onload = function () {

    //GET YOUR t and T, H values from CVS
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    
    var response = httpGet('http://localhost:5500/edata_2021_6_18.csv');//httpGet('http://192.168.43.41:1880/data.csv');
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
                console.log(data[i][1])
                newT = new Date(data[i][1].substr(1,data[i][1].length));
                
                console.log(data[i][1].substr(1,data[i][1].length))
                timeVals[j].push(newT); //Time
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

    t = new Date('6/18/2021 16:30:00');
    console.log(t)


    //WRITE VALUES
    dataPPS = [];
    dataPPS2 = [];
    for(i = 0; i < timeVals[0].length; i++){
        dataPPS[i] = {x: timeVals[0][i], y: parseFloat(tempVals[0][i])};
    }
    for(i = 0; i < timeVals[0].length; i++){
        dataPPS2[i] = {x: timeVals[0][i], y: parseFloat(tempVals[1][i])};
    }
    console.log(dataPPS)
    console.log(tempVals[1])
    var x = new Date(timeVals[0][1])
    console.log(x)

    //GET YOUR t and T, H values from CVS



    //PLOT VALUES
    var chart = new CanvasJS.Chart("chartContainer", {
        data: [
        {
            type: "line",
            dataPoints: dataPPS
            
        },
        {
            type: "line",
            dataPoints: dataPPS2
            
        }
    ]


    });
    

    chart.render();
}