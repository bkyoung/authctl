const fs = require('fs');
const path = require('path');

const appendToFile = (absoluteFilePath = '', data = '') => {
  fs.appendFileSync(absoluteFilePath, data)
};

const getAllFiles = (dirPath, filesList = []) => {
  if (!dirPath) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      filesList = (getAllFiles(path.join(dirPath, file), filesList));
    } else {
      filesList.push(path.join(dirPath, file));
    }
  });

  return filesList;
};

const getAppVersion = (yargs) => {
  let appVersion;
  yargs.showVersion((v) => appVersion = v);
  return appVersion;
};

const lineExists = (str = '', file = '') => {
  const contents = fs.readFileSync(file);
  return contents.includes(str);
};

const localeTime = (dateString = '') => new Date(dateString).toLocaleString();

const mkdir = (dir = '') => fs.existsSync(dir) ? '' : fs.mkdirSync(dir, true);

const readFile = (absoluteFilePath = '') => {
  if (absoluteFilePath && fs.existsSync(absoluteFilePath)) {
    return fs.readFileSync(absoluteFilePath);
  }
  return ''
};

const writeFile = (absoluteFilePath = '', data = '') => {
  const dir = path.dirname(absoluteFilePath);
  mkdir(dir)
  fs.writeFileSync(absoluteFilePath, data)
};

module.exports = {
  appendToFile,
  getAllFiles,
  getAppVersion,
  lineExists,
  localeTime,
  mkdir,
  readFile,
  writeFile
}