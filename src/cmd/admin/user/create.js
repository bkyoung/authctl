const { newAdminClient } = require('../../../lib/admin');

exports.command = 'create';
exports.desc = 'create new User'
exports.builder = (yargs) => {
  yargs.showVersion((v) => version = v);
  return yargs
  .options({
    'email': {
      alias: ['e', 'primary-email'],
      describe: 'organization email address',
      required: true
    }
  })
  .options({
    'first-name': {
      alias: ['f', 'given-name'],
      describe: "User's first name",
      required: true
    }
  })
  .options({
    'last-name': {
      alias: ['l', 'family-name'],
      describe: "User's last name",
      required: true
    }
  });
}

exports.handler = async function (argv) {
  const { primaryEmail, givenName, familyName } = argv
  const client = await newAdminClient()
  const data = await client.createUser(primaryEmail, givenName, familyName)
  console.log(JSON.stringify(data, null, 2))
}
