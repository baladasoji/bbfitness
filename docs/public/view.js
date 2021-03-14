var activitycols = [
                  {field:'Date', title:'Date'},
                  {field:'Title', title:'Title'},
                  {field:'Type', title:'Type'},
                  {field:'Distance', title:'Distance(km)'},
                  {field:'Duration', title:'Duration(mins)'},
                  {field:'Points', title:'Points'}
              ];

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
function populateAthleteActivities(name,athleteactivities) {
  console.log(athleteactivities);
  //document.getElementById("athletename").innerText=name ;
  $('#athleteactivities').bootstrapTable({columns:activitycols, data:athleteactivities});
  $('#athleteactivities').bootstrapTable('load',athleteactivities);
  $('#athleteactivities').bootstrapTable('refreshOptions',{"theadClasses": "thead-light"});
}

function apiGetAthleteActivities(athleteid,weeknum)
{
  var apiXMLReq = new XMLHttpRequest();
  if (athleteid == null && weeknum == null )
    apiXMLReq.open("GET", bb_api_url + '/athlete/activities?details=true' , true );
  else if (athleteid == null && weeknum != null )
    apiXMLReq.open("GET", bb_api_url + '/athlete/activities?details=true'+ '&week='+weeknum , true );
  else if (athleteid != null && weeknum == null )
    apiXMLReq.open("GET", bb_api_url + '/athlete/activities?id='+athleteid+'&details=true' , true );
  else if (athleteid != null && weeknum != null )
    apiXMLReq.open("GET", bb_api_url + '/athlete/activities?id='+athleteid+'&week='+weeknum+'&details=true' , true );
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
function loadTables()
{
   id=getURLParameter('id');
   weeknum=getURLParameter('weeknum');
   apiGetAthleteActivities(id,weeknum);
}
