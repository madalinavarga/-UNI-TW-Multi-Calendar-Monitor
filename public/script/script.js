const menuItems = document.querySelector(".navbar-items-container");

function showMobileMenu() {
    if (menuItems.style.display === "flex") {
        menuItems.style.display = "none";
    } else {
        menuItems.style.display = "flex";
    }
}

function updateCoordinates() {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`/coordinates?latitude=${latitude}&longitude=${longitude}`, {
                method: "PUT"
            })
        })
    }
}
updateCoordinates()