// Liste complète des fruits avec Prix et Rareté
const allGameFruits = [
  { name: "Dragon", rarity: "Mythique", price: "15M $" },
  { name: "Control", rarity: "Mythique", price: "9M $" },
  { name: "Kitsune", rarity: "Mythique", price: "8M $" },
  { name: "Tiger", rarity: "Mythique", price: "5M $" },
  { name: "Yeti", rarity: "Mythique", price: "5M $" },
  { name: "Spirit", rarity: "Mythique", price: "3.4M $" },
  { name: "Gas", rarity: "Mythique", price: "3.2M $" },
  { name: "Venom", rarity: "Mythique", price: "3M $" },
  { name: "Shadow", rarity: "Mythique", price: "2.9M $" },
  { name: "Dough", rarity: "Mythique", price: "2.8M $" },
  { name: "Mammoth", rarity: "Mythique", price: "2.7M $" },
  { name: "T-Rex", rarity: "Mythique", price: "2.7M $" },
  { name: "Gravity", rarity: "Mythique", price: "2.5M $" },
  { name: "Blizzard", rarity: "Légendaire", price: "2.4M $" },
  { name: "Pain", rarity: "Légendaire", price: "2.3M $" },
  { name: "Lightning", rarity: "Légendaire", price: "2.1M $" },
  { name: "Portal", rarity: "Légendaire", price: "1.9M $" },
  { name: "Phoenix", rarity: "Légendaire", price: "1.8M $" },
  { name: "Sound", rarity: "Légendaire", price: "1.7M $" },
  { name: "Spider", rarity: "Légendaire", price: "1.5M $" },
  { name: "Creation", rarity: "Légendaire", price: "1.4M $" },
  { name: "Love", rarity: "Légendaire", price: "1.3M $" },
  { name: "Buddha", rarity: "Légendaire", price: "1.2M $" },
  { name: "Quake", rarity: "Légendaire", price: "1M $" },
  { name: "Magma", rarity: "Rare", price: "960k $" },
  { name: "Light", rarity: "Rare", price: "650k $" },
  { name: "Ice", rarity: "Peu commun", price: "350k $" },
  { name: "Rocket", rarity: "Commun", price: "5k $" }
];

// Configuration de tes différents comptes
const accountsData = [
  {
    accountName: "Compte Principal (Main)",
    level: 2550,
    beli: 15400000,
    fragments: 45000,
    fruits: [
      { name: "Kitsune", status: "Équipé", quantity: 1 },
      { name: "Dragon", status: "Inventaire", quantity: 3 },
      { name: "Dough", status: "Inventaire", quantity: 2 },
      { name: "Buddha", status: "Inventaire", quantity: 5 }
    ]
  },
  {
    accountName: "Compte Secondaire (Alt 1)",
    level: 1800,
    beli: 4200000,
    fragments: 15000,
    fruits: [
      { name: "Buddha", status: "Équipé", quantity: 1 },
      { name: "Dragon", status: "Inventaire", quantity: 1 },
      { name: "Portal", status: "Inventaire", quantity: 4 }
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.getElementById("account-select");

  // Remplir le sélecteur de compte
  accountsData.forEach((acc, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = acc.accountName;
    selectElement.appendChild(opt);
  });

  // Fonction d'affichage du Dashboard pour un compte précis
  function loadAccount(index) {
    const acc = accountsData[index];
    document.getElementById("player-level").innerText = acc.level.toLocaleString();
    document.getElementById("player-beli").innerText = "$" + acc.beli.toLocaleString();
    document.getElementById("player-fragments").innerText = acc.fragments.toLocaleString();

    const totalCount = acc.fruits.reduce((sum, f) => sum + f.quantity, 0);
    document.getElementById("player-fruit-count").innerText = totalCount;

    const myFruitsContainer = document.getElementById("my-fruits-container");
    myFruitsContainer.innerHTML = "";

    acc.fruits.forEach(f => {
      const card = document.createElement("div");
      card.className = "wiki-fruit-card commun";
      card.innerHTML = `
        <div class="fruit-left">
          <span class="fruit-title">${f.name}</span>
          <span class="rarity-pill commun">${f.status}</span>
        </div>
        <div class="fruit-right">
          <span class="stock-pill">x${f.quantity}</span>
        </div>
      `;
      myFruitsContainer.appendChild(card);
    });
  }

  selectElement.addEventListener("change", (e) => loadAccount(e.target.value));
  loadAccount(0);

  // Calculer le total cumulé d'un fruit sur TOUS les comptes
  function getTotalFruitQuantity(fruitName) {
    let total = 0;
    accountsData.forEach(acc => {
      const found = acc.fruits.find(f => f.name === fruitName);
      if (found) total += found.quantity;
    });
    return total;
  }

  // Générer le catalogue style Wiki
  const catalogContainer = document.getElementById("catalog-container");

  function renderCatalog(filterRarity = "all") {
    catalogContainer.innerHTML = "";

    allGameFruits.forEach(fruit => {
      if (filterRarity !== "all" && fruit.rarity !== filterRarity) return;

      const totalOwned = getTotalFruitQuantity(fruit.name);
      const rarityClass = fruit.rarity.toLowerCase().replace(" ", "-");

      const card = document.createElement("div");
      card.className = `wiki-fruit-card ${rarityClass}`;
      card.innerHTML = `
        <div class="fruit-left">
          <span class="fruit-title">${fruit.name}</span>
          <span class="rarity-pill ${rarityClass}">◆ ${fruit.rarity}</span>
        </div>
        <div class="fruit-right">
          <span class="fruit-price">${fruit.price}</span>
          <span class="stock-pill">Total: ${totalOwned}</span>
        </div>
      `;
      catalogContainer.appendChild(card);
    });
  }

  // Mettre à jour le nombre de fruits dans les badges des filtres
  function updateFilterCounts() {
    document.getElementById("count-all").innerText = allGameFruits.length;
    document.getElementById("count-mythique").innerText = allGameFruits.filter(f => f.rarity === "Mythique").length;
    document.getElementById("count-legendaire").innerText = allGameFruits.filter(f => f.rarity === "Légendaire").length;
    document.getElementById("count-rare").innerText = allGameFruits.filter(f => f.rarity === "Rare").length;
    document.getElementById("count-peu-commun").innerText = allGameFruits.filter(f => f.rarity === "Peu commun").length;
    document.getElementById("count-commun").innerText = allGameFruits.filter(f => f.rarity === "Commun").length;
  }

  updateFilterCounts();
  renderCatalog();

  // Événement clic sur les boutons de filtres
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.getAttribute("data-rarity"));
    });
  });

  // Navigation Onglets
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
    });
  });
});
