import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import WeeklySummary from "./WeeklySummary";
import {GetWeekNumber} from "./Common"

class WeeklyDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeekNumber: GetWeekNumber(new Date())
        };
      }

    onChange(weekNumber) {
    //    console.log("Week number changed" + weekNumber);
		this.setState({currentWeekNumber: weekNumber});
//        this.render();
	}

    render() {
        return (
            <div className="MuiGrid-container">
            <Typography variant={"h6"}>
                <WeekNumberSelector
                        onChange={(val) => this.onChange(val)}
                        currentWeekNumber={this.state.currentWeekNumber}
                    />
            </Typography>
            <div className="MuiGrid-container">
            <Typography variant={"h6"}>
                Weekly Leaderboard : # {this.state.currentWeekNumber}
            </Typography>
            </div>
            <WeeklySummary weeknumber={this.state.currentWeekNumber}/>
            </div>
        );
    }



}

function WeekNumberSelector(props) {
    var weeknums=[] ;
    var N = GetWeekNumber(new Date());
    for (var i = 1; i <= N; i++) {
      weeknums.push(i);
    }
    //console.log(weeknums);
	var options = weeknums.map((i) => {return ( 
			<Button size="small" id={i} onClick={() => props.onChange(i) }> {i} </Button> 
		);

	});

	/*return (
		<div>
			<select
				value={props.currentWeekNumber}
				onChange={(e) => props.onChange(e.target.value)}
			>
				{ options }
			</select>
		</div>
	)*/

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      {options}
    </ButtonGroup>
  )

}

export default WeeklyDashboard;
