exports.command = 'ssh <command>'
exports.desc = 'create and manage ssh certificates'
exports.builder = (yargs) => yargs.commandDir('config')
exports.handler = function (argv) {}