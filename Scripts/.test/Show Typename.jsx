#target Illustrator
#include '../.lib/core.js'

var typenames = ''
selection.forEach(function(it) {
    typenames += it.typename + '\n'
})
if (typenames == '') {
    typenames = 'No selection.'
}

alert(typenames)