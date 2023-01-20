const fs = require('fs');
const os = require('os');
const path = require('path');
const { compareVersions } = require('compare-versions');
const { getAllFiles, getAppVersion, mkdir, readFile, writeFile } = require('../utils');

const keyPair = (dir) => {
  const allFiles = getAllFiles(dir);
  const pubKeys = allFiles.filter(file => file.endsWith('.pub')).filter(file => !file.includes('-cert'));
  if (pubKeys.length > 0) {
    const publicKey = pubKeys[0]
    const pka = publicKey.split(path.sep)
    const privateKeyName = [...pka].reverse()[0].split('.')[0]
    const privKey = [...pka].slice(0, pka.length - 1)
    privKey.push(privateKeyName)
    const privateKey = privKey.join(path.sep)
    return {
      SSH_CERTIFICATE: `${privateKey}-cert.pub`,
      SSH_PRIVATE_KEY: privateKey,
      SSH_PUB_KEY: publicKey,
    };
  }
  throw Error('no ssh keys found in', dir)
}

const APPDIR = '.authctl'
const HOMEDIR = os.homedir();
const ACCESS_TOKEN = path.join(HOMEDIR, APPDIR, 'cf-access-token');
const ADMIN_API_ENDPOINT = '';
const CONFIG_DIR = path.join(HOMEDIR, APPDIR);
const CONFIG_FILE = path.join(HOMEDIR, APPDIR, 'authctl.json');
const CLOUDFLARE_RELEASES_URL = 'https://github.com/cloudflare/cloudflared/releases';
const GIT_HOST = 'github.com';
const GITHUB_USERNAME = '';
const ORG_EMAIL = '';
const SIGNING_KEY = path.join(HOMEDIR, APPDIR, 'signing-ca.key');
const SSH_CONFIG = path.join(HOMEDIR, '.ssh', 'config');
const SSH_DIR = path.join(HOMEDIR, '.ssh');
const { SSH_CERTIFICATE, SSH_PRIVATE_KEY, SSH_PUB_KEY } = keyPair(SSH_DIR);
const VAULT_ADDR = '';
const VAULT_ACCESS_HEADER = path.join(HOMEDIR, APPDIR, 'vault-access-header');
const VAULT_RELEASES_URL = 'https://developer.hashicorp.com/vault/downloads';
const VAULT_TOKEN = path.join(HOMEDIR, '.vault-token');

const defaultConfig = {
  ACCESS_TOKEN,
  ADMIN_API_ENDPOINT,
  CONFIG_DIR,
  CONFIG_FILE,
  CLOUDFLARE_RELEASES_URL,
  GIT_HOST,
  GITHUB_USERNAME,
  ORG_EMAIL,
  SIGNING_KEY,
  SSH_CERTIFICATE,
  SSH_CONFIG,
  SSH_DIR,
  SSH_PRIVATE_KEY,
  SSH_PUB_KEY,
  VAULT_ADDR,
  VAULT_ACCESS_HEADER,
  VAULT_RELEASES_URL,
  VAULT_TOKEN
}

const mergeConfig = (config, newConfig) => {
  Object.keys(newConfig).forEach(option => config[option] = newConfig[option]);
};

const configure = ({ ...options } = {}) => {
  const config = JSON.parse(JSON.stringify((defaultConfig)));
  if (fs.existsSync(config.CONFIG_FILE)) {
    const data = JSON.parse(readFile(config.CONFIG_FILE));
    mergeConfig(config, data);
  }
  mergeConfig(config, options);
  return config;
};

const saveConfiguration = (config = defaultConfig) => {
  mkdir(config.CONFIG_DIR);
  writeFile(config.CONFIG_FILE, JSON.stringify(config));
  return `SUCCESS: wrote ${config.CONFIG_FILE}`;
};

const getConfigVersion = () => {
  const { AUTHCTL_VERSION } = configure();
  return AUTHCTL_VERSION;
};

const newerVersionAvailable = (app = '', cfg = '', yargs = {}) => {
  if (!app && Object.keys(yargs).length === 0) return false
  const appVersion = app || getAppVersion(yargs);
  const configVersion = cfg || getConfigVersion();
  if (compareVersions(appVersion, configVersion) <= 0) return false;
  return true;
}

module.exports = {
  configure,
  newerVersionAvailable,
  saveConfiguration
};