import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Athlete from './Athlete';
import Strava_Logo from '../static/images/strava_symbol_orange.png'

const columns = [
  { field: 'Date', headerName: 'Date', width: 120 },
  { field: 'Week', headerName: 'Week#', width: 100 },
  { field: 'Title', headerName: 'Title', width: 150 },
  { field: 'Type', headerName: 'Type', width: 90 },
  { field: 'Duration', headerName: 'Duration', width: 120 },
  { field: 'Distance', headerName: 'Distance', width: 120 },
  { field: 'Points', headerName: 'Points', width: 100 },
  { field: 'id', headerName: 'StravaLink', width: 200 , renderCell: (params: GridCellParams) => ( <a href={"https://www.strava.com/activities/" + params.value} target="_blank"> <img alt="stravalink" width="25" height="25" src={Strava_Logo}/> </a>)}
] ;

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

class Activities extends React.Component {
    constructor(props) {
        super(props);
        let chosenid = getURLParameter("id");
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            activities : [],
            id: chosenid
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
      var bb_api_url = '';
        if (this.state.id != null )
             bb_api_url= "https://api.everymovecounts.dk/athlete/activities?id="+this.state.id ;
        else
             bb_api_url= "https://api.everymovecounts.dk/athlete/activities" ;

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

//          body = <div style={{display:'block'}}><CircularProgress /></div>;
            body= <div style={{width:'100%', height:800 , margin:10  }}>
              {this.state.activities.map(function (act) 
                    { return <> <Athlete data={act}/>
                             <DataGrid rows={act.activities} columns={columns} rowHeight="20" disableColumnMenu pageSize={20}
                             sortModel={[
                                {
                                  field: 'Date',
                                  sort: 'desc',
                                },
                              ]}
                              />
                          </>
                    }
                )} 
                </div> 
        }
        console.log("Body is ", body);
        return body ;
      }
}

export default Activities;
