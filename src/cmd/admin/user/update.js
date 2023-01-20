const { newAdminClient } = require('../../../lib/admin');

exports.command = 'update';
exports.desc = 'update User account info'
exports.builder = (yargs) => {
  yargs.showVersion((v) => version = v);
  return yargs
  .options({
    'user-key': {
      alias: ['id', 'key'],
      describe: 'value to search fields for in identifying user',
      required: true
    }
  })
  .options({
    'primary-email': {
      desc: 'primary organization email address associated with user account'
    }  
  })
  .options({
    'email-alias': {
      desc: 'additional email addresses associated with user account (user may have multiple)'
    }  
  })
  .options({
    'ssh-public-key': {
      desc: 'content of a public key file to associate with user account (user may have multiple)'
    }  
  });
}

// can update:
// - primaryEmail
// - emails[]
// - sshPublicKeys[]
// - additionalData{}
exports.handler = async function (argv) {
  const { key } = argv
  const client = await newAdminClient()
  const data = await client.getUser(key)
  console.log(JSON.stringify(data, null, 2))
}
