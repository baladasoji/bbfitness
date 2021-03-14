import React from 'react';
import Typography from "@material-ui/core/Typography";
import Athletes from "./Athletes";

function AnnualDashboard() {
    return (
        <div className="MuiGrid-container" id="testid"> 
        <Typography variant={"h6"} noWrap>
            Annual Leaderboard - 2021
        </Typography>
        <Athletes/>
        </div>
    );
}

export default AnnualDashboard;
