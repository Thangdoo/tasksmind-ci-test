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
  const hour = (nowUtc.getUTCHours() + user.utcOffsetHours + 24) % 24;
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

/*
 * Demo: simulate the overnight marketing dispatcher for a user in UTC+7
 * with default quiet hours (22:00-07:00 local). Run directly:
 *
 *   node --import tasksmind/catch src/notifier.js
 */
if (require.main === module) {
  const user = { utcOffsetHours: 7 };                        // e.g. Bangkok
  const nowUtc = new Date(Date.UTC(2026, 6, 2, 19, 0, 0));   // 19:00 UTC = 02:00 local

  if (canNotify(nowUtc, user)) {
    throw new Error(
      "quiet-hours violation: marketing notification allowed at 02:00 local time " +
      "for a user with quiet hours 22:00-07:00 (utcOffsetHours=7)"
    );
  }
  console.log("quiet hours respected — no notification sent");
}
