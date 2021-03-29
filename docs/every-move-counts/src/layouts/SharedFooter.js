import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import PoweredByStrava from "../static/images/api_logo_pwrdBy_strava_stack_light.png";

const SharedFooter = () => (
    <div style={{ maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="caption" align={'center'}>
            {'Copyright © '}
            <Link
                color="inherit"
                href="http://everymovecounts.dk"
                target="_blank"
                rel="noreferrer">
                EveryMoveCounts
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
        <div>
        <IconButton aria-label="Powered by Strava">
          <img src={PoweredByStrava} alt="Logo" />
        </IconButton>
        </div>
    </div>
);

export default SharedFooter;
