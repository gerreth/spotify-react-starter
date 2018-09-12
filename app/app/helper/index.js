export function formatDate(date) {
  const newDate = date.split('-')
  return [newDate[2],newDate[1],newDate[0]].join('.')
}

export function sortByDate(a,b) {
  if (a.date.start < b.date.start)
    return -1;
  if (a.date.start > b.date.start)
    return 1;
  return 0;
}

export function getHashParams() {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g
  let q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams
}
