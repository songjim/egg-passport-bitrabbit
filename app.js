// app.js
const assert = require('assert');
const Strategy = require("passport-bitrabbit-oauth2").Strategy;

module.exports = app => {
  const config = app.config.passportBitrabbit;
  // must set passReqToCallback to true
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-twitter] config.passportTwitter.key required');
  assert(config.secret, '[egg-passport-twitter] config.passportTwitter.secret required');
  // convert to consumerKey and consumerSecret
  config.clientID = config.key;
  config.clientSecret = config.secret;

  app.passport.use('bitrabbit', new Strategy(config, (req, accessToken, refreshToken, profile, done) => {
    // format user
    const user = {
      provider: 'bitrabbit',
      id: profile.id,
      email: profile.email,
      phoneNumber: profile.phoneNumber || '',
      disabled: profile.disabled,
      apiDisabled: profile.apiDisabled,
      language: profile.language,
      code: profile.code,
      nickName: profile.nickName,
      accessToken,
      refreshToken,
      profile,
    };
    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  })
  );
};