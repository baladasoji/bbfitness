import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ConnectWithStrava from "../static/images/btn_strava_connectwith_light.png";
import IconButton from '@material-ui/core/IconButton';

//let urlElements = window.location.href.split('/settings');
//var registerurl =urlElements[0]+'register';
//console.log("Registration URL is",registerurl);
var registerurl = 'http://www.everymovecounts.dk/register'
var redirurl = 'https://www.strava.com/oauth/authorize?client_id=52553&redirect_uri=' + registerurl + '&response_type=code&approval_type=auto&scope=read,activity:read' ;

function SettingsPage() {
    return (
        <div style={{ height: 600, width: '100%' }}>
        <Typography variant={"h6"} noWrap>
            This is the Settings Page
        </Typography>
        <IconButton variant="contained" color="primary" href={redirurl}>
          <img src={ConnectWithStrava} alt="Logo" />
        </IconButton>
        </div>
    );
}

export default SettingsPage;
