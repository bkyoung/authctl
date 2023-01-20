exports.command = 'access <command>'
exports.describe = 'create and manage cloudflare access tokens'
exports.builder = (yargs) => yargs.commandDir('access')
exports.handler = async function (argv) {}
