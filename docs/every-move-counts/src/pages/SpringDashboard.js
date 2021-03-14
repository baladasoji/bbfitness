import React from 'react';
import Typography from "@material-ui/core/Typography";
import Athletes from "./Athletes";

function SpringDashboard() {
    return (
        <div className="MuiGrid-container" id="testid"> 
        <Typography variant={"h6"} noWrap>
            Spring Leaderboard - 2021
        </Typography>
        <Athletes/>
        </div>
    );
}
export default SpringDashboard;
