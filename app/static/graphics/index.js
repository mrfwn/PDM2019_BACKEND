$(function () {
  var totalRevenue = 100;

  // CanvasJS column chart to show revenue from Jan 2015 - Dec 2015
  var revenueColumnChart = new CanvasJS.Chart("revenue-column-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    theme: "theme2",
    axisX: {
      labelFontSize: 14,
      valueFormatString: "MMM YYYY"
    },
    axisY: {
      labelFontSize: 14,
      prefix: ""
    },
    toolTip: {
      borderThickness: 0,
      cornerRadius: 0
    },
    data: [
      {
        type: "column",
        yValueFormatString: "$###,###.##",
        dataPoints: [
          { x: new Date("1 Jan 2018"), y: 2 },
          { x: new Date("1 Feb 2018"), y: 3 },
          { x: new Date("1 Mar 2018"), y: 5 },
          { x: new Date("1 Apr 2018"), y: 10 },
          { x: new Date("1 May 2018"), y: 7 },
          { x: new Date("1 Jun 2018"), y: 6 },
          { x: new Date("1 Jul 2018"), y: 5 },
          { x: new Date("1 Aug 2018"), y: 12 },
          { x: new Date("1 Sep 2018"), y: 3 },
          { x: new Date("1 Oct 2018"), y: 8 },
          { x: new Date("1 Nov 2018"), y: 6 },
          { x: new Date("1 Dec 2018"), y: 5 }
        ]
      }
    ]
  });

  revenueColumnChart.render();

  //CanvasJS pie chart to show product wise annual revenue for 2015
  var productsRevenuePieChart = new CanvasJS.Chart("products-revenue-pie-chart", {
    animationEnabled: true,
    theme: "theme2",
    legend: {
      fontSize: 14
    },
    toolTip: {
      borderThickness: 0,
      content: "<span style='\"'color: {color};'\"'>{name}</span>: {y} (#percent%)",
      cornerRadius: 0
    },
    data: [
      {
        indexLabelFontColor: "#676464",
        indexLabelFontSize: 14,
        legendMarkerType: "square",
        legendText: "{indexLabel}",
        showInLegend: true,
        startAngle:  90,
        type: "pie",
        dataPoints: [
          {  y: 10, name:"Tipo A", indexLabel: "Tipo A - 41%", legendText: "Tipo A", exploded: true },
          {  y: 5, name:"Tipo B", indexLabel: "Tipo B - 18%", legendText: "Tipo B" },
          {  y: 2, name:"Tipo C", indexLabel: "Tipo C - 24%", legendText: "Tipo C", color: "#8064a1" },
          {  y: 1, name:"Tipo X", indexLabel: "Tipo X - 17%", legendText: "Tipo X" }
        ]
      }
    ]
  });

  productsRevenuePieChart.render();

  //CanvasJS spline chart to show orders from Jan 2015 to Dec 2015
  var ordersSplineChart = new CanvasJS.Chart("orders-spline-chart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    theme: "theme2",
    toolTip: {
      borderThickness: 0,
      cornerRadius: 0
    },
    axisX: {
      labelFontSize: 14,
      maximum: new Date("31 Dec 2015"),
      valueFormatString: "MMM YYYY"
    },
    axisY: {
      gridThickness: 0,
      labelFontSize: 14,
      lineThickness: 2
    },
    data: [
      {
        type: "spline",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 17376 },
          { x: new Date("1 Feb 2015"), y: 21431 },
          { x: new Date("1 Mar 2015"), y: 25724 },
          { x: new Date("1 Apr 2015"), y: 22138 },
          { x: new Date("1 May 2015"), y: 20676 },
          { x: new Date("1 Jun 2015"), y: 25429 },
          { x: new Date("1 Jul 2015"), y: 29160 },
          { x: new Date("1 Aug 2015"), y: 23317 },
          { x: new Date("1 Sep 2015"), y: 31883 },
          { x: new Date("1 Oct 2015"), y: 30034 },
          { x: new Date("1 Nov 2015"), y: 31768 },
          { x: new Date("1 Dec 2015"), y: 41215 }
        ]
      }
    ]
  });

  ordersSplineChart.render();

  var bdpe = new RadialGauge({
renderTo: 'bdpe',
width: 300,
height: 300,
units: '{{ bdpeMtbf }}',
minValue: 0,
startAngle: 90,
ticksAngle: 180,
valueBox: false,
maxValue: '{{goalProgram["bdpe"]*2}}',
majorTicks: [

],
minorTicks: 2,
strokeTicks: true,
highlights: [
    {"from": 0, "to": '{{goalProgram["bdpe"]}}', "color": "rgba(200, 50, 50, .75)"},
    {"from": '{{goalProgram["bdpe"]}}', "to": '{{goalProgram["bdpe"]*2}}', "color": "rgba(81, 205, 160, .75)"}
],
colorPlate: "#fff",
borderShadowWidth: 0,
borders: false,
needleType: "arrow",
needleWidth: 2,
needleCircleSize: 7,
needleCircleOuter: true,
needleCircleInner: false,
animationDuration: 1500,
animationRule: "linear"
}).draw();

