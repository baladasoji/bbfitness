import React from 'react';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {GetWeekNumber} from "./Common"

var cur_week_num = GetWeekNumber(new Date());
var threshold_low = 50;
var threshold_medium = 100;
var threshold_high = 200;
const columns = [
  { field: 'picture', headerName: 'Photo', width: 90, renderCell: (params: GridCellParams) => ( <img src={params.value} width="60" height="50" alt="?" />) },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'week1', headerName: 'W:1', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week2', headerName: 'W:2', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week3', headerName: 'W:3', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week4', headerName: 'W:4', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week5', headerName: 'W:5', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week6', headerName: 'W:6', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week7', headerName: 'W:7', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week8', headerName: 'W:8', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week9', headerName: 'W:9', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week10', headerName: 'W:10', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week11', headerName: 'W:11', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'week12', headerName: 'W:12', type: 'number', width: 70 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
  { field: 'seasontotal', headerName: 'Total', type: 'number', width: 100 , cellClassName: (params) => clsx('athlete-app', { nx2: params.value < threshold_low, nx1: params.value < threshold_medium && params.value >threshold_low, px2: params.value > threshold_high , px1: params.value > threshold_medium && params.value <threshold_high, }), },
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
            body= <div style={{width:'100%', height:400 , margin:10  }} className={classes.root}>
                  <DataGrid
                    rows={this.state.tabledata}
                    columns={columns}
                    pageSize={10}
                    disableColumnMenu
                    sortModel={[
                        {
                          field: 'seasontotal',
                          sort: 'desc',
                        },
                      ]}
                     />
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
