// Données de ton personnage (Modifiables facilement ici)
const playerData = {
  level: 2550,
  beli: 15400000,
  fragments: 45000,
  fruits: [
    { name: "Kitsune", status: "Équipé", rarity: "Mythique" },
    { name: "Dragon", status: "Inventaire", rarity: "Mythique" },
    { name: "Dough", status: "Inventaire", rarity: "Mythique" },
    { name: "Buddha", status: "Inventaire", rarity: "Légendaire" },
    { name: "Magma", status: "Inventaire", rarity: "Rare" }
  ]
};

// Injection des données dans la page
document.addEventListener("DOMContentLoaded", () => {
  // Mise à jour des stats de base
  document.getElementById("player-level").innerText = playerData.level.toLocaleString();
  document.getElementById("player-beli").innerText = "$" + playerData.beli.toLocaleString();
  document.getElementById("player-fragments").innerText = playerData.fragments.toLocaleString();

  // Génération de la liste des fruits
  const fruitsContainer = document.getElementById("fruits-container");

  playerData.fruits.forEach(fruit => {
    const isEquipped = fruit.status === "Équipé";
    
    const fruitCard = document.createElement("div");
    fruitCard.className = `fruit-card ${isEquipped ? 'equipped' : ''}`;
    
    fruitCard.innerHTML = `
      <h4>${fruit.name}</h4>
      <span class="fruit-badge">${fruit.status}</span>
    `;
    
    fruitsContainer.appendChild(fruitCard);
  });
});