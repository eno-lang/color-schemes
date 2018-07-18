const { parse, EnoDictionary } = require('enojs');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const html = require('./templates/html.js');

const generateScheme = filepath => {
  const input = fs.readFileSync(filepath, 'utf-8');
  const document = parse(input, { reporter: 'terminal', sourceLabel: filepath });

  const scheme = {
    name: document.string('name', { required: true })
  };

  const colors = {};
  for(let colorField of document.section('colors').elements()) {
    colors[colorField.name] = colorField.color();
  }

  const colorReference = ({ name, value }) => {
    if(!colors.hasOwnProperty(value))
      throw `Undefined color ${value} assigned to ${name}`;

    return colors[value];
  };

  const globals = document.section('globals');

  scheme.background = globals.field('background', colorReference, { required: true });
  scheme.caret = globals.field('caret', colorReference, { required: true });
  scheme.foreground = globals.field('foreground', colorReference, { required: true });
  scheme.selection = globals.field('selection', colorReference, { required: true });

  scheme.scopes = document.section('scopes').elements().map(scopeElement => {
    let background, foreground, style;

    if(scopeElement instanceof EnoDictionary) {
      return {
        background: scopeElement.entry('background', colorReference),
        foreground: scopeElement.entry('foreground', colorReference, { required: true }),
        name: scopeElement.name,
        styles: scopeElement.commaSeparated('styles')
      };
    } else {
      return {
        foreground: scopeElement.value(colorReference, { required: true }),
        name: scopeElement.name
      };
    }
  });

  fs.writeFileSync(path.join(__dirname, `dist/html/${scheme.name}.html`), html(scheme));
}

glob(path.join(__dirname, 'schemes/*.eno'), (err, files) => {
  if(err)
    throw err;

  for(let file of files) {
    generateScheme(file);
  }
});
