const { expired, inspect } = require('../../../lib/access')

exports.command = 'expired'

exports.describe = 'check if cloudflare access token has expired'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  try {
    const e = expired();
    const { payload } = inspect();
    const { exp } = payload;
    console.log(`Expired:      ${e.toString().toUpperCase()}\nDate ${e ? 'expired' : 'expires'}: ${new Date(exp * 1000).toLocaleString()}`);
  } catch (error) {
    console.log(error);
  }
}
