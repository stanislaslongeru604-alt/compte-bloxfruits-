// Données personnelles du joueur
const playerData = {
  level: 2550,
  beli: 15400000,
  fragments: 45000,
  myFruits: [
    { name: "Kitsune", status: "Équipé" },
    { name: "Dragon", status: "Possédé" },
    { name: "Dough", status: "Possédé" }
  ]
};

// Liste globale de tous les fruits du jeu (pour le catalogue)
const allGameFruits = [
  "Rocket", "Spin", "Blade", "Spring", "Bomb", "Smoke", "Spike", "Flame", 
  "Falcon", "Ice", "Sand", "Dark", "Diamond", "Light", "Rubber", "Barrier", 
  "Ghost", "Magma", "Quake", "Buddha", "Love", "Spider", "Sound", "Phoenix", 
  "Portal", "Rumble", "Pain", "Blizzard", "Gravity", "Mammoth", "T-Rex", 
  "Dough", "Shadow", "Venom", "Control", "Spirit", "Dragon", "Leopard", "Kitsune"
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Charger les stats de base
  document.getElementById("player-level").innerText = playerData.level.toLocaleString();
  document.getElementById("player-beli").innerText = "$" + playerData.beli.toLocaleString();
  document.getElementById("player-fragments").innerText = playerData.fragments.toLocaleString();

  // 2. Charger les fruits possédés dans le Dashboard
  const myFruitsContainer = document.getElementById("my-fruits-container");
  playerData.myFruits.forEach(fruit => {
    const isEquipped = fruit.status === "Équipé";
    const card = document.createElement("div");
    card.className = `fruit-card ${isEquipped ? 'equipped' : ''}`;
    card.innerHTML = `
      <h4>${fruit.name}</h4>
      <span class="fruit-badge">${fruit.status}</span>
    `;
    myFruitsContainer.appendChild(card);
  });

  // 3. Charger TOUS les fruits dans l'onglet Catalogue
  const catalogContainer = document.getElementById("catalog-container");
  allGameFruits.forEach(fruitName => {
    const card = document.createElement("div");
    card.className = "fruit-card";
    card.innerHTML = `<h4>${fruitName}</h4>`;
    catalogContainer.appendChild(card);
  });

  // 4. Gestion du système d'onglets
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // Désactiver tous les boutons et cacher tous les onglets
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      // Activer le bouton cliqué et afficher l'onglet correspondant
      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
});
