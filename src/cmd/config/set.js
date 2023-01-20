const {
  configure,
  saveConfiguration
} = require('../../lib/config');

exports.command = 'set'

exports.describe = 'update configuration settings'

exports.builder = (yargs, helpOrVersionSet) => {
  return yargs
  .positional(
    'key', {
      type: 'string',
      describe: 'configuration setting to be changed'
    }
  )
  .positional(
    'value', {
      type: 'string',
      describe: 'new value for configuration setting'
    }
  )
}

exports.handler = async function (argv) {
  const [cmd, sub, key, value] = argv._
  if (!key || !value) {
    console.log(`\nSupply both setting and value as separate arguments:\n\n    ${argv.$0} ${cmd} ${sub} <setting> <value>\n`);
    process.exit(1);
  }
  const updatedCfg = configure({ [key]: value });
  console.log(saveConfiguration(updatedCfg));
}
