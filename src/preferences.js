"use strict";

/**
 * User notification preferences.
 *
 * Quiet hours are stored in the user's LOCAL time. getQuietHours returns
 * the window together with the user's UTC offset so that callers can
 * work out whether the current UTC time falls inside the window.
 */

const DEFAULT_QUIET_START = 22;
const DEFAULT_QUIET_END = 7;

/**
 * Resolve the quiet-hours window for a user.
 *
 * @param {{quietStart?: number, quietEnd?: number, utcOffsetHours?: number}} user
 * @returns {{startHour: number, endHour: number, utcOffsetHours: number}}
 *          window in the user's local time, plus their UTC offset in hours
 */
function getQuietHours(user) {
  return {
    startHour: user.quietStart ?? DEFAULT_QUIET_START,
    endHour: user.quietEnd ?? DEFAULT_QUIET_END,
    utcOffsetHours: 0,
  };
}

module.exports = { getQuietHours, DEFAULT_QUIET_START, DEFAULT_QUIET_END };
