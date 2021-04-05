import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Athlete from './Athlete';
import Strava_Logo from '../static/images/strava_symbol_orange.png'
import { deleteActivities } from '../services/deleteactivities';

const columns = [
  { field: 'Date', headerName: 'Date', width: 120 },
  { field: 'Week', headerName: 'Wk#', width: 60 },
  { field: 'Title', headerName: 'Title', width: 150 },
  { field: 'Type', headerName: 'Type', width: 90 },
  { field: 'Duration', headerName: 'hh:mm', width: 80 , valueGetter: convertMinutesToTime},
  { field: 'Distance', headerName: 'km', width: 80},
  { field: 'Points', headerName: 'Points', width: 80 },
  { field: 'id', headerName: 'StravaLink', width: 200 , renderCell: (params: GridCellParams) => ( <a href={"https://www.strava.com/activities/" + params.value} target="_blank"> <img alt="stravalink" width="25" height="25" src={Strava_Logo}/> </a>)}
] ;

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function convertMinutesToTime(params: ValueGetterParams) {
  var t=params.value;
  t=Math.floor(t);
  var hours = Math.floor(t/60);
  var mins = Math.floor(t%60);
  var paddedmins = mins.toString().padStart(2,0);
  return ` ${hours}:${paddedmins}`;
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
            body= <div style={{width:'100%', height:1400 , margin:10  }}>
              {this.state.activities.map(function (act) 
                    { return <> <Athlete data={act}/> <p/>
                                <Button variant="contained" color="secondary" onClick={() => deleteActivities(act.id, act.name)} >
                                 Delete Last 1 week Activities
                                </Button><p/>
                        <div style={{ display: 'flex', height: '100%' }}>
                          <div style={{ flexGrow: 1 }} >
                             <DataGrid rows={act.activities} columns={columns} pageSize={30}
                            autoHeight
                            density="compact"
                            disableColumnMenu
                             sortModel={[
                                {
                                  field: 'Date',
                                  sort: 'desc',
                                },
                              ]}
                              />
                            </div>
                            </div>
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
