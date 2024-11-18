/**
 * @typedef {'До 3 років' | 'Від 3 до 5 років' | 'Від 5 років'} AutoAge
 */

/**
 * @typedef {Object} AutoData
 * @property {number} [cost]
 * @property {AutoAge} [age]
 * @property {number} [engine]
 */

/**
 * @typedef {Object} User
 * @property {boolean} [manual_mode]
 * @property {0|1|2|3} [step]
 * @property {AutoData} [autoData]
 * @property {number[]} [msgsToDelete]
 */

