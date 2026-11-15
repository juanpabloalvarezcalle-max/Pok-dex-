const btn = document.getElementById("btn");
const input = document.getElementById("input");
const msj = document.getElementById("mensaje");
const card = document.getElementById("card");
//agrega el evento click al btn
btn.addEventListener("click", Buscar);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    Buscar();
  }
});
function Buscar() {
  const termino = input.value.toLowerCase().trim();
  if (!termino) {
    msj.textContent = "Ingrese un valor valido para buscar";
    return;
  }
  msj.textContent = "Buscando...";
  card.style.display = "none";

  fetch("https://pokeapi.co/api/v2/pokemon/" + termino)
    .then(function (respuesta) {
      if (!respuesta.ok) {
        msj.textContent = "Pokemon no encontrado";
        return null;
      }
      return respuesta.json();
    })
    .then(function (dato) {
      if (!dato) return;
      document.getElementById("imagen").src = dato.sprites.front_default;
      document.getElementById("nombre").textContent = dato.name;
      document.getElementById("tipo").textContent = dato.types[0].type.name;

      msj.style.display = "none";
      card.dataset.pokemonId = dato.id; // Guardamos el id para navegación
      card.style.display = "flex";
    })
    .catch(function () {
      msj.textContent = "Error al conectar con la API";
    });
}

function ListarPokemones(generacion) {
  switch (generacion) {
    case 1:
      fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
        .then(function (respuesta) {
          if (!respuesta.ok) {
            msj.textContent = "Pokemones no encontrados";  //Sistema de validación de la api para saber que la agarró 
            return null;
          }
          return respuesta.json();
        })
        .then(async function (datos) {
          if (!datos) return;

          for (let i = 0; i < datos.results.length; i++) { // Bucle for para que se vaya leyendo el cada uno de los pokemones y abajo se conviertan en cards. 
            const card = document.createElement("div");          
            card.className = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center mb-4";

            const pokemon = await BuscarDatosPokemon(datos.results[i].name);
            console.log(pokemon);

            card.innerHTML = `
           <a href="/docs/pokemon.html?id=${pokemon.id}" class="text-decoration-none text-dark">
                <div class="card pokemon-resultado w-100 h-100">
              <div class="pokemon-img-wrapper">
              <img id="imagen" alt="Imagen Pokemon" src="${pokemon.sprites.front_default}" />
              </div> 
              <p class="nombre">${pokemon.name}</p>
              <span class="tipo">${pokemon.types.map((t) => t.type.name).join(", ")}</span> 
                </div>
                </a>
              `;
          
              

            document.getElementById("contenedorPokemones").appendChild(card);
          }
        });

      break;
    case 2:
      fetch("https://pokeapi.co/api/v2/pokemon?offset=251&limit=135")
        .then(function (respuesta) {
          if (!respuesta.ok) {
            msj.textContent = "Pokemones no encontrados"; 
            return null;
          }
          return respuesta.json();
        })
        .then(async function (datos) {
          for (let i = 0; i < datos.results.length; i++) {
            const card = document.createElement("div");
            card.className = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center mb-4";

            const pokemon2 = await BuscarDatosPokemon(datos.results[i].name);
            console.log(pokemon2);

            card.innerHTML = `
           <a href="/docs/pokemon.html?id=${pokemon2.id}" class="text-decoration-none text-dark">
                <div class="card pokemon-resultado w-100 h-100">
              <div class="pokemon-img-wrapper">
              <img id="imagen" alt="Imagen Pokemon" src="${pokemon2.sprites.front_default}" />
              </div> 
              <p class="nombre">${pokemon2.name}</p>
              <span class="tipo">${pokemon2.types.map((t) => t.type.name).join(", ")}</span> 
                </div>
                </a>
              `;
              document.getElementById("contenedorPokemones").appendChild(card);
          }
        });
      break;
    case 3:
      fetch("https://pokeapi.co/api/v2/pokemon?offset=649&limit=72")
      .then(function (respuesta) {
        if (!respuesta.ok) {
          msj.textContent = "Pokemon No encontrado"
          return null;    
        }
        return respuesta.json(); 
      })
      .then(async function (datos) {
        for (let i = 0; i < datos.results.length; i++) {
          const card = document.createElement("div"); 
          card.className = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center mb-4";

          const pokemon3 = await BuscarDatosPokemon(datos.results[i].name)
          console.log(pokemon3)

          card.innerHTML = `
            <a href="/docs/pokemon.html?id=${pokemon3.id}" class="text-decoration-none text-dark">
                <div class="card pokemon-resultado w-100 h-100">
              <div class="pokemon-img-wrapper">
              <img id="imagen" alt="Imagen Pokemon" src="${pokemon3.sprites.front_default}" />
              </div> 
              <p class="nombre">${pokemon3.name}</p>
              <span class="tipo">${pokemon3.types.map((t) => t.type.name).join(", ")}</span> 
                </div>
                </a>
              `;
              document.getElementById("contenedorPokemones").appendChild(card);
        }
      })
      break;

    default:
      break;
  }
}
function BuscarDatosPokemon(nombre) {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
    .then(function (respuesta) {
      if (!respuesta.ok) {
        msj.textContent = "Pokemon no encontrado";
        return null;
      }
      return respuesta.json();
    })
    .catch(function () {
      msj.textContent = "Error al conectar con la API";
    });
}

