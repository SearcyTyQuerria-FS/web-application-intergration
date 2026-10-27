// Requirements
// Obscure a credit card number except the last 4 digits
// Card must be 12 to 16 characters long
// Any other length returns "Invalid Credit Card"
// input:  123456789012
// output: ********9012

const obscure = require('./obscure')

describe('Obscure credit card test', () => {
  describe('Positive tests', () => {
    test('As a user I want a 12 digit card to show only the last 4 digits', () => {
      expect(obscure('123456789012')).toEqual('********9012')
    })

    test('As a user I want a 14 digit card to show only the last 4 digits', () => {
      expect(obscure('12345678901234')).toEqual('**********1234')
    })

    test('As a user I want a 16 digit card to show only the last 4 digits', () => {
      expect(obscure('1234567890123456')).toEqual('************3456')
    })

    test('As a user I want to get a string back', () => {
      expect(typeof obscure('123456789012')).toBe('string')
    })
  })

  describe('Negative tests', () => {
    test('As a user I want an 11 digit card to be invalid', () => {
      expect(obscure('12345678901')).toEqual('Invalid Credit Card')
    })

    test('As a user I want a 17 digit card to be invalid', () => {
      expect(obscure('12345678901234567')).toEqual('Invalid Credit Card')
    })

    test('As a user I want an empty string to be invalid', () => {
      expect(obscure('')).toEqual('Invalid Credit Card')
    })

    test('As a user I want an 11 digit card to not show any digits', () => {
      expect(obscure('12345678901')).not.toContain('8901')
    })
  })
})
