#!/usr/bin/env node
import program from 'commander'
const version = require('../../package.json').version
program
  .version(version)
  .command('start', 'start with zante')
  .command('init', 'init with defalut config')
  .parse(process.argv)
