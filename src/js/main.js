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