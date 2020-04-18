const utils = require('../src/utilities')
const MockDate = require('mockdate')
const moment = require('moment')

MockDate.set(moment.utc('1969-04-20T11:00:00.000Z'), 420)

describe('Timestamp Method', () => {
  beforeEach(() => {
    delete process.env.UTC
    delete process.env.FORMAT
  })

  test('default, no env variables set', () => {
    const time = utils.timestamp()
    expect(time).toBe('1969-04-20T11:00:00.000Z')
  })

  test('UTC false', () => {
    process.env.UTC = 'false'
    const time = utils.timestamp()
    expect(time).toBe('1969-04-20T04:00:00.000')
  })

  test('Formatted', () => {
    process.env.FORMAT = 'hh:mm'
    const time = utils.timestamp()
    expect(time).toBe('11:00')
  })

  test('Formatted and UTC false', () => {
    process.env.FORMAT = 'hh:mm'
    process.env.UTC = 'false'
    const time = utils.timestamp()
    expect(time).toBe('04:00')
  })
})