var netv1 = new RadialGauge({
renderTo: 'netv1',
width: 300,
height: 300,
units: '{{ netv1Mtbf }}',
minValue: 0,
startAngle: 90,
ticksAngle: 180,
valueBox: false,
maxValue: '{{goalProgram["netv1"]*2}}',
majorTicks: [

],
minorTicks: 2,
strokeTicks: true,
highlights: [
{"from": 0, "to": '{{goalProgram["netv1"]}}', "color": "rgba(200, 50, 50, .75)"},
{"from": '{{goalProgram["netv1"]}}', "to": '{{goalProgram["netv1"]*2}}', "color": "rgba(81, 205, 160, .75)"}
],
colorPlate: "#fff",
borderShadowWidth: 0,
borders: false,
needleType: "arrow",
needleWidth: 2,
needleCircleSize: 7,
needleCircleOuter: true,
needleCircleInner: false,
animationDuration: 1500,
animationRule: "linear"
}).draw();

var ge = new RadialGauge({
renderTo: 'ge',
width: 300,
height: 300,
units: '{{ geMtbf }}',
minValue: 0,
startAngle: 90,
ticksAngle: 180,
valueBox: false,
maxValue: '{{goalProgram["ge"]*2}}',
majorTicks: [

],
minorTicks: 2,
strokeTicks: true,
highlights: [
{"from": 0, "to": '{{goalProgram["ge"]}}', "color": "rgba(200, 50, 50, .75)"},
{"from": '{{goalProgram["ge"]}}', "to": '{{goalProgram["ge"]*2}}', "color": "rgba(81, 205, 160, .75)"}
],
colorPlate: "#fff",
borderShadowWidth: 0,
borders: false,
needleType: "arrow",
needleWidth: 2,
needleCircleSize: 7,
needleCircleOuter: true,
needleCircleInner: false,
animationDuration: 1500,
animationRule: "linear"
}).draw();

var netv2 = new RadialGauge({
renderTo: 'netv2',
width: 300,
height: 300,
units: '{{ netv2Mtbf }}',
minValue: 0,
startAngle: 90,
ticksAngle: 180,
valueBox: false,
maxValue: '{{goalProgram["netv2"]*2}}',
majorTicks: [

],
minorTicks: 2,
strokeTicks: true,
highlights: [
{"from": 0, "to": '{{goalProgram["netv2"]}}', "color": "rgba(200, 50, 50, .75)"},
{"from": '{{goalProgram["netv2"]}}', "to": '{{goalProgram["netv2"]*2}}', "color": "rgba(81, 205, 160, .75)"}
],
colorPlate: "#fff",
borderShadowWidth: 0,
borders: false,
needleType: "arrow",
needleWidth: 2,
needleCircleSize: 7,
needleCircleOuter: true,
needleCircleInner: false,
animationDuration: 1500,
animationRule: "linear"
}).draw();

bdpe.value = '{{ bdpeMtbf }}';
netv1.value = '{{netv1Mtbf}}';
ge.value = '{{geMtbf}}';
netv2.value = '{{netv2Mtbf}}';
});
