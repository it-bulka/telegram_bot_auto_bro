// should be without http\https for parsing url
const SITE_URL_TEXT = "www.che168.com"
const SITE_URL = "https://www.che168.com/"
const SITE_URL_TO_CHECK = "che168.com"

/**
 * @typedef {import('./types.js').User} User
 */

/**
 * @type {Object<string, User>}
 */
const users = {}

module.exports = {
  SITE_URL,
  SITE_URL_TEXT,
  SITE_URL_TO_CHECK,
  users
}