const { configure } = require('../../../lib/config');
const { login } = require('../../../lib/vault')

const { ORG_EMAIL } = configure();

exports.command = 'login'

exports.describe = 'login to vault (to obtain a token for ssh key signing)'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  login()
}
