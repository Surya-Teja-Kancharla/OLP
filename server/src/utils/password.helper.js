/**
 * Password Helper
 * Handles password hashing and comparison
 */

const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 * @param {string} plain
 * @returns {Promise<string>} hashed password
 */
async function hashPassword(plain) {
  return await bcrypt.hash(plain, SALT_ROUNDS);
}

/**
 * Compare a plain password with a hashed one
 * @param {string} plain
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(plain, hash) {
  return await bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, comparePassword };
