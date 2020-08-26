#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/preconditions.js'

const ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

const BOUNDS_TEXT = [0, 0, 65, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkHasSelection()

var dialog = Dialog('Rename sequence')

dialog.sequence = dialog.root.addPanel('Sequence')
dialog.sequence.alignChildren = 'fill'
dialog.sequence.stops = dialog.sequence.add('group')
dialog.sequence.stops.add('statictext', BOUNDS_TEXT, 'Stops at:').justify = 'right'
dialog.sequence.stopsList = dialog.sequence.stops.add('dropdownlist', undefined, ALPHABETS)
dialog.sequence.stopsList.selection = 1
dialog.sequence.space = dialog.sequence.add('group')
dialog.sequence.space.add('statictext', BOUNDS_TEXT, 'Add space:').justify = 'right'
dialog.sequence.spaceCheck = dialog.sequence.space.add('checkbox', undefined)

dialog.reverse = dialog.root.add('group')
dialog.reverse.alignment = 'right'
dialog.reverseCheck = dialog.reverse.add('checkbox', undefined, 'Reverse order')

var prefix = 1
var count = 0
var stopsAt

dialog.onAction(function() {
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] == list.selection.text) {
            stopsAt = i + 1
        }
    }
    if (!reverseCheck.value) {
        for (var i = 0; i < selection.length; i++) {
            rename(selection[i])
        }
    } else {
        for (var i = selection.length - 1; i >= 0; i--) {
            rename(selection[i])
        }
    }
})
dialog.show()

function rename(item) {
    if (item.typename == 'TextFrame') {
        var s = prefix.toString()
        if (spaceCheck.value) {
            s += ' '
        }
        s += ALPHABETS[count]

        var words = item.words
        words.removeAll()
        words.add(s)

        count++
        if (count == stopsAt) {
            prefix++
            count = 0
        }
    }
}