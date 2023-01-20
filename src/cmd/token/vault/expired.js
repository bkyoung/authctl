const { expired } = require('../../../lib/vault')

exports.command = 'expired'

exports.describe = 'check if vault token has expired'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  try {
    console.log(expired().toString());
  } catch (error) {
    console.log(error);
  }
}
