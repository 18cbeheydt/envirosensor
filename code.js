window.onload = function () {

    //GET YOUR t and T, H values from CVS
    xVals = [1, 2, 3, 4, 5, 6, 7];
    yVals = [7, 3, 5, 6, 7, 8, 2];
    dataPPS = [];


    //WRITE VALUES
    for(i = 0; i < xVals.length; i++){
        dataPPS[i] = {x: xVals[i], y: yVals[i]};
    }


    //PLOT VALUES
    var chart = new CanvasJS.Chart("chartContainer", {
        data: [
        {
            type: "line",
            dataPoints: dataPPS
            
        }
        ]
    });
    

    chart.render();
}