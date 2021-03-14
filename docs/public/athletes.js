//var players;
var timersecs=0;
var athletecols =[
                  {sortable:true,field:'firstname',width:100, title:'First Name'},
                  {sortable:true,field:'lastname',width:100, title:'Last Name'},
                  {sortable:true,field:'country',width:100, title:'Country'},
                  {sortable:true,field:'profile',width:100, title:'Pic', formatter:imageFormatter},
                  {field: 'operate', width:100, title: 'See Activities', align: 'center', clickToSelect: false,  formatter: operateFormatter }
               ];
var ircols = [
                  {field:'Date', title:'Date'},
                  {field:'Title', title:'Title'},
                  {field:'Type', title:'Type'},
                  {field:'Distance', title:'Distance(km)'},
                  {field:'Duration', title:'Duration(mins)'},
                  {field:'Points', title:'Points'}
              ];
/*********** Utility Functions in the Beginning *******************/

/* Utility method to get value of a URLParameter
* works both with JS style and standard styles */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function initializeApp() {
  
}

function operateFormatter(value, row, index) {
  return '<a href="view.html?id='+row.id + '"><i class="fa fa-walking fa-2x"></i> </a>' ;
}

function imageFormatter(value, row, index) {
    return `<img src="` + value + `" width="100" height="100">` ;
}

function populateAthletes(allathletes)
{
  $('#index').bootstrapTable({columns:athletecols, data:allathletes});
  $('#index').bootstrapTable('load',allathletes);
  $('#index').bootstrapTable('refreshOptions',{"theadClasses": "thead-light"});
//  $('#index').on('click-row.bs.table', function (e, row, $element) {
//    apiGetAthleteActivities(row.id);
//  document.getElementById("athleteactivities").scrollIntoView({behavior: "smooth",block:"start"});
//}); 
  //allresults.forEach(r => { displayResultTable(r);});
}


function populateAthleteActivities(name,athleteactivities) {
  console.log(athleteactivities);
  document.getElementById("athletename").innerText=name ;
  $('#athleteactivities').bootstrapTable({columns:ircols, data:athleteactivities});
  $('#athleteactivities').bootstrapTable('load',athleteactivities);
  $('#athleteactivities').bootstrapTable('refreshOptions',{"theadClasses": "thead-light"});
}


function apiGetAthleteActivities(athleteid)
{
  var apiXMLReq = new XMLHttpRequest();
     apiXMLReq.open("GET", bb_api_url + '/athlete/activities?id='+athleteid+'&details=true' , true );
  apiXMLReq.send(null);
  apiXMLReq.onload = function () {
      if (apiXMLReq.readyState == 4 && apiXMLReq.status == "200") {
        athleteactivities = JSON.parse(apiXMLReq.responseText);
        populateAthleteActivities(athleteactivities[0].name, athleteactivities[0].activities);
         // alert('All players checkedout');
      } else {
          alert('Error in Get Results');
      }
  }
}
function apiGetAthletes()
{
  var apiXMLReq = new XMLHttpRequest();
     apiXMLReq.open("GET", bb_api_url + '/athletes' , true );
  apiXMLReq.send(null);
  apiXMLReq.onload = function () {
      if (apiXMLReq.readyState == 4 && apiXMLReq.status == "200") {
        allathletes = JSON.parse(apiXMLReq.responseText);
        populateAthletes(allathletes);
         // alert('All players checkedout');
      } else {
          alert('Error in Get Results');
      }
  }
}
