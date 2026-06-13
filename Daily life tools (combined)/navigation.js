fetch("nav.html")
.then(res => res.text())
.then(data => {
    document.getElementById("nav-holder").innerHTML = data;

    // now nav exists, safe to run code
    const menuMenu = document.getElementById("menu-menu");
    const NavigationButton = document.getElementById("nav-button");
    const NavigationContainer = document.getElementById("nav-container");

    NavigationButton.addEventListener("click", function () {
        menuMenu.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!NavigationContainer.contains(event.target)) {
            menuMenu.classList.remove("active");
        }
    });
});