function init() {
    const logo = document.getElementById("logo");
    logo.src = browser.runtime.getURL("assets/icon.svg");
}

init();
