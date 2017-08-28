export function serialize (obj) {
  return '?' + Object.keys(obj).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(obj[k]))
    return a
  }, []).join('&')
}

export function getDateString (date) {
  if (date instanceof Date) {
    return date.wakaTimeDateString()
  }
  return date
}