import btoa from 'btoa'
import * as axios from 'axios'
import { getDateString, serialize } from './helpers'
import { BASE_URL } from './constants'

export class WakaTime {

  constructor (apiKey) {
    this.apiKey = apiKey
  }

  getApiOptions (path, query) {
    const qs = query ? serialize(query) : ''
    return {
      url: BASE_URL + path + qs,
      headers: {
        'Authorization': 'Basic ' + btoa(this.apiKey)
      }
    }
  }

  async currentUser () {
//     console.log(this.getApiOptions('/users/current'))
    const {url, headers} = this.getApiOptions('/users/current')
//     console.log(url, headers)
    return (await axios.get(url, {headers})).data
  }

  async stats (stat = 'last_7_days') {
    const validRanges = [
      'last_7_days',
      'last_30_days',
      'last_6_months',
      'last_year',
      'all_time',
    ]
    if (!validRanges.includes(stat)) {
      return new Error('Invalid stat parameter')
    }
    const {url, headers} = this.getApiOptions('/users/current/stats/' + stat)
    return (await axios.get(url, {headers})).data

  }

  async summaries (object) {
    let start = ''
    let end = ''

    if (typeof object === 'object' && !(object instanceof Date)) {
      start = getDateString(object.start)
      end = getDateString(object.end)
    } else {
      start = getDateString(object)
      end = getDateString(object)
    }

    const {url, headers} = this.getApiOptions('/users/current/summaries', {
      start: start,
      end: end
    })

    return (await axios.get(url, {headers})).data
  }

  async durations (date) {
    const {url, headers} = this.getApiOptions('/users/current/durations', {
      date: getDateString(date)
    })
    return (await axios.get(url, {headers})).data
  }
}
