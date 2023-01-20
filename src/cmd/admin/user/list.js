const { newAdminClient } = require('../../../lib/admin');

exports.command = 'list';
exports.desc = 'retrieve User info for all users'
exports.builder = (yargs) => {}
exports.handler = async function (argv) {
  const client = await newAdminClient()
  const data = await client.listUsers()
  console.log(JSON.stringify(data, null, 2))
}
