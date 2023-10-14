let colors = [
    'Pink', 'Red', 'Blue', 'Green', 'Aqua',
    'Violet', 'Purple', 'Grey', 'Black', 'Orange'];
let colorName = document.querySelector('#hexcolors')
let containerColor = document.querySelector('.container')
let bgColor = document.querySelector('#bgcolor')
function colorhandler() {
    var randomcolor = Math.floor((Math.random() * colors.length - 1) + 1)
    var colorValue = colors[randomcolor]
    document.body.style.backgroundColor = colorValue
    colorName.textContent = colorValue
    colorName.style.color = colorValue
    if (colorValue == "Black") {
        bgColor.style.backgroundColor = "white"
        bgColor.style.color = "black"
    } else if (colorValue !== "Black"||document.body.style.backgroundColor.nodevalue == "black") {
        bgColor.style.backgroundColor = "black"
        bgColor.style.color = "white"
    }
}