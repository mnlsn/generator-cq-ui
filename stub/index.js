'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var StubGenerator = module.exports = function StubGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(StubGenerator, yeoman.generators.Base);

StubGenerator.prototype.prompts = function prompts() {
  var cb = this.async();

  this.citytechStub =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + chalk.red('--(o)--') + '|   .------------------------------.' +
  '\n   `---------´  |          ' + chalk.yellow.bold('Yo CITYTECH') + ',        |' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('stub your components toe!') + '  |' +
  '\n    /___A___\\   \'______________________________\'' +
  '\n     ' + chalk.yellow('|  ~  |') +
  '\n   __' + chalk.yellow('\'.___.\'') + '__' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  // have Yeoman greet the user.
  console.log(this.citytechStub);

  var prompts = [
    {
      name: 'componentName',
      message: 'What is the name of the component?'
    },
    {
      name: 'componentGroup',
      message: 'What is the component group?'
    },
    {
      type: 'confirm',
      name: 'includeClientLibs',
      message: 'Would you like to stub out the component\'s clientlibs?',
      default: false
    },
    {
      when: function(response) {
        return response.includeClientLibs;
      },
      name: 'clientLibName',
      message: 'What is the name of the clientlibs you\'d like this component added to?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.componentName = props.componentName;
    this.componentNameSlug = props.componentName.replace(/\s+/g, '').toLowerCase();
    this.componentGroup = props.componentGroup;
    this.includeClientLibs = props.includeClientLibs;
    this.clientLibName = props.clientLibName;

    cb();
  }.bind(this));
};

StubGenerator.prototype.component = function component() {
  if (this.componentGroup === 'hidden') {
    this.componentGroup = '.hidden';
  }

  this.mkdir(this.componentNameSlug);
  this.template('_template.jsp', this.componentNameSlug + '/' + this.componentNameSlug  + '.jsp');
  this.template('_dialog.xml', this.componentNameSlug + '/dialog.xml');
  this.template('_cq_editConfig.xml', this.componentNameSlug + '/_cq_editConfig.xml');
  this.template('_content.xml', this.componentNameSlug + '/.content.xml');
};

StubGenerator.prototype.clientLibs = function clientLibs() {
  if (this.includeClientLibs === true) {
    this.mkdir(this.componentNameSlug + '/clientlibs');
    this.mkdir(this.componentNameSlug + '/clientlibs/js');
    this.mkdir(this.componentNameSlug + '/clientlibs/css');
    this.template('clientlibs/_content.xml', this.componentNameSlug + '/clientlibs/.content.xml')
    this.template('clientlibs/_css.txt', this.componentNameSlug + '/clientlibs/css.txt');
    this.template('clientlibs/_js.txt', this.componentNameSlug + '/clientlibs/js.txt');
    this.template('clientlibs/css/_style.css', this.componentNameSlug + '/clientlibs/css/' + this.componentNameSlug + '.css');
    this.template('clientlibs/js/_scripts.js', this.componentNameSlug + '/clientlibs/js/' + this.componentNameSlug + '.js');
  }
};
