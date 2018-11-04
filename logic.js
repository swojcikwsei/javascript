let canva = document.querySelector('#canva')
let context = canva.getContext('2d')
let imageData
var originalImageData, activeSlider

let brightnessSlider = document.querySelector('#brtSlider')
let contrastSlider = document.querySelector('#conSlider')
let saturationSlider = document.querySelector('#satSlider')
    
const imgPath = './krakow.jpg'

let img = new Image()

img.addEventListener('load', ()=> {
    context.drawImage(img, 0, 0, canva.width, canva.height)
    imageData = context.getImageData(0, 0, canva.width, canva.height)
    originalImageData = new Uint8ClampedArray(imageData.data)
    
})
img.src = imgPath

brightnessSlider.onclick = function() {

    if (!(activeSlider === brightnessSlider) && (typeof activeSlider !== 'undefined')) {
        originalImageData = new Uint8ClampedArray(imageData.data)
    }

    activeSlider = brightnessSlider
}

contrastSlider.onclick = function() {
    if (!(activeSlider === contrastSlider) && (typeof activeSlider !== 'undefined')) {
        originalImageData = new Uint8ClampedArray(imageData.data)
    }
    activeSlider = contrastSlider
}

saturationSlider.onclick = function() {
    if (!(activeSlider === saturationSlider) && (typeof activeSlider !== 'undefined')) {
        originalImageData = new Uint8ClampedArray(imageData.data)
    }
    activeSlider = contrastSlider
}

brightnessSlider.oninput = function() {
    let modifiedData = changeBrightness(imageData, this.value)
    context.putImageData(modifiedData, 0, 0)
}

contrastSlider.oninput = function() {
    let modifiedData = changeContrast(imageData, this.value)
    context.putImageData(modifiedData, 0, 0)
}

saturationSlider.oninput = function() {
    let modifiedData = changeSaturation(imageData, this.value)
    context.putImageData(modifiedData, 0, 0)
}

function changeBrightness(imageData, brightness) {
    // Copy orginal data
    var data = new Uint8ClampedArray(originalImageData)
    brightness *= 2.55
    
    for(var i=0;i<data.length;i+=4) { 
        data[i] = data[i] + brightness 
        data[i+1] = data[i+1] + brightness
        data[i+2] = data[i+2] + brightness
    }
    imageData.data.set(data)
    return imageData; 
}

// Based on https://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/
function changeContrast(imageData, contrast) { 
    // Copy orginal data
    var data = new Uint8ClampedArray(originalImageData)
    contrast *= 2.55

    // Add .1 to avoid /0 error
    var factor = (255 + contrast) / (255.01 - contrast) 

    for(var i=0;i<data.length;i+=4) { 
        data[i] = factor * (data[i] - 128) + 128;     
        data[i+1] = factor * (data[i+1] - 128) + 128; 
        data[i+2] = factor * (data[i+2] - 128) + 128; 
    }
    imageData.data.set(data)
    return imageData 
}

function changeSaturation(imageData, brightness) {
    // Copy orginal data
    var data = new Uint8ClampedArray(originalImageData)
    brightness *= 2.55
    
    for(var i=0;i<data.length;i+=4) { 
        let maxValue = 0
        let indexOfMax

        for(var j=0;j<3;j+=1) {
            if (maxValue < data[i + j]) {
                maxValue = data[i + j]
                indexOfMax = i + j
            }
        }

        data[indexOfMax] = data[indexOfMax] + brightness 
    }
    imageData.data.set(data)
    return imageData; 
}