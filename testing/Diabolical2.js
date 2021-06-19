function getDataPointsFromCSV(url, chart) {
    $.when($.get(url, function(data) {
      //chart.options.data[0].dataPoints = [];
      var allLinesArray = data.split("\n");
      if( allLinesArray.length > 0 ){
        for (var i = 0; i < allLinesArray.length; i++) {
          var rowData = allLinesArray[i].split(",");
          chart.options.data[0].dataPoints.push({ y: parseInt(rowData[0]) });
        }
      }
    })).then(function( data, textStatus, jqXHR ) {  
        chart.render();
    });
  }
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Line Chart from CSV",
    },
    data: [{
        type: "line", 
        dataPoints: []
    }]
  });
  
  getDataPointsFromCSV("enviro_data.csv", chart);
  
  var updateChart = function () {
    getDataPointsFromCSV("enviro_data.csv", chart);
  };
  
  setInterval(function(){updateChart()}, 1000); 