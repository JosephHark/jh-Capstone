/**
 * A sleep function you can use anywhere.
 *
 * @module sleep-anywhere
 * @example
 * import sleep from 'sleep-anywhere'
 *
 * const result = await sleep(5000, 'later')
 * console.log('5s', result)
 * // 5s later
 */

/**
 * Returns a promise which fulfils after `ms` milliseconds with the supplied `returnValue`.
 * @param {number} ms - How long in milliseconds to sleep for.
 * @param {*} [returnValue] - The value to return.
 * @returns {Promise}
 * @alias module:sleep-anywhere
 */
function sleep (ms, returnValue) {
  return new Promise(resolve => setTimeout(() => resolve(returnValue), ms))
}

export default sleep
