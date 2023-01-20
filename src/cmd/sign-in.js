const cf = require('../lib/access');
const ssh = require('../lib/ssh');
const vault = require('../lib/vault');

exports.command = 'sign-in'

exports.describe = 'daily sign-in (obtain tokens and ssh cert for the day)'

exports.builder = (yargs) => {
  return yargs
  .options({
    'force': {
      alias: 'f',
      describe: 'renew ssh cert even if current cert has not expired'
    }
  })
}

exports.handler = async function (argv) {
  if (cf.expired()) {
    cf.login();
    console.log('Acquired cloudflare token');
  }
  if (vault.expired()) {
    vault.login();
    console.log('Acquired vault token');
  }
  if (ssh.expired() || argv.force) {
    vault.signPubKey();
    console.log('Acquired ssh certificate');
  }
}
