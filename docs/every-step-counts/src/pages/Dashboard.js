import React from 'react';
import Typography from "@material-ui/core/Typography";
import Athletes from "./Athletes";

function DashboardPage() {
    return (
        <div className="MuiGrid-container" id="testid"> 
        <Typography variant={"h6"} noWrap>
            Annual Leaderboard - 2021
        </Typography>
        <Athletes/>
        </div>
    );
}

function apiGetAthleteActivities(athleteid,weeknum)
{
  var apiXMLReq = new XMLHttpRequest();
  var athleteactivities=[];
  var bb_api_url= "https://09zopybgw3.execute-api.eu-west-1.amazonaws.com/prod/"
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
        return athleteactivities;
        //populateAthleteActivities(athleteactivities[0].name, athleteactivities[0].activities);
         // alert('All players checkedout');
      } else {
          alert('Error in Get Results');
      }   
  }
}


export default DashboardPage;
