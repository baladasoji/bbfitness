import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const columns = [
  { field: 'profile_medium', headerName: 'Pic', width: 60, renderCell: (params: GridCellParams) => ( <img src={params.value} width="40" height="30" style={{borderRadius:"40%"}} alt="?" />) },
  { field: 'fullName', headerName: 'Name',  valueGetter: getFullName, width: 175 },
  { field: 'id', headerName: 'Activities', width: 75 , renderCell: (params: GridCellParams) => ( <a href={"/activities?id=" + params.value}> <DirectionsRunIcon/> </a>)}
] ;

function getFullName(params: ValueGetterParams) {
  return `${params.getValue('firstname') || ''} ${
    params.getValue('lastname') || ''
  }`;
}

class MemberSummary extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            members : [],
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
                  this.setState({
                    isLoaded: true,
                    members : json,
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

      var bb_api_url= "https://api.everymovecounts.dk/athletes"
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
            body= 
                <div style={{ height: 1800, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ flexGrow: 1 }} >
                  <DataGrid
                    rows={this.state.members}
                    autoHeight
                    density="compact"
                    disableColumnMenu
                    sortModel={[
                    {
                      field: 'fullName',
                      sort: 'asc',
                    },
                    ]}
                   columns={columns}
                    />
                </div>
                </div>
                </div>
              ;
        }
        return body ;
      }
}

export default MemberSummary;
