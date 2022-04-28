// Needed splash screen to pass JSON data in
function startMain() {
  const mainContent = document.getElementById("main-content");
  const splashScreen = document.getElementById("splash");
  splashScreen.style.display = "none";
  mainContent.style.display = "flex";
}

// Event listener for the tutorial icon
function startTutorial() {
  alert("Tutorial");
}

// window.electronAPI.switchToMain((e, data) => {
//   document.getElementById("selection-box").innerHTML = data;
// })