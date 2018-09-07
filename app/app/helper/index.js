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
