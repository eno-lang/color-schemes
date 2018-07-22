const mapScope = {
  block_operator           :  'punctuation.definition.block',
  block_name               :  'entity.name.block',
  comment                  :  'comment',
  comment_operator         :  'punctuation.definition.comment',
  continuation_operator    :  'punctuation.definition.continuation',
  copy_operator            :  'punctuation.definition.name.template',
  entry                    :  'variable.other.name.entry.eno',
  entry_operator           :  'punctuation.definition.name.entry',
  entry_escape_operator    :  'punctuation.definition.name.entry.escape',  // TODO fine differentiation
  escape_operator          :  'todo',  // TODO
  invalid                  :  'invalid',
  item_operator            :  'punctuation.definition.item',
  name                     :  'variable.other.name',
  name_operator            :  'punctuation.definition.name',
  template                 :  'variable.other.name.template'
};

for(let level of [1, 2, 3, 4, 5, 6]) {
  mapScope[``]
  mapScope[`section${level}_operator`] =         `punctuation.definition.section.${level}`;
  mapScope[`section${level}_escape_operator`] =  `punctuation.definition.section.${level}.escape`;
  mapScope[`section${level}_name`] =             `entity.name.section.${level}`;
  mapScope[`section${level}_copy_operator`] =    `punctuation.definition.section.${level}.template`;
  mapScope[`section${level}_template`] =         `entity.name.section.${level}.template`;
}

module.exports = scheme => {
  const result = {
    name: scheme.name,
    globals: {
      background: scheme.background,
      caret: scheme.caret,
      foreground: scheme.foreground,
      selection: scheme.selection
    },
    rules: scheme.scopes.map(scope => {
      const result = {
        foreground: scope.foreground,
        scope: mapScope[scope.name]
      };

      if(result.scope === undefined)
        throw `Sublime generator does not support scope '${scope.name}' in scheme '${scheme.name}'`;

      if(scope.background)
        result.background = scope.background;
      if(scope.styles)
        result.font_style = scope.styles.join(' ');

      return result;
    })
  };

  return JSON.stringify(result, null, 2);
};
