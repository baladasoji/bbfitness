import React from 'react';
import Typography from "@material-ui/core/Typography";
import Athletes from "./Athletes";


class WeeklyDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeekNumber: getWeekNumber(new Date()) 
        };
      }

    onChange(weekNumber) {
        console.log("Week number changed" + weekNumber);
		this.setState({currentWeekNumber: weekNumber});
//        this.render();
	}

    render() {
        return (
            <div className="MuiGrid-container" id="testid"> 
            <Typography variant={"h6"} noWrap>
                Weeky Leaderboard for week # : <WeekNumberSelector 
                        onChange={(val) => this.onChange(val)}
                        currentWeekNumber={this.state.currentWeekNumber}
                    />
            </Typography>
            <Athletes weeknumber={this.state.currentWeekNumber}/>
            </div>
        );
    }



}

function WeekNumberSelector(props) {
    var weeknums=[] ;
    var N = getWeekNumber(new Date());
    for (var i = 1; i <= N; i++) {
      weeknums.push(i);
    }
    console.log(weeknums);
	var options = weeknums.map((i) => {
		return (
			<option
				value={i} 
				key={i}
			>{i}</option>
		);

	});

	return (
		<div>
			<select 
				value={props.currentWeekNumber}
				onChange={(e) => props.onChange(e.target.value)}
			>
				{ options }
			</select>
		</div>
	)
}
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

export default WeeklyDashboard;
