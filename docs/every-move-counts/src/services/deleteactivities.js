export function deleteActivities(id,name) {
  return fetch('https://api.everymovecounts.dk/athlete?id='+id, { method: 'DELETE'}) 
    .then(alert("Last 1 week activities deleted for user: "+name + " Please wait until next calendar day for refreshing latest activities"))
}
