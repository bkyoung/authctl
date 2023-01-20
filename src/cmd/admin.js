exports.command = 'admin <command>'
exports.desc = 'administrative tasks'
exports.builder = (yargs) => yargs.commandDir('admin')
exports.handler = function (argv) {}