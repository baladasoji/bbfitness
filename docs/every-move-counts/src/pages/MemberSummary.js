import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { field: 'profile_medium', headerName: 'Photo', width: 90, renderCell: (params: GridCellParams) => ( <img src={params.value} width="60" height="50" alt="?" />) },
  { field: 'firstname', headerName: 'FirstName', width: 200 },
  { field: 'lastname', headerName: 'LastName', width: 200 },
  { field: 'id', headerName: 'Activities', width: 200 , renderCell: (params: GridCellParams) => ( <a href={"/activities?id=" + params.value}> Activities </a>)}
] ;


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
            body= <div style={{width:'100%', height:800 , margin:10  }}>
                  <DataGrid
                    rows={this.state.members}
                    columns={columns}
                    pageSize={20}
                    />
                </div>
              ;
        }
        return body ;
      }
}

export default MemberSummary;
