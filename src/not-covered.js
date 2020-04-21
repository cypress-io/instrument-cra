// this file is NOT included in the application's code
// thus Cypress tests do NOT cover it
export const reverse = (s) => s.split('').reverse().join('')

function add(a, b) {
  console.log('adding %d to %d', a, b)
  return a + b
}
