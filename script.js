const locations = [
  "مطعم", "مدرسة", "مطار", "محطة قطار", "قصر", "سفينة", "شاطئ", "مستشفى"
];

let customLocations = [];
let roles = [];
let currentPlayer = 0;
let totalPlayers = 0;
let chosenLocation = "";

// تحميل المواقع من Local Storage
window.onload = function () {
  const saved = localStorage.getItem("customLocations");
  if (saved) {
    customLocations = JSON.parse(saved);
    updateCustomListDisplay();
  }
};

function updateCustomListDisplay() {
  const listText = customLocations.length
    ? "المواقع المضافة: " + customLocations.join("، ")
    : "لا توجد مواقع مضافة.";
  document.getElementById("customList").textContent = listText;
}

function addCustomLocation() {
  const input = document.getElementById("newLocation");
  const value = input.value.trim();

  if (value && !locations.includes(value) && !customLocations.includes(value)) {
    customLocations.push(value);
    localStorage.setItem("customLocations", JSON.stringify(customLocations));
    input.value = "";
    updateCustomListDisplay();
  } else {
    alert("يرجى إدخال موقع صالح وغير مكرر.");
  }
}

function clearCustomLocations() {
  if (confirm("هل أنت متأكد أنك تريد مسح جميع المواقع المخصصة؟")) {
    localStorage.removeItem("customLocations");
    customLocations = [];
    updateCustomListDisplay();
  }
}

function startGame() {
  totalPlayers = parseInt(document.getElementById("playerCount").value);
  const fullLocations = [...locations, ...customLocations];
  chosenLocation = fullLocations[Math.floor(Math.random() * fullLocations.length)];

  roles = Array(totalPlayers).fill(`الموقع هو: ${chosenLocation}`);
  const spyIndex = Math.floor(Math.random() * totalPlayers);
  roles[spyIndex] = "أنت الجاسوس! لا تعرف الموقع.";

  currentPlayer = 0;

  document.getElementById("setup").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("roleReveal").style.display = "none";
  document.getElementById("currentPlayer").textContent = currentPlayer + 1;
}

function showRole() {
  document.getElementById("roleText").textContent = roles[currentPlayer];
  document.getElementById("roleReveal").style.display = "block";
}

function nextPlayer() {
  currentPlayer++;
  if (currentPlayer < totalPlayers) {
    document.getElementById("currentPlayer").textContent = currentPlayer + 1;
    document.getElementById("roleReveal").style.display = "none";
  } else {
    alert("تم توزيع الأدوار! ابدأوا اللعبة 🕵️");
    location.reload(); // إعادة تحميل الصفحة للبدء من جديد
  }
}