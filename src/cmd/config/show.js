const {
  configure
} = require('../../lib/config');

exports.command = 'show'

exports.describe = 'print configuration'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  const configuration = configure();
  console.log({ ...configuration });
}
