export function signupUser(eventid,id) {
  return fetch('https://09zopybgw3.execute-api.eu-west-1.amazonaws.com/test/events/signup?id='+id+'&eventid='+eventid) 
    .then(data => data.json())
}


