import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import { useL01InfoStyles } from '@mui-treasury/styles/info/d01';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { getEvents } from '../services/events';
import { getMembers } from '../services/members';
import { signupUser } from '../services/signup';
import { signoutUser } from '../services/signout';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '1rem',
    transition: '0.3s',
  },
  card: {
    position: 'relative',
    borderRadius: '1rem',
    boxShadow: '0 6px 20px 0 #dbdbe8',
    backgroundColor: '#fff',
    height: '100%',
    '& > *' : { margin: theme.spacing(0,0.5), },
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem',
  },
  avatar: {
    fontFamily: 'Ubuntu',
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  userdisp: {
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    '& > *': {
      textTransform: 'none !important',
      margin: theme.spacing(0,5),
    },
  },
}));



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function EMCEvent() {
  const [event, setEvent] = useState([]);
  const [members, setMembers] = useState([]);  
  const [signup, setSignup] = useState(false);
  const [signout, setSignout] = useState(false);

  useEffect(() => {
    let mounted = true;
    getEvents()
      .then(items => {
        if(mounted) {
          setEvent(items)
        }
      })
    getMembers()
        .then ( members => {
        if(mounted) {
          setMembers(members)
        }
      })
    return () => mounted = false;
  }, [])

 
  const handleClick = (eventid,id, func) => {
    if (func === 'add') {
        signupUser(eventid,id);
        setSignup(true);
    }
    else if (func === 'delete') {
        signoutUser(eventid,id);
        setSignout(true);
    }
    setTimeout(() => {
      getEvents().then(items => { setEvent(items); setSignup(false) ; setSignout(false); })
    }, 4000)
    
  };

const EMCEventCard = ({ thumbnail, eventId, eventTitle, eventCreator, eventDate, eventStartTime, eventMap, eventLocation, eventType, description, participants, members }) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  //console.log("participants", participants);
  var yesUsers = [];
  var noUsers = [] ;
  members.map((mem) =>  {
                        (participants.indexOf(mem.id.toString()) === -1) ? noUsers.push(mem) : yesUsers.push(mem)  ;
                        } ) ;
  //console.log("No Users" , noUsers);
  //console.log("Yes Users" , yesUsers);
  noUsers.sort((a, b) => a.firstname.localeCompare(b.firstname));
  yesUsers.sort((a, b) => a.firstname.localeCompare(b.firstname));
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={1}>
          <Avatar>🚴 </Avatar>
          <Info position={'middle'} useStyles={useApexInfoStyles}>
            <InfoTitle>{eventTitle}</InfoTitle>
            <InfoSubtitle>Organizer : {eventCreator}</InfoSubtitle>
            <InfoSubtitle>{eventDate} {eventStartTime}</InfoSubtitle>
            <InfoSubtitle>StartLocation: {eventLocation}</InfoSubtitle>
            <InfoSubtitle> <Link href={eventMap} target="_blank"> Link to Route </Link></InfoSubtitle>
          </Info>
        </Row>
        <Box pb={1} px={2} color={'grey.600'} fontSize={'0.875rem'} fontFamily={'Ubuntu'} >
          {description}
        </Box>
        <Box pb={1} px={2} color={'grey.600'} fontSize={'0.875rem'} fontFamily={'Ubuntu'} className={styles.userdisp} >
          <Divider/>
            <InfoSubtitle>Going</InfoSubtitle>
          { yesUsers.map((user) =>  
                    (
                         <Chip
                            avatar={<Avatar src={user.profile_medium} />}
                            label={user.firstname + " " + user.lastname}
                            color="primary"
                            clickable
                            onClick={() => handleClick(eventId,user.id.toString() , "delete")}
                            variant="outlined"
                          />
                       )) 
            }
            <Divider/>
            <InfoSubtitle>Not Going</InfoSubtitle>
            { noUsers.map((user) =>  
                    (
                         <Chip
                            avatar={<Avatar src={user.profile_medium} />}
                            label={user.firstname + " " + user.lastname}
                            color="secondary"
                            size="small"
                            clickable
                            onClick={() => handleClick(eventId,user.id.toString() , "add")}
                            variant="outlined"
                          />
                      )) 
            }
        </Box>
      </Column>
      <Snackbar open={signup} autoHideDuration={6000} >
        <Alert severity="success">
          You have successfully signed up for the event. Please wait few seconds to refresh
        </Alert>
      </Snackbar>
      <Snackbar open={signout} autoHideDuration={6000} >
        <Alert severity="warning">
          You have signed out of the event. Please wait few seconds to refresh
        </Alert>
      </Snackbar>
    </div>
  );
};

  return(
      <Grid container spacing={1}>
       {event.map(item =>
        <Grid item xs={12} md={10} lg={4} spacing={1}>
                             <EMCEventCard 
                            eventId={item.id} 
                            eventTitle={item.eventTitle} 
                            eventCreator = {item.eventOrganizer}
                            eventDate = {item.eventDate} 
                            eventLocation = {item.startLocation}
                            eventMap = {item.eventMap}
                            eventStartTime = {item.eventStartTime}
                            eventType = {item.type }
                            members = {members}
                            participants = {item.participants}
                            description={ <b> {item.eventDescription}</b> }
                            />
        </Grid>
        )}
      </Grid>
  )





}

export default EMCEvent;
