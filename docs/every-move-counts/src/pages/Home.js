import React from 'react';
import Typography from "@material-ui/core/Typography";

function HomePage() {
    return (

        <div>

        <h2><span>Vision</span></h2><p><span>Our Vision is to motivate members to maintain an active and healthy lifestyle and encourage everyone to exercise through periodic challenges.</span></p><h2 ><span >Challenges</span></h2><p ><span>For 2021, we plan to have 2 challenges - Each spanning 12 weeks.</span></p><p ><span ></span></p><ul ><li ><span >The spring challenge runs from March 29th (week 13) to June 20th (week 24)</span></li><li ><span >The summer challenge runs from August 2nd (week 31) to October 24th (week 42)</span></li></ul><p ><span ></span></p><p ><span >All members are encouraged to take part in the challenge by being active and working out in these weeks (and throughout the year if possible) The activity data from Strava is used as the source of truth for the challenges, The data for each group member is aggregated and shown on the website in the form of points per each week. The goal is to have at least 100 active points per week.</span></p><h2 ><span >Point calculation</span></h2><p ><span>The points are calculated as follows for more details and list of full activities see </span><span ><a >Detailed point calculation</a></span><span >:</span></p><p ><span ></span></p><p ><span >Swimming - Gives 5 points for every 100m. </span></p><p ><span >Running - Gives 5 points for every km. </span></p><p ><span >Walking - Gives 3 points for every km. </span></p><p ><span >Cycling/Skating - Gives 2 points for every km. </span></p><p ><span >Any other activity - Gives 15 points for 1 hour of activity.</span></p><p ><span ></span></p><p ><span >You can stay green throughout the challenge by </span></p><p ><span >a) Running 20km in a week</span></p><p ><span >OR</span></p><p ><span >b) Walking 33.3 km in a week</span></p><p ><span >OR</span></p><p ><span >c) Biking 50 km in a week</span></p><p ><span >OR</span></p><p ><span >d) Swimming 2000 m in a week</span></p><p ><span >OR </span></p><p ><span >Combination of any of the above - Lets say 10km run and 25km of biking in a week OR doing yoga for 7 hours in a week.</span></p><p ><span >!!!! THIS IS NOT A COMPETITION - There are no disqualification or removal from challenges if you fail to stay green.. You are still encouraged to continue in the challenge and continue your activities for the rest of the challenge.</span></p><p ><span ></span></p><h2><span >Strava permissions and Privacy</span></h2><p ><span>In order to participate in the challenges, You need to give permission for the website https://everymovecounts.dk to read your strava profile and activities. This is done through a one time consent. By clicking on the &quot;Link Strava profile&quot; on the website. Once the consent is provided, The website will aggregate your activity data from Strava and present it on the dashboards. Your activity data is retained for a maximum period of 1 year - After which it is deleted. If at any point of time, you wish to revoke this permission, you can do this by visiting the Strava profile and revoking the consent granted. https://www.strava.com/settings/apps -&gt; Every Move Counts -&gt; Revoke Access </span><span >The information presented on the website is public at the moment and does not require any login credentials to view the data on the dashboards etc</span><span >. </span></p>

<p ><span ></span></p><h2 ><span >Detailed point calculation</span></h2>

<table ><thead><tr><th>Activity</th><th>Points</th><th>Measure</th></tr></thead>
<tbody>
<tr><td><ul><li>Swim</li></ul></td><td>5</td><td>100 meters</td></tr>
<tr><td><ul><li>Run</li></ul></td><td>5</td><td>1 km</td></tr>
<tr><td><ul><li>Walk</li></ul></td><td>3</td><td>1 km</td></tr>
<tr><td><ul><li>Ride</li><li>EBikeRide</li><li>InlineSkate</li><li>RollerSki</li><li>AlpineSki</li><li>BackcountrySki</li><li>IceSkate</li><li>Skateboard</li></ul></td><td>2</td><td>1 km</td></tr>
<tr><td><ul><li>RockClimbing</li><li>Canoeing</li><li>Crossfit</li><li>Elliptical</li><li>Handcycle</li><li>Hike</li><li>Kayaking</li><li>Kitesurf</li><li>NordicSki</li><li>Wheelchair</li><li>Windsurf</li><li>Workout</li><li>Yoga</li><li>Rowing</li><li>Sail</li><li>Snowboard</li><li>Snowshoe</li><li>Soccer</li><li>StairStepper</li><li>StandUpPaddling</li><li>Surfing</li><li>Velomobile</li><li>VirtualRide</li><li>VirtualRun</li><li>WeightTraining</li></ul></td><td>15</td><td>1 hour</td></tr>
</tbody>
</table>
    </div>
    );
}

export default HomePage;
