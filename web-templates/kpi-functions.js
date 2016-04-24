function kpiReport() {
    console.log("kpiReport()");
	
	var report = {};
	
	report.padding       = 20;
	report.ySections     =  4;
	report.yTopBarHeight = 20;
	
	report.generateReport = function(kpiData, elId) {
		drawKPI(kpiData, elId);
	}
	
	report.drawKPIs = function(kpiDataArray, elId){
		
		for(var i=0; i < kpiDataArray.length; i++) {
			var kpiRootEl   = document.getElementById(elId);
			var kpiCanvasEl = document.createElement("canvas");
            kpiCanvasEl.setAttribute("width","300");
            kpiCanvasEl.setAttribute("height", "200");
			
			kpiRootEl.appendChild(kpiCanvasEl);
			report.drawKPI(kpiDataArray[i], kpiCanvasEl);	
		}
	}
	
	report.drawKPI = function(kpiData, elId) {
		var canvas  = elId;
		var context = canvas.getContext("2d");
		
		//draw kpi title
		context.fillText(kpiData.title, 0, 20);

		
		
		var maxVal = kpiData.dataPoints[0].value;
		var minVal = kpiData.dataPoints[0].value;
		
		for(var i=1; i < kpiData.dataPoints.length; i++) {
			if(maxVal < kpiData.dataPoints[i].value) {
				maxVal = kpiData.dataPoints[i].value;
			}
			if(minVal > kpiData.dataPoints[i].value){
				minVal = kpiData.dataPoints[i].value;
			}
		}
		console.log("max value: " + maxVal);
		console.log("min value: " + minVal);

		var chartWidth  = canvas.width  - (report.padding * 2);
		var chartHeight = canvas.height - (report.padding * 2) - report.yTopBarHeight;
		
		console.log("width:  " + chartWidth);
		console.log("height: " + chartHeight);
		
		var yPixelsPerValue = chartHeight / (maxVal - minVal);
		console.log("yPixelsPerValue: " + yPixelsPerValue);

		var chartTimeInterval = kpiData.timeInterval
		console.log("chart time interval: " + chartTimeInterval);
		
		var chartStartTime = Date.now() - kpiData.timeInterval;
		console.log("chart start time: " + chartStartTime);
		
		var xPixelsPerMillis = chartWidth / chartTimeInterval;
		console.log("xPixelsPerMillis: " + xPixelsPerMillis);

		//calculate x and y
        for(var i=0; i < kpiData.dataPoints.length; i++) {
			var dataPoint = kpiData.dataPoints[i];

			var dataPointDate = new Date(dataPoint.year, dataPoint.month, dataPoint.day); //add more later?
			dataPoint.x = report.padding + (dataPointDate.getTime() - chartStartTime) * xPixelsPerMillis;
            dataPoint.y = report.padding + report.yTopBarHeight + chartHeight - ( (dataPoint.value - minVal) * yPixelsPerValue);
		}		
		

		
		//draw y lines
		var deltaVal   = maxVal - minVal;
		console.log("deltaVal: " + deltaVal);
		context.strokeStyle = "#f0f0f0";

		var valPerLine = deltaVal / report.ySections;
		for(var i=0; i < report.ySections + 1; i++) {
		    var lineVal = i * valPerLine;
			
			var lineY = lineVal * yPixelsPerValue;
            var lineY = report.padding + report.yTopBarHeight + (chartHeight - (lineVal * yPixelsPerValue));

			context.beginPath();
			context.moveTo(report.padding, lineY);
            context.lineTo(report.padding + chartWidth, lineY);	
            context.closePath();
            context.stroke();			

			context.fillText("" + (minVal + lineVal), 0, lineY);
			
			console.log("lineY: " + lineY);
		}
		
		context.strokeStyle = kpiData.color;
		context.fillStyle   = kpiData.color;

		
				//draw KPI dots
		for(var i=0; i < kpiData.dataPoints.length; i++) {
			var dataPoint = kpiData.dataPoints[i];
			
			context.beginPath();
			context.arc(dataPoint.x, dataPoint.y, 3, 0, Math.PI * 2, true); 
			context.closePath();
			context.fill();
		}	
		
		//draw KPI lines
		context.lineWidth = 2;
		for(var i=1; i < kpiData.dataPoints.length; i++) {
			var dataPoint = kpiData.dataPoints[i];

			context.beginPath();
			context.moveTo(kpiData.dataPoints[i-1].x, kpiData.dataPoints[i-1].y);
            context.lineTo(kpiData.dataPoints[i].x, kpiData.dataPoints[i].y);	
            context.closePath();
            context.stroke();			
		}
		
		
	}
	
	return report;
}
