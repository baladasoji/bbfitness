import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { field: 'Date', headerName: 'Duration', width: 200 },
  { field: 'Title', headerName: 'Title', width: 90 },
  { field: 'Type', headerName: 'Type', width: 100 },
  { field: 'Duration', headerName: 'Duration', width: 200 },
  { field: 'Distance', headerName: 'Duration', width: 200 },
  { field: 'Week', headerName: 'Duration', width: 200 }
] ;

class Activities extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            activities : [],
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
                    console.log("JSON is", json);
                  this.setState({
                    isLoaded: true,
                    activities : json,
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

      var bb_api_url= "https://09zopybgw3.execute-api.eu-west-1.amazonaws.com/prod/athlete/activities"
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

          body = <div style={{display:'block'}}><CircularProgress /></div>;
           // body= <div style={{width:'100%', height:400 , margin:10  }}> ;
          //  {this.state.activities.map(function (value) { return <DataGrid rows={act.activities} columns={columns} pageSize={20}/>; })}
          //  }
          //  );
//            body = body + </div>;
        }
        console.log("Body is ", body);
        return body ;
      }
}

export default Activities;
