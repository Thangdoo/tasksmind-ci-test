"use strict";

const { getQuietHours } = require("./preferences");

/**
 * Marketing notification dispatch policy.
 *
 * Notifications must never be sent inside a user's quiet hours, evaluated
 * in the user's own timezone.
 */

/**
 * Decide whether a marketing notification may be sent to the user right now.
 *
 * @param {Date} nowUtc  current time (UTC)
 * @param {object} user  user record with preference fields
 * @returns {boolean} true when sending is allowed
 */
function canNotify(nowUtc, user) {
  const quiet = getQuietHours(user);
  const hour = nowUtc.getUTCHours();
  return !isInQuietWindow(hour, quiet.startHour, quiet.endHour);
}

/**
 * Whether an hour falls inside a possibly-overnight window.
 */
function isInQuietWindow(hour, start, end) {
  if (start === end) return false;
  if (start < end) return hour >= start && hour < end;
  return hour >= start || hour < end;
}

module.exports = { canNotify, isInQuietWindow };
