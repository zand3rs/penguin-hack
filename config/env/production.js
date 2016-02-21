/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  host: "penguin.koding.io",
  port: 8080,
  google: {
    key: "688356610593-vt2h2a3lsd0g7beh4fdboq1nuhrr1ipi.apps.googleusercontent.com",
    secret: "D8zYy2ddORfgBYf6w2ahH-xM",
    callbackUrl: "http://uzks21d24582.zand3rs.koding.io:8080/authorize"
  }

};
