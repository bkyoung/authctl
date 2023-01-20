const { inspect: vaultInspect } = require('../../../lib/vault');

exports.command = 'inspect'

exports.describe = 'print vault token info'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  try {
    console.log(JSON.stringify(vaultInspect(), null, 2));
  } catch (error) {
    console.log(error)
  }
}
