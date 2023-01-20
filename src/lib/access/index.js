const fs = require('fs');
const { execSync } = require('child_process');
const { createDecoder } = require("fast-jwt");
const open = require('open');
const { configure } = require('../config');
const { readFile, writeFile } = require('../utils');

const {
  ACCESS_TOKEN,
  CLOUDFLARE_RELEASES_URL,
  VAULT_ACCESS_HEADER,
  VAULT_ADDR
} = configure();

const expired = (token = ACCESS_TOKEN) => {
  if (!fs.existsSync(ACCESS_TOKEN)) return true;
  const { payload } = inspect(token);
  const now = Date.now();
  return now > parseInt(payload.exp) * 1000;
};

const inspect = (token = '') => {
  const decodeComplete = createDecoder({ complete: true });
  if (!token) return decodeComplete(readFile(ACCESS_TOKEN));
  const sections = decodeComplete(token);
  return sections;
}

const install = async () => await open(CLOUDFLARE_RELEASES_URL);

const login = (app = VAULT_ADDR) => {
  execSync(`cloudflared access login ${app}`);
  const token = execSync(`cloudflared access token -app=${app}`);
  const header = `cf-access-token=${token}`
  writeFile(ACCESS_TOKEN, token);
  writeFile(VAULT_ACCESS_HEADER, header);
};

const readAppToken = (app = VAULT_ADDR) => {
  let token
  try {
    token = execSync(`cloudflared access token -app=${app}`).toString().trim()
  } catch (e) {
    throw e
  }
  if (expired(token)) {
    login(app);
    token = execSync(`cloudflared access token -app=${app}`).toString().trim();
  }
  return token
}

module.exports = {
  expired,
  inspect,
  install,
  login,
  readAppToken
}