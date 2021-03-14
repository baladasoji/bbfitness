import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'picture', headerName: 'Photo', width: 90, renderCell: (params: GridCellParams) => ( <img src={params.value} width="70" height="50" alt="Logo" />) },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'totalpoints', headerName: 'Points', width: 130 }
] ;

class Athletes extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            athletes: [],
        };
      }

    
    componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate(prevProps) {
		// compare with previous props
		if (prevProps.weeknumber !== this.props.weeknumber) {
            this.state.isLoaded=false;
            this.state.athletes=[]
			this.fetchData();
//            this.render();
		}
	}
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
                    athletes: json
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

      var bb_api_url= "https://09zopybgw3.execute-api.eu-west-1.amazonaws.com/prod/"
      if (typeof(this.props.weeknumber) == "undefined")
          xhr.open("GET", bb_api_url + '/athlete/activities' , true );
      else
          xhr.open("GET", bb_api_url + '/athlete/activities?week='+this.props.weeknumber , true );
      xhr.send();
      }
      
      render() {
        var body="";
        console.log("Re rendering");
        if (!this.state.isLoaded) {
            console.log("Loading... ");
          body = <div>Loading...</div>;
        } else if (this.state.error) {
            // error
          body = <div>Error occured: { this.state.error }</div>
        } else {

            body= <div style={{width:600, height:600 , width: '100%' }}>
                  <DataGrid 
                    rows={this.state.athletes}
                    columns={columns} 
                    pageSize={10}
                    sortModel={[
                        {
                          field: 'totalpoints',
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
export default Athletes;
