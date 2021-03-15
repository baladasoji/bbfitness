import React from 'react';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const columns = [
  { field: 'picture', headerName: 'Photo', width: 90, renderCell: (params: GridCellParams) => ( <img src={params.value} width="60" height="50" alt="?" />) },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'total', headerName: 'Total', type: 'number', width: 120 , cellClassName: (params) =>
      clsx('athlete-app', {
      nx2: params.value < 50,
      nx1: params.value < 100 && params.value >50,
      px2: params.value > 200 ,
      px1: params.value > 100 && params.value <200 ,
      }), },
  { field: 'run', headerName: 'Run', type: 'number', width: 100 },
  { field: 'ride', headerName: 'Ride', type: 'number', width: 100 },
  { field: 'walk', headerName: 'Walk', type: 'number', width: 100 },
  { field: 'swim', headerName: 'Swim', type: 'number', width: 100 },
  { field: 'others', headerName: 'Others', type: 'number', width: 100 },
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
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            weeknumber : 1,
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
      }
      return true;
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
                        var newjson=processResponse (json, this.props.weeknumber);
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

      var bb_api_url= "https://09zopybgw3.execute-api.eu-west-1.amazonaws.com/prod/athlete/summary"
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
                    sortModel={[
                        {
                          field: 'total',
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
console.log("after");
  console.log(tablerows);
  return tablerows;
}

export default withStyles(useStyles)(WeeklySummary);
