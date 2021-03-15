import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

//let urlElements = window.location.href.split('/settings');
//var registerurl =urlElements[0]+'register';
//console.log("Registration URL is",registerurl);
var registerurl = 'http://beta.everymovecounts.dk/register'
var redirurl = 'https://www.strava.com/oauth/authorize?client_id=52553&redirect_uri=' + registerurl + '&response_type=code&approval_type=auto&scope=read,activity:read' ;

function SettingsPage() {
    return (
        <div>
        <Typography variant={"h6"} noWrap>
            This is the Settings Page
        </Typography>
        <Button variant="contained" color="primary" href={redirurl}> Link strava account </Button>
        </div>
    );
}

export default SettingsPage;
