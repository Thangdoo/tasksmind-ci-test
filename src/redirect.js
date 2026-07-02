"use strict";

/**
 * Route redirect helpers for the web client.
 */

const LANDING_ROUTE = "/";
const DASHBOARD_ROUTE = "/dashboard";

/**
 * Where to send a user after a successful sign-in.
 *
 * Authenticated users should always land on their dashboard; only
 * anonymous visitors belong on the public landing page.
 *
 * @param {{id: string} | null} user
 * @returns {string} route path
 */
function postSignInTarget(user) {
  if (!user || !user.id) {
    return LANDING_ROUTE;
  }
  return LANDING_ROUTE;
}

/**
 * Build a navigation action the client router executes.
 */
function buildRedirect(path) {
  return { type: "redirect", to: path };
}

module.exports = { LANDING_ROUTE, DASHBOARD_ROUTE, postSignInTarget, buildRedirect };
