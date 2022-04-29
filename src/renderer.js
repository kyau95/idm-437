// 

// Fetch the user's settings
let userSettings;
async function getUserData() {
  await fetch("../resources/options.json")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      userSettings = data;
    });
}

// Populates the selection box based on 
// if the user has pre-existing categories
async function populateSelections() {
  await getUserData();
  const selectionBox = document.getElementById("selection-box");
  if (userSettings["categories"].length == 0) {
    selectionBox.innerHTML = "Add a new category"
  }
}

// populateSelections();

// Event listener for the tutorial icon
function startTutorial() {
  alert("Tutorial");
}

// window.electronAPI.switchToMain((e, data) => {
//   document.getElementById("selection-box").innerHTML = data;
// })