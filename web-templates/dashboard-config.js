var dashboardConfig = {
     title : "My Dashboard"
	,widgets :  [ 
	     { id : "1", elId : "kpiRoot" ,    type : "kpi" ,    data : kpis }
	    ,{ id : "2", elId : "menuRoot",    type : "menu",    data : [ { style : "tree"  , items : [ {text : "Financial", url : "#financial"}, { text : "KPIs", url : "#kpis"} ] } ] }
	    ,{ id : "3", elId : "financeRoot", type : "finance", data : [ bank1Data ] }
	]
}