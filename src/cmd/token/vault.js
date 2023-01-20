exports.command = 'vault <command>'
exports.describe = 'create and manage vault tokens'
exports.builder = (yargs) => yargs.commandDir('vault')
exports.handler = async function (argv) {}
