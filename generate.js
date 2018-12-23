const eno = require('enojs');
const { Fieldset, TerminalReporter } = require('enojs');
const fs = require('fs');
const fsExtra = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');

const html = require('./templates/html.js');
const sublime = require('./templates/sublime.js');

const generateScheme = async filepath => {
  const input = await fs.promises.readFile(filepath, 'utf-8');
  const document = eno.parse(input, { reporter: TerminalReporter, sourceLabel: filepath });

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

    if(scopeElement instanceof Fieldset) {
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
  fs.writeFileSync(path.join(__dirname, `dist/sublime/${scheme.name}.sublime-color-scheme`), sublime(scheme));
}

const generate = async () => {
  await fsExtra.emptyDir(path.join(__dirname, 'dist'));
  await fsExtra.mkdir(path.join(__dirname, 'dist/html'));
  await fsExtra.mkdir(path.join(__dirname, 'dist/sublime'));

  const schemes = await glob(path.join(__dirname, 'schemes/*.eno'));

  for(let scheme of schemes) {
    generateScheme(scheme);
  }
};

generate();
