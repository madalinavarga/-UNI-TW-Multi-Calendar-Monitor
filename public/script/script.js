const menuItems = document.querySelector(".navbar-items-container");

function showMobileMenu() {
    if (menuItems.style.display === "flex") {
        menuItems.style.display = "none";
    } else {
        menuItems.style.display = "flex";
    }
}