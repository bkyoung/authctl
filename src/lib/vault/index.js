const { execSync } = require('child_process');
const fs = require('fs');
const open = require('open');
const { configure } = require('../config');
const { readFile } = require('../utils');

const {
  GITHUB_USERNAME,
  ORG_EMAIL,
  SSH_CERTIFICATE,
  SSH_PUB_KEY,
  VAULT_ACCESS_HEADER,
  VAULT_ADDR,
  VAULT_RELEASES_URL,
  VAULT_TOKEN
} = configure();

const expired = (token = VAULT_TOKEN) => {
  if (!fs.existsSync(token)) return true;
  const { data } = inspect(token);
  if (!data) return true;
  const expireTime = new Date(data.expire_time);
  const now = Date.now();
  return now > expireTime;
};

// inspect will attempt to connect to vault once/sec,
// failing after 10 attempts if still unsuccessful.
// this is necessary to deal with occasional 502 errors
const inspect = () => {
  const h = readFile(VAULT_ACCESS_HEADER).toString().trim();
  if (!h) return {};
  try {
    const res = execSync(`vault token lookup -header=${h} -format=json`, { env: { ...process.env, VAULT_ADDR } });
    return JSON.parse(res)
  } catch (e) {
    console.log('Try again')
  }
}

const install = async () => await open(VAULT_RELEASES_URL);

const login = () => {
  const h = readFile(VAULT_ACCESS_HEADER).toString().trim();
  execSync(`vault login -method=oidc -path=google -header=${h} username=${ORG_EMAIL}`, { env: { ...process.env, VAULT_ADDR } });
};

const signPubKey = () => {
  const h = readFile(VAULT_ACCESS_HEADER).toString().trim();
  const p = readFile(SSH_PUB_KEY).toString().trim();
  execSync(`vault write > ${SSH_CERTIFICATE} -header=${h} \
  -field=signed_key ssh-client-signer/sign/github -<<EOH
{
  "public_key": "${p}",
  "extensions": {
    "login@github.com": "${GITHUB_USERNAME}"
  }
}
EOH
`, { env: { ...process.env, VAULT_ADDR } });
}

module.exports = {
  expired,
  inspect,
  install,
  login,
  signPubKey
}