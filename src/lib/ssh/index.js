const { execSync } = require('child_process');
const fs = require('fs');
const { configure } = require('../config');
const { appendToFile, getAllFiles, lineExists, writeFile } = require('../utils');
const {
  GIT_HOST,
  SSH_CERTIFICATE,
  SSH_CONFIG,
  SSH_PRIVATE_KEY,
  SSH_PUB_KEY,
  KSSH_VERSION
} = configure();

const parseValid = (cert = '') => cert.match(/Valid:.*/);

const config = () => {
  const configStanza = `# autogenerated by kssh ${KSSH_VERSION}
Host ${GIT_HOST}
  IdentityFile ${SSH_PRIVATE_KEY}
  IdentitiesOnly true
`;
  if (!fs.existsSync(SSH_CONFIG)) {
    writeFile(SSH_CONFIG, configStanza);
  } else if (!lineExists('autogenerated by kssh', SSH_CONFIG)) {
    appendToFile(SSH_CONFIG, configStanza);
  }
};

const expired = () => {
  const cert = inspect().toString();
  if (!cert) return true;
  const payload = parseValid(cert)[0];
  const expiration = payload.split(' ').reverse()[0];
  const now = Date.now();
  const ex = new Date(new Date(expiration));
  return now > ex;
};

const fingerprint = (file = '') => execSync(`ssh-keygen -l -f ${file === 'key' ? SSH_PUB_KEY : SSH_CERTIFICATE}`);

const inspect = () => {
  console.log('checking for ', SSH_CERTIFICATE)
  if (!fs.existsSync(SSH_CERTIFICATE)) {
    console.log('not found:', SSH_CERTIFICATE)
    return '';
  }
  return execSync(`ssh-keygen -Lf ${SSH_CERTIFICATE}`);
}

module.exports = {
  config,
  expired,
  fingerprint,
  inspect
}