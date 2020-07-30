#target Illustrator
#include '../.lib/preconditions.js'
#include '../.lib/select.js'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection
var items = []

var dialog = new Window('dialog', 'Select by types')
dialog.alignChildren = 'right'

var bounds = [0, 0, 115, 15]

dialog.imports = dialog.add('panel', undefined, 'Imports')
dialog.imports.add('group')
dialog.imports1 = dialog.imports.add('group')
dialog.imports1.orientation = 'row'
var placedCheck = dialog.imports1.add('checkbox', bounds, 'Linked file')
var nonNativeCheck = dialog.imports1.add('checkbox', bounds, 'Non-native art')
dialog.imports2 = dialog.imports.add('group')
dialog.imports2.orientation = 'row'
var rasterCheck = dialog.imports2.add('checkbox', bounds, 'Image')
var pluginCheck = dialog.imports2.add('checkbox', bounds, 'Plugin')

dialog.paths = dialog.add('panel', undefined, 'Paths')
dialog.paths.add('group')
dialog.paths1 = dialog.paths.add('group')
dialog.paths1.orientation = 'row'
var pathCheck = dialog.paths1.add('checkbox', bounds, 'Path')
var compoundPathCheck = dialog.paths1.add('checkbox', bounds, 'Compound path')

dialog.types = dialog.add('panel', undefined, 'Types')
dialog.types.add('group')
dialog.types1 = dialog.types.add('group')
dialog.types1.orientation = 'row'
var textFrameCheck = dialog.types1.add('checkbox', bounds, 'Text frame')
var legacyTextCheck = dialog.types1.add('checkbox', bounds, 'Legacy text')

dialog.others = dialog.add('panel', undefined, 'Others')
dialog.others.alignChildren = 'fill'
dialog.others.add('group')
dialog.others1 = dialog.others.add('group')
dialog.others1.orientation = 'row'
var symbolCheck = dialog.others1.add('checkbox', bounds, 'Symbol')
var meshCheck = dialog.others1.add('checkbox', bounds, 'Mesh')
dialog.others2 = dialog.others.add('group')
dialog.others2.orientation = 'row'
var graphCheck = dialog.others2.add('checkbox', bounds, 'Graph')

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    var allowedTypes = []
    if (compoundPathCheck.value) {
        allowedTypes.push(SELECT_COMPOUND_PATH)
    } else if (graphCheck.value) {
        allowedTypes.push(SELECT_GRAPH)
    } else if (legacyTextCheck.value) {
        allowedTypes.push(SELECT_LEGACY_TEXT)
    } else if (meshCheck.value) {
        allowedTypes.push(SELECT_MESH)
    } else if (nonNativeCheck.value) {
        allowedTypes.push(SELECT_NON_NATIVE)
    } else if (pathCheck.value) {
        allowedTypes.push(SELECT_PATH)
    } else if (placedCheck.value) {
        allowedTypes.push(SELECT_PLACED)
    } else if (pluginCheck.value) {
        allowedTypes.push(SELECT_PLUGIN)
    } else if (rasterCheck.value) {
        allowedTypes.push(SELECT_RASTER)
    } else if (symbolCheck.value) {
        allowedTypes.push(SELECT_SYMBOL)
    } else if (textFrameCheck.value) {
        allowedTypes.push(SELECT_TEXT_FRAME)
    }

    selectItems(allowedTypes)
}

dialog.show()