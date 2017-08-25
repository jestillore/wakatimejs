import { expect } from 'chai'

import './index'
import { describe, it } from 'mocha'

describe('Date.prototype', () => {
  it('should return a custom date format', () => {
    const d = new Date('2017-02-03')
    expect(d.wakaTimeDateString()).to.equal('2017-02-03')
  })
})