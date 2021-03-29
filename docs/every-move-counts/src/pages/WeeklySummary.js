import React from 'react';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


var threshold_low = 50;
var threshold_medium = 100;
var threshold_high = 200;
const columns = [
  { field: 'picture', headerName: 'Photo', width: 60, renderHeader: () => ("📸"), renderCell: (params: GridCellParams) => ( <img src={params.value} width="40" height="30" style={{borderRadius:"40%"}}  alt="?" />) },
  { field: 'name', headerName: 'Name', width: 175 },
  { field: 'total', headerName: 'Total', type: 'number', width: 75 , renderHeader:() => ("Σ"), cellClassName: (params) =>
      clsx('athlete-app', {
      nx2: params.value < threshold_low,
      nx1: params.value < threshold_medium && params.value >threshold_low,
      px2: params.value > threshold_high ,
      px1: params.value > threshold_medium && params.value <threshold_high,
      }), },
  { field: 'run', headerName: 'Run', type: 'number', width: 75, renderHeader: () => ("🏃") },
  { field: 'ride', headerName: 'Ride', type: 'number', width: 75 , renderHeader: () => ( "🚴" ) },
  { field: 'walk', headerName: 'Walk', type: 'number', width: 75 , renderHeader: () => ( "🚶") },
  { field: 'swim', headerName: 'Swim', type: 'number', width: 75 , renderHeader: () => ( "🏊") },
  { field: 'others', headerName: 'Others', type: 'number', width: 75 , renderHeader: () => ( "🤸") },
] ;


const useStyles  = {
  root: {
    '& .athlete-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .athlete-app.nx2': {
      backgroundColor: '#ffa0a0',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .athlete-app.nx1': {
      backgroundColor: '#ffe030',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .athlete-app.px1': {
      backgroundColor: '#d0ffd0',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .athlete-app.px2': {
      backgroundColor: '#a0ffa0',
      color: '#1a3e72',
      fontWeight: '600',
    },
  },
};

class WeeklySummary extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            weeknumber : 1,
            num_goal_reached : 0,
            total_members : 0,
            ws : [],
            tabledata: []
        };
    }

    componentDidMount() {
		    this.fetchData();
	  }
    shouldComponentUpdate(nextProps, nextState) {
  		if (nextProps.weeknumber !== this.props.weeknumber) {
            this.state.tabledata =  processResponse(this.state.ws, nextProps.weeknumber);
            this.state.num_goal_reached = countGoalReached(this.state.ws, nextProps.weeknumber);

      }
      return true;
    }

    /*
  	componentDidUpdate(prevProps) {
  		// compare with previous props
      //console.log("inside did update ");
  		if (prevProps.weeknumber !== this.props.weeknumber) {
          //console.log("week num is different");
            this.state.tabledata =  processResponse(this.state.ws, this.props.weeknumber);
  			//this.fetchData();
  		}
  	}
    */

    fetchData() {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // request succesful
                    var response = xhr.responseText,
                        json = JSON.parse(response);
                        var newjson=processResponse (json, this.props.weeknumber);
                        var goalreached = countGoalReached(json, this.props.weeknumber);
                  this.setState({
                    isLoaded: true,
                    ws : json,
                    tabledata: newjson,
                    total_members : json.length,
                    num_goal_reached : goalreached
                   });
                } else {
                    // error
                  this.setState({
                    isLoaded: true,
                    error: xhr.responseText
                  });
                }
            }
          });

      var bb_api_url= "https://api.everymovecounts.dk/athlete/summary"
      xhr.open("GET", bb_api_url, true );
      xhr.send();
    }

      render() {
        var body="";
        if (!this.state.isLoaded) {
          body = <div style={{display:'block'}}><CircularProgress /></div>;
        } else if (this.state.error) {
            // error
          body = <div>Error occured: { this.state.error }</div>
        } else {
           const { classes } = this.props;
            body= <div style={{ height:1500, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ flexGrow: 1 }} className={classes.root}>
                    {this.state.num_goal_reached} out of {this.state.total_members} members have reached their goal this week
                  <DataGrid
                    rows={this.state.tabledata}
                    columns={columns}
                    disableColumnMenu
                    autoHeight
                    density="compact"
                    disableColumnMenu
                    sortModel={[
                        {
                          field: 'total',
                          sort: 'desc',
                        },
                      ]}

                     />
                </div>
                </div></div>
              ;
        }
        return body ;
      }
}

function countGoalReached(apidata,weeknumber)
{
    var count = 0;
    for (var i=0; i<apidata.length; i++){
        var sum = (apidata[i].WeeklySummary[weeknumber-1]).Summary;
        if (sum.Total >= 100 )
            count++;
    }
    return count;
}

function processResponse(apidata, weeknumber) {
  var tablerows = [] ;
  for (var i=0; i<apidata.length; i++){
    var tabledata = {} ;
    var isum=apidata[i];
    //console.log("Weeknumber is "+weeknumber);
    var sum = (isum.WeeklySummary[weeknumber-1]).Summary;
    tabledata.run=sum.Run;
    tabledata.ride=sum.Ride;
    tabledata.walk=sum.Walk;
    tabledata.swim=sum.Swim;
    tabledata.others=sum.Others;
    tabledata.total=sum.Total;
    tabledata.picture=isum.picture;
    tabledata.name=isum.name;
    tabledata.id=isum.id;
    // console.log("isum is", isum);
    tablerows[i] = tabledata ;
  }
//console.log("after");
  //console.log(tablerows);
  return tablerows;
}

export default withStyles(useStyles)(WeeklySummary);
