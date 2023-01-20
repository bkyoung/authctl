exports.command = 'config <command>'
exports.desc = 'view and manage app configuration'
exports.builder = (yargs) => yargs.commandDir('config')
exports.handler = function (argv) {}