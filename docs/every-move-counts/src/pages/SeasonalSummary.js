import React from 'react';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {GetWeekNumber} from "./Common"

var cur_week_num = GetWeekNumber(new Date());
var num_weeks_elapsed = 1;
var threshold_low = 50;
var threshold_medium = 100;
var threshold_high = 200;
var threshold_low_season = 50*num_weeks_elapsed;
var threshold_medium_season = 100*num_weeks_elapsed;
var threshold_high_season = 200*num_weeks_elapsed;
const columns = [
  { field: 'picture', headerName: 'Photo', width: 60, renderHeader: () => ("📸"), renderCell: (params: GridCellParams) => ( <img src={params.value} width="40" height="30" style={{borderRadius:'40%'}} alt="?" />) },
  { field: 'name', headerName: 'Name', width: 175 },
  { field: 'week1', headerName: 'W1', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >=threshold_low, px2: params.value >= threshold_high , px1: params.value >= threshold_medium && params.value <threshold_high, }), },
  { field: 'week2', headerName: 'W2', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week3', headerName: 'W3', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week4', headerName: 'W4', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week5', headerName: 'W5', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week6', headerName: 'W6', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week7', headerName: 'W7', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week8', headerName: 'W8', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week9', headerName: 'W9', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week10', headerName: 'W10', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week11', headerName: 'W11', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week12', headerName: 'W12', type: 'number', width: 60 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'seasontotal', headerName: 'Total', type: 'number', width: 100 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low_season, nx1: params.value < threshold_medium_season && params.value >=threshold_low_season, px2: params.value >= threshold_high_season , px1: params.value >= threshold_medium_season && params.value <threshold_high_season, }), },
] ;


const useStyles  = {
  root: {
    '& .athlete-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .athlete-app.nx2': {
      backgroundColor: '#ffc0c0',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .athlete-app.nx1': {
      backgroundColor: '#ffff50',
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

class SeasonalSummary extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            ws : [],
            tabledata: []
        };
    }

    componentDidMount() {
            num_weeks_elapsed = cur_week_num - this.props.start_week_num ;
            if (num_weeks_elapsed <= 0) {
                num_weeks_elapsed=1;
            }
            threshold_low_season = 50*num_weeks_elapsed;
            threshold_medium_season = 100*num_weeks_elapsed;
            threshold_high_season = 200*num_weeks_elapsed;
		    this.fetchData();
	  }
    /*
  	componentDidUpdate(prevProps) {
  		// compare with previous props
      console.log("inside did update ");
  		if (prevProps.weeknumber !== this.props.weeknumber) {
          console.log("week num is different");
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
                        var newjson=processResponse (json, this.props.start_week_num, this.props.end_week_num);
                  this.setState({
                    isLoaded: true,
                    ws : json,
                    tabledata: newjson
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
        console.log("Re rendering");
        if (!this.state.isLoaded) {
            console.log("Loading... ");
          body = <div style={{display:'block'}}><CircularProgress /></div>;
        } else if (this.state.error) {
            // error
          body = <div>Error occured: { this.state.error }</div>
        } else {
           const { classes } = this.props;
            body= 
                <div style={{ height: 1500, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ flexGrow: 1 }} className={classes.root} >
                  <DataGrid
                    rows={this.state.tabledata}
                    columns={columns}
                    autoHeight
                    disableColumnMenu
                    density="compact"
                    sortModel={[
                        {
                          field: 'seasontotal',
                          sort: 'desc',
                        },
                      ]}
                     />
                </div>
                </div>
                </div>
              ;
        }
        return body ;
      }
}

function processResponse(apidata, start_week_num, end_week_num) {
  var tablerows = [] ;
  console.log("Start and end week num are ",start_week_num, end_week_num);
  for (var i=0; i<apidata.length; i++){
    var tabledata = {week:[]} ;
    var isum=apidata[i];
    var seasontotal = 0
    //console.log("Weeknumber is "+weeknumber);
    for (var j=start_week_num; j<=end_week_num ; j++ ){
      var wsum = isum.WeeklySummary[j-1];
      if (wsum != null) {
        var sum = wsum.Summary ;
        var wn = "week"+(j-start_week_num+1) ;
        tabledata.[wn] = sum.Total ;
        seasontotal+= sum.Total;
      }
    }
    tabledata.picture=isum.picture;
    tabledata.name=isum.name;
    tabledata.id=isum.id;
    tabledata.seasontotal = seasontotal;
    // console.log("isum is", isum);
    tablerows[i] = tabledata ;
  }
console.log("after");
  console.log(tablerows);
  return tablerows;
}

export default withStyles(useStyles)(SeasonalSummary);
