const fs = require('fs');
const yargs = require('yargs');
const {
  configure,
  saveConfiguration
} = require('../../lib/config');
const { config: sshConfig } = require('../../lib/ssh')

const { CONFIG_FILE } = configure();
exports.command = 'init'

exports.describe = 'initialize configuration'

exports.builder = (yargs, helpOrVersionSet) => {
  let version;
  yargs.showVersion((v) => version = v);
  return yargs
  .options({
    'email': {
      alias: 'e',
      describe: 'Organization email address',
      required: true
    }
  })
  .options({
    'force': {
      alias: 'f',
      describe: 'overwrite existing configuration with default settings'
    }
  })
  .options({
    'github-username': {
      alias: 'g',
      describe: 'Github username',
      required: true
    }
  })
  .options({
    'ssh-config': {
      alias: 's',
      describe: 'configure ~/.ssh/config (use --no-ssh-config to skip)',
      default: true
    }
  })
  .options({
    'authctl_version': {
      hidden: true,
      default: version,
    }
  });
}

exports.handler = async function (argv) {
  if (fs.existsSync(CONFIG_FILE) && !argv.force) {
    console.log(`${CONFIG_FILE} already exists, skipping`)
    console.log('To overwrite use -f/--force')
    yargs.showHelp('log').argv
    process.exit(1)
  }
  const config = configure();
  config.GITHUB_USERNAME = argv['github-username'];
  config.ORG_EMAIL = argv.email;
  config['AUTHCTL_VERSION'] = argv.authctl_version;
  saveConfiguration(config);
  
  if (argv['ssh-config']) sshConfig();
}
