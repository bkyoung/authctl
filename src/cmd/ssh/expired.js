const { expired } = require('../../lib/ssh')

exports.command = 'expired'

exports.describe = 'check if ssh certificate has expired'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  try {
    console.log(expired().toString());
  } catch (error) {
    console.log(error);
  }
}
