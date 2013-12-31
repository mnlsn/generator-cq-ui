'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');


var CqUiGenerator = module.exports = function CqUiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

};

util.inherits(CqUiGenerator, yeoman.generators.Base);

CqUiGenerator.prototype.prompts = function prompts() {
  var cb = this.async();

  // have Yeoman greet the user.
  this.citytechGrunt =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + chalk.red('--(o)--') + '|   .------------------------------.' +
  '\n   `---------´  |          ' + chalk.yellow.bold('Yo CITYTECH') + ',        |' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |      ' + chalk.yellow.bold('let\'s set-up grunt!') + '     |' +
  '\n    /___A___\\   \'______________________________\'' +
  '\n     ' + chalk.yellow('|  ~  |') +
  '\n   __' + chalk.yellow('\'.___.\'') + '__' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  // have Yeoman greet the user.
  console.log(this.citytechGrunt);

  var prompts = [
    {
      type: 'confirm',
      name: 'cqDefaults',
      message: 'Would you like to change your environment defaults? (ex: localhost, ports, AEM credentials)',
      default: false
    },
    {
      when: function(response) {
        return response.cqDefaults;
      },
      name: 'cqHost',
      message: 'What is the hostname of your local instance? (ex: localhost)',
      default: 'localhost'
    },
    {
      when: function(response) {
        return response.cqDefaults;
      },
      name: 'cqAuthor',
      message: 'What is your local AEM author port? (ex: 4502)'
    },
    {
      when: function(response) {
        return response.cqDefaults;
      },
      name: 'cqPublish',
      message: 'What is your local AEM publish port? (ex: 4503)'
    },
    {
      when: function(response) {
        return response.cqDefaults;
      },
      name: 'cqLoginName',
      message: 'What is your local AEM username? (ex: admin)'
    },
    {
      when: function(response) {
        return response.cqDefaults;
      },
      type: 'password',
      name: 'cqLoginPW',
      message: 'What is your local AEM password? (ex: sshhhh, it\'s a secret)'
    },
    {
      name: 'cqProject',
      message: 'What is the local path to your projects UI folder? (ex: Users/mnlsn/projects/project/project-ui/)'
    },
    {
      type: 'confirm',
      name: 'cqStart',
      message: 'Would you like to use grunt to start/stop AEM?',
      default: false
    },
    {
      when: function(response) {
        return response.cqStart;
      },
      name: 'cqRoot',
      message: 'What is the local path to your AEM JAR files? (ex: Users/mnlsn/projects/cq56/)'
    },
    {
      type: 'confirm',
      name: 'cqMaven',
      message: 'Would you like to use grunt to initiate your Maven builds?',
      default: false
    },
    {
      when: function(response) {
        return response.cqStart;
      },
      name: 'mvnAuthor',
      message: 'What is the Maven command to use for author? (ex: mvn clean install local-author)'
    },
    {
      when: function(response) {
        return response.cqStart;
      },
      name: 'mvnPublish',
      message: 'What is the Maven command to use for author? (ex: mvn clean install local-publish)'
    }
  ];

  this.prompt(prompts, function (props) {
    var trailingSlash = /(^\/+|\/+$)/mg;
    this.cqHost = props.cqHost || 'localhost';
    this.cqAuthor = props.cqAuthor || '4502';
    this.cqPublish = props.cqPublish || '4503';
    this.cqLoginName = props.cqLoginName || 'admin';
    this.cqLoginPW = props.cqLoginPW || 'admin';
    this.cqProject = props.cqProject ? props.cqProject.replace(trailingSlash, "") + '/' : '';
    this.cqRoot = props.cqRoot ? props.cqRoot.replace(trailingSlash, "") + '/' : '';
    this.mvnAuthor = props.mvnAuthor || 'mvn clean install';
    this.mvnPublish = props.mvnPublish || 'mvn clean install';

    cb();
  }.bind(this));
};

CqUiGenerator.prototype.grunt = function grunt() {
  this.template('_package.json', 'package.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};
