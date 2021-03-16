import React from 'react';
import Typography from "@material-ui/core/Typography";
import Activities from "./Activities";

function ActivitiesPage() {
    return (
        <div className="MuiGrid-container" id="testid">
        <Typography variant={"h6"} noWrap>
            Activities
        </Typography>
        <Activities/>
        </div>
    );
}

export default ActivitiesPage;
