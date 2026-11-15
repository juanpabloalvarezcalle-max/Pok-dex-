
const cardResultado = document.getElementById("card");

cardResultado.style.cursor = "pointer"; // Muestra la manito al pasar por encima

cardResultado.addEventListener("click", () => {
  const id = cardResultado.dataset.pokemonId;
  if (id) {
    window.location.href = `/docs/pokemon.html?id=${id}`;
  }
});
