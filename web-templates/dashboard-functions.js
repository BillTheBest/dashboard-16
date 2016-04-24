function financialReport() {
	var finReportObj = {};
	
	finReportObj.draw = function(data, elId) {
		var el = document.getElementById(elId);

		var reportStr = "";

		for(var i=0; i<data.length; i++) {
			reportStr += "<table class='financialTable' cellspacing='0' cellpadding='6'><tr><th align='left'>Date</th><th align='left'>Text</th><th align='right'>Amount</th><th align='right'>Balance</th><th align='left'>Receipt</th></tr>";
			for(var j=0; j<data[i].posts.length; j++) {
				reportStr += "<tr><td align='left'>";
				reportStr += data[i].posts[j].date;
				reportStr += "</td><td align='left'>";
				reportStr += data[i].posts[j].text;
				reportStr += "</td><td align='right'>";
				reportStr += data[i].posts[j].amount;
				reportStr += "</td><td align='right'>";
				reportStr += data[i].posts[j].balance;
				reportStr += "</td><td align='left'>";
				reportStr += "<a href='" + data[i].posts[j].receiptUrl + "'>";
				reportStr += data[i].posts[j].receiptUrl;
				reportStr += "</a></td><tr>";
			}
			reportStr +="</table>";
		}
		
		el.innerHTML = reportStr;
	}
	
	return finReportObj;
}

function menu() {
	var menuObj = {};
	
	menuObj.draw = function(data, elId) {
		var el = document.getElementById(elId);
		
		var menuStr = "<ul class='menuList'>";
		for(var i=0; i<data[0].items.length; i++) {
			menuStr += "<li><a href='";
			menuStr += data[0].items[i].url
			menuStr += "'>";
			menuStr += data[0].items[i].text;
			menuStr += "</a></li>";
		}
		menuStr +="</ul>";
		
		el.innerHTML = menuStr;
	}
	
	return menuObj;
}

function dashboard() {
	
	var dashboardObj = {};
	
	var kpiReportObj       = kpiReport();
	var financialReportObj = financialReport();
	var menuObj            = menu();
	
	dashboardObj.draw = function(dashboardConfig) {
		document.title = dashboardConfig.title;
		document.getElementById("topBarTitle").innerHTML = dashboardConfig.title;
		
		for(var i=0; i<dashboardConfig.widgets.length; i++) {
			if(dashboardConfig.widgets[i].type == "kpi") {
				kpiReportObj.drawKPIs(dashboardConfig.widgets[i].data, dashboardConfig.widgets[i].elId); 
			} else if(dashboardConfig.widgets[i].type == "menu") {
				menuObj.draw(dashboardConfig.widgets[i].data, dashboardConfig.widgets[i].elId);
			} else if(dashboardConfig.widgets[i].type == "finance") {
				financialReportObj.draw(dashboardConfig.widgets[i].data, dashboardConfig.widgets[i].elId);
			}
		}
	}
	
	return dashboardObj;
}