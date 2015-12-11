/**
 * Reaction startup
 *
 * Load app private fixtures
 */

Meteor.startup(function () {
  // 
  // process.env.MAIL_URL = 'smtp://postmaster%40sandbox760999b1f5094de9890542012a73d75c.mailgun.org:d8645e3d700146694c415efc7d03027c@smtp.mailgun.org:587';

  try {
    return Fixtures.loadSettings(Assets.getText("settings/reaction.json"));
  } catch (error) {
    ReactionCore.Log.debug("loadSettings reaction.json not loaded.", error);
  }
});
