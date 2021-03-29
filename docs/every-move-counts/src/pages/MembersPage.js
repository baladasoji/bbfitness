import React from 'react';
import Typography from "@material-ui/core/Typography";
import MemberSummary from "./MemberSummary";

function MembersPage() {
    return (
        <div className="MuiGrid-container">
        <Typography variant={"h6"} noWrap>
            Members
        </Typography>
        <MemberSummary/>
        </div>
    );
}

export default MembersPage;
