import React from 'react';
import Typography from "@material-ui/core/Typography";
import SeasonalSummary from "./SeasonalSummary";

function SpringDashboard() {
    return (
        <div className="MuiGrid-container" id="testid">
        <Typography variant={"h6"} noWrap>
            Spring Challenge Leaderboard - 2021 (Week 13 to Week 22)
        </Typography>
        <SeasonalSummary start_week_num={13} end_week_num={22}/>
        </div>
    );
}
export default SpringDashboard;
