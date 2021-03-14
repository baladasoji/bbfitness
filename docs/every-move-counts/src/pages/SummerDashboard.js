import React from 'react';
import Typography from "@material-ui/core/Typography";
import SeasonalSummary from "./SeasonalSummary";

function SummerDashboardPage() {
    return (
        <div className="MuiGrid-container" id="testid">
        <Typography variant={"h6"} noWrap>
            Summer Challenge Leaderboard - 2021 (Week 31 to Week 42)
        </Typography>
        <SeasonalSummary start_week_num={31} end_week_num={42}/>
        </div>
    );
}
export default SummerDashboardPage;
