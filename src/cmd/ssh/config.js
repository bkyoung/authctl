const { config: sshConfig } = require('../../lib/ssh');

exports.command = 'config'

exports.describe = 'configure ssh client to use certificates'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  sshConfig();
}
