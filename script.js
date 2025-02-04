// 🔥 Firebase Config (Replace with your actual credentials)
var firebaseConfig = {
  apiKey: "AIzaSyCU2Pu9ACccPJlLq-x7rq_9xGbgFJG3kLk",
  authDomain: "esp8266-readanalog.firebaseapp.com",
  databaseURL:
    "https://esp8266-readanalog-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp8266-readanalog",
  storageBucket: "esp8266-readanalog.firebasestorage.app",
  messagingSenderId: "832748731693",
  appId: "1:832748731693:web:232c266743b52909e927a4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// 🌍 Hexagonal positions (Relative Grid Layout)
const positions = [
  [2, 0],
  [0, 1],
  [4, 1],
  [2, 2],
  [0, 3],
  [4, 3],
  [2, 4],
];

const hexContainer = document.getElementById("hex-container");

// 📌 Generate Nodes
positions.forEach((pos, index) => {
  let node = document.createElement("div");
  node.classList.add("node");
  node.style.gridColumn = pos[0] + 1;
  node.style.gridRow = pos[1] + 1;
  node.setAttribute("id", "node-" + (index + 1));

  let waterIndicator = document.createElement("div");
  waterIndicator.classList.add("water-indicator");
  waterIndicator.innerText = "0 cm";
  node.appendChild(waterIndicator);

  let arrow = document.createElement("div");
  arrow.classList.add("arrow");
  node.appendChild(arrow);

  let waterArea = document.createElement("div");
  waterArea.classList.add("water-area");
  node.appendChild(waterArea);

  hexContainer.appendChild(node);
});

// 📌 Update Nodes (Simulated or Firebase Data)
function updateNodes() {
  for (let i = 1; i <= 7; i++) {
    let waterLevel = Math.floor(Math.random() * 100);
    let flowDirection = Math.floor(Math.random() * 360);

    let node = document.getElementById("node-" + i);
    node.querySelector(".water-indicator").innerText = waterLevel + "cm";
    node.querySelector(
      ".arrow"
    ).style.transform = `rotate(${flowDirection}deg)`;
    node.querySelector(".water-area").style.transform = `scale(${
      waterLevel / 50
    })`;
  }
}



// Simulate Data Updates Every 1 Second
setInterval(updateNodes, 1000);

// Real ESP8266 sensor:


function updateData(snapshot) {
  document.getElementById("temperature").innerText = snapshot.val().temperature;
  document.getElementById("humidity").innerText = snapshot.val().humidity;
}

var sensorRef = database.ref("/sensors");
sensorRef.on("value", (snapshot) => updateData(snapshot));