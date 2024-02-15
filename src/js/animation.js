//Function for click on shapes -> adds class which changes shapes.
let triangleEl = document.querySelector('.triangle');
let circleEl = document.querySelector('.circle');
let squareEl = document.querySelector('.square');

triangleEl.addEventListener('click', function() {
    changeColor(triangleEl);
});

function changeColor(shape) {
    shape.classList.add('change-color')

    setTimeout(function() {
        shape.classList.remove('change-color');
    }, 2000);
}

circleEl.addEventListener('click', function() {
    changeSize(circleEl);
});

function changeSize(shape) {
    shape.classList.add('changeSize');

    setTimeout(function() {
        shape.classList.remove('changeSize');
    }, 1000); 
}

squareEl.addEventListener('click', function() {
    spin(squareEl);
});

function spin(shape) {
    shape.classList.add('rotating');

    setTimeout(function() {
        shape.classList.remove('rotating');
    }, 2000); 
}