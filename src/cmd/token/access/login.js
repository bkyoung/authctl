const { expired, login } = require('../../../lib/access');

exports.command = 'login'

exports.describe = 'login to cloudflare access'

exports.builder = (yargs, helpOrVersionSet) => {
  return yargs
  .options({
    'force': {
      alias: 'f',
      default: true,
      describe: 'obtain a cloudflare access token even if current one is still valid',
    }
  })
}

exports.handler = async function (argv) {
  try {
    if (argv.force || expired())
    console.log(login().toString())
  } catch (error) {
    console.log(error);
  }
}
