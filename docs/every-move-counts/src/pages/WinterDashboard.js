import React from 'react';
import Typography from "@material-ui/core/Typography";
import SeasonalSummary from "./SeasonalSummary"

function WinterDashboard() {
    return (
        <div className="MuiGrid-container">
        <Typography variant={"h6"} noWrap>
            Winter challenge Leaderboard - 2021 (Week 1 to Week 10)
        </Typography>
        <SeasonalSummary start_week_num={1} end_week_num={12}/>
        </div>
    );
}
export default WinterDashboard;
