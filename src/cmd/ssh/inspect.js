const { inspect } = require('../../lib/ssh');

exports.command = 'inspect'

exports.describe = 'print ssh certificate'

exports.builder = (yargs, helpOrVersionSet) => {}

exports.handler = async function (argv) {
  try {
    console.log(inspect().toString());
  } catch (error) {
    console.log(error);
  }
}
