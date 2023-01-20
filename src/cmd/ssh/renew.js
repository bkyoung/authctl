const { configure } = require('../../lib/config');
const { signPubKey } = require('../../lib/vault');

exports.command = 'renew'

exports.describe = 'renew ssh certificate'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  try {
    const { SSH_PUB_KEY } = configure();
    signPubKey(SSH_PUB_KEY);
    console.log(`Succesfully signed ${SSH_PUB_KEY}`);
  } catch (e) {
    console.log('Failed to sign key', e)
  }
}
