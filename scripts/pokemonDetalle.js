const parametros = new URLSearchParams(window.location.search);
let pokemonId = parseInt(parametros.get("id")) || 1;
let spriteNormal = "";
let spriteShiny = "";
let sonidoPokemon = "";


const pokeTitulo = document.getElementById("pokeTitulo");
const pokeImagen = document.getElementById("pokeImagen");
const pokeNumero = document.getElementById("pokeNumero");
const pokeNombre = document.getElementById("pokeNombre");
const pokeTipos = document.getElementById("pokeTipos");
const pokeDescripcion = document.getElementById("pokeDescripcion");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnNormal = document.getElementById("btnNormal");
const btnShiny = document.getElementById("btnShiny");
const btnAudio = document.getElementById("btnAudio");
const btnEquipo = document.getElementById("btnEquipo");
const btnBorrarEquipo = document.getElementById("btnVaciarEquipo");


async function GenerarInfoPokemon(id) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await respuesta.json();

  spriteNormal = data.sprites.front_default;
  spriteShiny = data.sprites.front_shiny;
  sonidoPokemon = data.cries ? data.cries.latest : "";
  pokeImagen.src = spriteNormal;

  // Actualización del número de la pokedex del pokemon (001, 002, etc)
  const numeroFormateado = `#${String(data.id).padStart(3, "0")}`;
  pokeNumero.textContent = numeroFormateado;
  pokeNombre.textContent = data.name;
  pokeTitulo.textContent = data.name;

  // Actualización del tipo del pokemon
  pokeTipos.innerHTML = ""; // Los tipos anteriores se limpian
  data.types.forEach((item) => {
    const span = document.createElement("span");
    span.className = "badge bg-secondary px-3 py-2 rounded-pill text-uppercase";
    span.textContent = item.type.name;
    pokeTipos.appendChild(span);
  });

  CargarDescripción(id);

  async function CargarDescripción(id) {
    try {
      const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      );
      const data = await respuesta.json();
      // Se busca la primera entrada que esté en español
      const entradaEspanol = data.flavor_text_entries.find(
        (entry) => entry.language.name === "es",
      );
      if (entradaEspanol) {
        // Reemplazar saltos de línea raros por espacios limpios
        pokeDescripcion.textContent = entradaEspanol.flavor_text.replace(
          /\f/g,
          " ",
        );
      } else {
        pokeDescripcion.textContent =
          "No hay descripción disponible en español.";
      }
    } catch (error) {
      pokeDescripcion.textContent = "Descripción no disponible.";
    }
  }

  btnAudio.addEventListener("click", () => {
    if (sonidoPokemon) {
      const audio = new Audio(sonidoPokemon);
      audio.play();
    } else {
      alert("El sonido del pokemon no está disponible");
    }
  });

  btnNormal.addEventListener("click", () => {
    pokeImagen.src = spriteNormal;
    btnNormal.classList.add("active");
    btnShiny.classList.remove("active");
  });

  btnShiny.addEventListener("click", () => {
    if (spriteShiny) {
      pokeImagen.src = spriteShiny;
      btnShiny.classList.add("active");
      btnNormal.classList.remove("active");
    }
  });

  btnAnterior.addEventListener("click", () => {
    if (pokemonId > 1) {
      window.location.href = `/docs/pokemon.html?id=${pokemonId - 1}`;
    }
  });

  btnSiguiente.addEventListener("click", () => {
    window.location.href = `/docs/pokemon.html?id=${pokemonId + 1}`;
  });
}

btnEquipo.addEventListener("click",() =>{
    const nuevoPokemonEquipo = {
        id: pokemonId,
        nombre: pokeNombre.textContent,
        numero: pokeNumero.textContent, 
        foto: spriteNormal 

    };
    console.log("monda", nuevoPokemonEquipo);

    let miEquipoPokemon = JSON.parse(localStorage.getItem("equipoPokemon"))|| []; //Se verifica si hay una lista actica, sino va a crear una va´cia 
    if (miEquipoPokemon.length >= 6) {
        alert("tu equipo pokemon está lleno")
        return; 
    }
    miEquipoPokemon.push(nuevoPokemonEquipo) //push está acá para poder agregar a ese pokemon a la lista. 
    localStorage.setItem("equipoPokemon", JSON.stringify(miEquipoPokemon));
    MostrarEquipoPokemon(); // Actualiza el panel del equipo al instante
    console.log(miEquipoPokemon)
    alert(pokeNombre.textContent + " agregado a tu equipo");
}); 

function MostrarEquipoPokemon() {
    
    const miEquipoPokemon = JSON.parse(localStorage.getItem("equipoPokemon")) || [];

   
    const listaEquipo = document.getElementById("listaEquipo");
    listaEquipo.innerHTML = "";

    
    for (let i = 0; i < 6; i++) {
        const slot = document.createElement("div");

        if (miEquipoPokemon[i]) {
            // Si hay un Pokémon en esta posición, se va mostrar su información 
            const poke = miEquipoPokemon[i];
            slot.className = "equipo-slot d-flex align-items-center gap-2 p-2 mb-2 rounded border";
            slot.innerHTML = `
                <img src="${poke.foto}" alt="${poke.nombre}" width="50">
                <div>
                    <small class="text-muted">${poke.numero}</small>
                    <p class="mb-0 fw-bold text-capitalize">${poke.nombre}</p>
                </div>
            `;
        } else {
           
            slot.className = "equipo-slot slot-vacio d-flex align-items-center justify-content-center p-2 mb-2 rounded border border-dashed";
            slot.textContent = "— Ranura vacía —";
        }

        listaEquipo.appendChild(slot); 
    }
}

btnBorrarEquipo.addEventListener("click", ()=>{
    localStorage.removeItem("equipoPokemon")
    MostrarEquipoPokemon(); 
})


GenerarInfoPokemon(pokemonId); 
MostrarEquipoPokemon(); // Muestra el equipo guardado al cargar la página
