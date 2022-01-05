export function getMembers() {
  return fetch('https://api.everymovecounts.dk/athletes') 
    .then(data => data.json())
}
