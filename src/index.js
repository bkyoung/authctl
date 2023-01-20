#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
  .commandDir('cmd')
  .env('AUTHCTL')
  .help()
  .alias('help', 'h')
  .showHelpOnFail(true)
  .version()
  .demandCommand(1)
  .wrap(100)
  .parse()