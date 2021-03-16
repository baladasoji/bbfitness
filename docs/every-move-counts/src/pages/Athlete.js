import React from 'react';
import {Button} from "@material-ui/core";

function Athlete(v) {
    return (
        <>
        <h2> Activities for {v.data.name} </h2>
        <div>
            <img src={v.data.picture} alt="athletepic"/> 
        </div>
        </>
    );
}

export default Athlete;
