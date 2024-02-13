
let hamIconEl = document.querySelector('.ham-icon');
//Run function on ham-icon click
hamIconEl.addEventListener('click', toggleNavMenu);

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleNavMenu() {
    if (window.innerWidth >= 600) {
        return;
    }

    let navLinksId = document.getElementById("navLinks");
    let icon = document.querySelector("nav .ham-icon");

    if (navLinksId.classList.contains('expanded')) {
        navLinksId.classList.remove('expanded');
    } else {
        navLinksId.classList.add('expanded');
    }

    icon.classList.toggle("toggle");
}

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

