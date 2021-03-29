import React from 'react';
import {Button} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';

function Athlete(v) {
    return (
        <div>
        <h2> Activities for {v.data.name} </h2>
        <Avatar src={v.data.picture} style={{width:'80px', height:'80px'}} alt="athletepic"/> 
        </div>
    );
}

export default Athlete;
