'use strict';
const inquirer = require('inquirer');

var questions = [
    {
      type: 'input',
      name: 'username',
      message: 'Please enter your Facebook username (email address):'
    },
    {
      type: 'password',
      message: 'Please enter your Facebook password:',
      name: 'password',
      mask: '*'
    },
];

async function prompt() {
  return inquirer.prompt(questions)
    .then(answers => {
      return answers;
    });
}

module.exports = prompt;
