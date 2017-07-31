#! /usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
let semver = require('semver');
// let node;

// 初始化变量
let rootPath = './', nodeVersion, nvmrcPath; 

// 自定义nvmrc 路径信息 扩展--path命令
if (argv.path) {
    rootPath = argv.path + '/';
}

nvmrcPath = path.resolve(rootPath + '.nvmrc');

// 读取nvmrc node版本信息
let nvmrcData = fs.readFileSync(nvmrcPath);

// 获取node版本信息
nodeVersion = nvmrcData.toString().replace('\n', '');

if (!nodeVersion || !semver.satisfies(process.version, nodeVersion)) {
    console.log(`Required node version is ${nodeVersion}, but current version is ${process.version}, please use command 'nvm use'`);
    process.exit(1);
}

