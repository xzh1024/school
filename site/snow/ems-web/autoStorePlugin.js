/* eslint-disable no-undef */
const fs = require('fs');

class AutoImportStorePlugin {
  constructor(option) {
    const { storeDirPath, jsxPath, ignoreFiles = [], defaultImport = [] } = option;
    this.jsxPath = jsxPath || storeDirPath + '/index.jsx';
    if (!storeDirPath) {
      throw new Error('storeDirPath is empty!');
    }
    this.storeDirPath = storeDirPath;
    this.ignoreFiles = ignoreFiles;
    this.defaultImport = defaultImport;
    this.preStoreInstanceStr = '';
    this.preImportStr = '';
  }

  autoImportStore = function(storeDirPath, jsxPath, ignoreFiles = [], defaultImport = []) {
    const storeInstanceArry = [];
    const importArry = ["import * as React from 'react';\n", ...defaultImport];
  
    const getStoreInstance = function(filesPath, instanceArry, requireArry, rootPath) {
      const files = fs.readdirSync(filesPath);
      files.forEach(file => {
        const path = filesPath + '/' + file;
        if (file.endsWith('.js')) {
          const fileName = file.split('.js')[0];
          if (ignoreFiles.includes(fileName)) {
            return;
          }
          const className = fileName[0].toLocaleUpperCase() + fileName.slice(1);
          instanceArry.push('\t' + fileName + ' = ' + 'new ' + className + '();');
          requireArry.push('import ' + className + " from '" + path.replace(rootPath, '.') + "';");
          return;
        }
    
        const stat = fs.lstatSync(path);
        if (stat.isDirectory()) {
          getStoreInstance(path, instanceArry, requireArry, rootPath);
        }
      });
    };
  
    getStoreInstance(storeDirPath, storeInstanceArry, importArry, storeDirPath);
  
    const storeInstanceStr = '\n' + storeInstanceArry.join('\n') + '\n';
    const importStr = importArry.join('\n') + '\n';
    let jsxContent = fs.readFileSync(jsxPath, { encoding: 'utf8', flag: 'r' });
  
    const classStartIndex = jsxContent.indexOf('class Stores {');
    const classEndIndex = jsxContent.indexOf('}');
    jsxContent = importStr + jsxContent.slice(classStartIndex, classStartIndex + 14) + storeInstanceStr + jsxContent.slice(classEndIndex);
    if (this.preStoreInstanceStr !== storeInstanceStr && this.preImportStr !== importStr) {
      fs.writeFileSync(jsxPath, jsxContent, { encoding: 'utf8'});
      this.preStoreInstanceStr = storeInstanceStr;
      this.preImportStr = importStr;
    }
  };

  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('AutoImportStorePlugin', (params, callback) => {
      this.autoImportStore(this.storeDirPath, this.jsxPath, this.ignoreFiles, this.defaultImport);
      callback();
    });
  }
}

module.exports = AutoImportStorePlugin;
