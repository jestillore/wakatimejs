import { expect } from 'chai'

import { WakaTime } from './WakaTime'
import { describe, it } from 'mocha'

describe('WakaTime', () => {
  it('should return API key after being initialized', () => {
    const API_KEY = 'abcde'
    const instance = new WakaTime(API_KEY)
    expect(instance.apiKey).to.equal(API_KEY)
  })
  it('should return API key after manually setting it', () => {
    const API_KEY = 'abcde'
    const instance = new WakaTime()
    instance.apiKey = API_KEY
    expect(instance.apiKey).to.equal(API_KEY)
  })
  it('should return an promise error when calling API methods', (done) => {
    const API_KEY = 'abcde'
    const instance = new WakaTime(API_KEY)
    const result = instance.stats()
    result
      .catch(() => {
        /*
        Getting unauthorized because no valid API key
        But at least it's a promise that worked!
         */
        done()
      })
  })
})