export * from './WakaTime'

Date.prototype.wakaTimeDateString = function () {
  const yyyy = this.getFullYear().toString()
  const mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
  const dd = this.getDate().toString()
  return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]) // padding
}