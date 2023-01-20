const { inspect } = require('../../../lib/access')
const { localeTime } = require('../../../lib/utils');

exports.command = 'inspect'

exports.describe = 'print cloudflare access token info'

exports.builder = (yargs, helpOrVersionSet) => {}

const convertToUnixTime = (t = '') => parseInt(t) * 1000;

exports.handler = async function (argv) {
  try {
    const token = inspect();
    const issued = localeTime(convertToUnixTime(token.payload.iat));
    const expire = localeTime(convertToUnixTime(token.payload.exp));
    console.log(token);
    console.log('ISSUED: ', issued);
    console.log('EXPIRES:', expire);
  } catch (error) {
    console.log(error)
  }
}
