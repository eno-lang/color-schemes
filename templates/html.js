module.exports = (title, css) => `
<html>
  <head>
    <title>
      ${title}
    </title>



    <style>
      body {
        font-size: 18px;
      }

      ${css}
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
<span class="entry">Ben</span> = +49 1943 24724784
<span class="entry">Rachel</span> = +59 3459 35935593
<span class="escape_operator">\`</span><span class="entry">Dave</span><span class="escape_operator">\`</span> = +69 9025 93593531

<span class="section"># Body</span>
<span class="section"># Body < Foo</span>
<span class="section">## <span class="escape_operator">\`</span>Limbs<span class="escape_operator">\`</span></span>
<span class="section">### Four</span>
<span class="section">#### 4</span>
<span class="section">##### 5</span>
<span class="section">###### 6</span>
<span class="section">###### 7</span>
<span class="section">### Left Arm</span>

<span class="section">### <span class="escape_operator">\`</span>Right Arm<span class="escape_operator">\`</span></span> <span class="copy_operator">&lt;</span> <span class="template">Left Arm</span>
<span class="section">### <span class="escape_operator">\`</span>Right Arm<span class="escape_operator">\`</span></span> <span class="copy_operator">&lt;&lt;</span> <span class="template">Left Arm</span>

<span class="escape_operator">\`</span><span class="name">--format pretty</span><span class="escape_operator">\`</span><span class="name_operator">:</span> Pretty formatting option

<span class="escape_operator">\`</span><span class="name">> Friends <</span><span class="escape_operator">\`</span><span class="name_operator">:</span>
<span class="item_operator">-</span> Jack the Ripper
<span class="item_operator">-</span> Frankenstein

<span class="escape_operator">\`\`</span><span class="name">Use \`\${arg}\` style options</span><span class="escape_operator">\`\`</span><span class="name_operator">:</span>
<span class="entry">'--output dir'</span> = Specify a different output directory
<span class="entry">'--filters disabled'</span> = Enable/disable filters

<span class="invalid">asdfa</span>

<span class="name">I</span><span class="name_operator">:</span>
<span class="continuation_operator">|</span>
<span class="continuation_operator">\\</span> append
<span class="continuation_operator">\\</span>
<span class="continuation_operator">|</span> all
<span class="continuation_operator">|</span> the
<span class="continuation_operator">\\</span> things</code></pre>
  </body>
</html>
`.trim();