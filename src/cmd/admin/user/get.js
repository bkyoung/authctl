const { newAdminClient } = require('../../../lib/admin');

exports.command = 'get';
exports.desc = 'retrieve User info'
exports.builder = (yargs) => {
  yargs.showVersion((v) => version = v);
  return yargs
  .options({
    'user-key': {
      alias: ['id', 'primary-email', 'key'],
      describe: 'value to search fields for in identifying user',
      required: true
    }
  });
}

exports.handler = async function (argv) {
  const { key } = argv
  const client = await newAdminClient()
  const data = await client.getUser(key)
  console.log(JSON.stringify(data, null, 2))
}
