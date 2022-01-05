export function getEvents() {
  return fetch('https://09zopybgw3.execute-api.eu-west-1.amazonaws.com/test/events') 
    .then(data => data.json())
}
