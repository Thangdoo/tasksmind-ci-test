"use strict";

const { postSignInTarget, buildRedirect } = require("./redirect");

/**
 * Session management: sign-in and the follow-up navigation.
 */

/**
 * Sign a user in and produce the navigation action to run next.
 * On success the user is taken onward; on failure they stay on the page
 * with no redirect.
 */
function signIn(credentials, userStore) {
  const user = userStore.verify(credentials.email, credentials.password);
  if (!user) {
    return { ok: false, redirect: null };
  }
  return { ok: true, redirect: buildRedirect(postSignInTarget(user)) };
}

module.exports = { signIn };
