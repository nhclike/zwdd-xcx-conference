/* eslint-disable import/no-dynamic-require */
const { basename, join } = require('path');

const GdtTools = require('@ali/gdt-tools-control');

const pkgPath = join(__dirname, './package.json');

const pkg = require(pkgPath);

const gdtTools = new GdtTools(pkg);

const sdk = gdtTools.getSdk();

let appName = '';

try {
  const pwd = process.cwd();
  appName = basename(pwd.split('node_modules')[0]);
} catch (error) {
  console.log(error);
}

sdk.report({
  category: 103,
  msg: pkg.name,
  c1: appName,
  // 应用类型
  c2: 'jsApi',
});
