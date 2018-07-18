const eno = require('enojs');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const html = require('./templates/html.js');

const generateScheme = filepath => {
  const name = path.basename(filepath, '.eno');
  const input = fs.readFileSync(filepath, 'utf-8');
  const document = eno.parse(input);

  const colors = {};
  for(let colorField of document.dictionary('colors').entries()) {
    colors[colorField.name] = colorField.color();
  }

  const colorReference = ({ name, value }) => {
    if(!colors.hasOwnProperty(value))
      throw `Undefined color ${value} assigned to ${name}`;

    return colors[value];
  };

  let css = '';

  const backgroundColor = document.field('background', colorReference, { required: true });
  const foregroundColor = document.field('foreground', colorReference, { required: true });
  css += `body{background-color:${backgroundColor};color:${foregroundColor};}`;

  for(let scopeField of document.dictionary('scopes').entries()) {
    css += `.${scopeField.name}{color:${scopeField.value(colorReference, { required: true })};}`;
  }

  fs.writeFileSync(path.join(__dirname, `dist/${name}.html`), html(name, css));
}

glob(path.join(__dirname, 'schemes/*.eno'), (err, files) => {
  if(err)
    throw err;

  for(let file of files) {
    generateScheme(file);
  }
});
