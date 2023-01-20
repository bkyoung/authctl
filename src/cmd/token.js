exports.command = 'token <command>'
exports.describe = 'create and manage auth tokens'
exports.builder = (yargs) => yargs.commandDir('token')
exports.handler = async function (argv) {}
