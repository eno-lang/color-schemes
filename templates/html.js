module.exports = scheme => `
<html>
  <head>
    <title>
      ${scheme.name}
    </title>

    <style>
      body {
        background-color: ${scheme.background};
        color: ${scheme.foreground};
        font-size: 18px;
      }

      .caret {
        color: ${scheme.caret};
      }

      .selection {
        background-color: ${scheme.selection};
      }

      ${scheme.scopes.map(scope => {
        result = `.${scope.name}{`;
        result += `color:${scope.foreground};`;

        if(scope.background)
          result += `background-color:${scope.background};`;

        if(scope.styles) {
          for(let style of scope.styles) {
            if(style === 'bold')
              result += `font-weight:bold;`;
            else if(style === 'italic')
              result += `font-style:italic;`;
          }
        }

        result += '}';

        return result;
      }).join('\n')}
    </style>
  </head>
  <body>
    <pre><code><span class="comment_operator">&gt;</span> <span class="comment">Text of Comment</span>

<span class="name">Date</span><span class="name_operator">:</span> 1st of November in the year 2017

<span class="block_operator">--</span> <span class="name">Book Description</span>
Lacks a certain ...
something
<span class="block_operator">--</span> <span class="name">Book Description</span>

<span class="name">Shopping List</span><span class="name_operator">:</span>
<span class="item_operator">-</span> Apples
<span class="item_operator">-</span> Oranges

<span class="name">blitz</span> <span class="copy_operator">&lt;</span> <span class="template">blotz</span>

<span class="name">Telephone Numbers</span><span class="name_operator">:</span>
<span class="entry">Ben</span> <span class="entry_operator">=</span> +49 1943 24724784
<span class="entry">Rachel</span> <span class="entry_operator">=</span> +59 3459 35935593
<span class="escape_operator">\`</span><span class="entry">Dave</span><span class="escape_operator">\`</span> <span class="entry_operator">=</span> +69 9025 93593531

<span class="section1_operator">#</span> <span class="section1_name">Body</span>
<span class="section1_operator">#</span> <span class="section1_name">Body</span> <span class="section1_copy_operator">&lt;</span> <span class="section1_template">Foo</span>
<span class="section2_operator">##</span> <span class="section2_escape_operator">\`</span><span class="section2_name">Limbs</span><span class="section2_escape_operator">\`</span></span>
<span class="section3_operator">###</span> <span class="section3_name">Four</span>
<span class="section4_operator">####</span> <span class="section4_name">4</span>
<span class="section5_operator">#####</span> <span class="section5_name">5</span>
<span class="section6_operator">######</span> <span class="section6_name">6</span>
<span class="section6_operator">#######</span> <span class="section6_name">7</span>
<span class="section3_operator">###</span> <span class="section3_name">Left Arm</span>

<span class="section3_operator">###</span> <span class="section3_escape_operator">\`</span><span class="section3_name">Right Arm</span><span class="section3_escape_operator">\`</span></span> <span class="section3_copy_operator">&lt;</span> <span class="section3_template">Left Arm</span>
<span class="section3_operator">###</span> <span class="section3_escape_operator">\`</span><span class="section3_name">Right Arm</span><span class="section3_escape_operator">\`</span></span> <span class="section3_copy_operator">&lt;&lt;</span> <span class="section3_template">Left Arm</span>

<span class="escape_operator">\`</span><span class="name">--format pretty</span><span class="escape_operator">\`</span><span class="name_operator">:</span> Pretty formatting option

<span class="escape_operator">\`</span><span class="name">> Friends <</span><span class="escape_operator">\`</span><span class="name_operator">:</span>
<span class="item_operator">-</span> Jack the Ripper
<span class="item_operator">-</span> Frankenstein

<span class="escape_operator">\`\`</span><span class="name">Use \`\${arg}\` style options</span><span class="escape_operator">\`\`</span><span class="name_operator">:</span>
<span class="entry">'--output dir'</span> <span class="entry_operator">=</span> Specify a different output directory
<span class="entry">'--filters disabled'</span> <span class="entry_operator">=</span> Enable/disable filters

<span class="invalid">asdfa</span>

<span class="name">I</span><span class="name_operator">:</span>
<span class="continuation_operator">|</span>
<span class="continuation_operator">\\</span> append
<span class="continuation_operator">\\</span>
<span class="continuation_operator">|</span> all
<span class="continuation_operator">|</span> the
<span class="continuation_operator">\\</span> things

<span class="selection"><span class="comment_operator">&gt;</span> <span class="comment">Comment</span>

<span class="name">Telephone Numbers</span><span class="name_operator">:</span>
<span class="entry">Ben</span> <span class="entry_operator">=</span> +49 1943 24724784
<span class="entry">Rachel</span> <span class="entry_operator">=</span> +59 3459 35935593
<span class="escape_operator">\`</span><span class="entry">Dave</span><span class="escape_operator">\`</span> <span class="entry_operator">=</span> +69 9025 93593531<span class="caret">|</span></span></code></pre>
  </body>
</html>
`.trim();
