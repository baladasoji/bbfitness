import React from 'react';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const columns = [
  { field: 'picture', headerName: 'Photo', width: 90, renderCell: (params: GridCellParams) => ( <img src={params.value} width="60" height="50" alt="?" />) },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'totalpoints', headerName: 'Points', type: 'number', width: 130 , cellClassName: (params) =>
      clsx('athlete-app', {
      nx2: params.value < 50,
      nx1: params.value < 100 && params.value >50,
      px2: params.value > 200 ,
      px1: params.value > 100 && params.value <200 ,
      }), },
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

class Athletes extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoaded: false,
            error: null,
            athletes: [],
            period: 'weekly'
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

      var bb_api_url= "https://api.everymovecounts.dk/"
      if (typeof(this.props.weeknumber) == "undefined") {
            this.setState({
              period: 'yearly'
            });
          xhr.open("GET", bb_api_url + '/athlete/activities' , true );
      }
      else{
            this.setState({
              period: 'weekly'
            });
            xhr.open("GET", bb_api_url + '/athlete/activities?week='+this.props.weeknumber , true );
      }
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
            body= <div style={{width:600, height:600 , width: '100%' }} className={classes.root}>
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

export default withStyles(useStyles)(Athletes);
