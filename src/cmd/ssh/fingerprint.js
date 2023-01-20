const { fingerprint } = require('../../lib/ssh');

exports.command = 'fingerprint'

exports.describe = 'print fingerprint of ssh key or certificate'

exports.builder = (yargs, helpOrVersionSet) => {
  return yargs
  .options({
    'cert': {
      alias: 'c',
      default: true,
      desc: 'display certificate fingerprint'
    },
    'key': {
      alias: 'k',
      default: true,
      desc: 'display pub key fingerprint'
    }
  })
}

exports.handler = async function ({ key, cert }) {
  if (cert) console.log('CERT: ', fingerprint('cert').toString().trim());
  if (key) console.log('KEY:  ', fingerprint('key').toString().trim());
}
