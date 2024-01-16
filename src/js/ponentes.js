(function () {
  const ponentesInput = document.querySelector('#ponentes');

  if(ponentesInput) {
    let ponentes = [];
    let ponentesFiltrados = [];

    const listadoPonentes = document.querySelector('#listado-ponentes');
    const ponenteHidden = document.querySelector('[name="ponente_id"]');

    obtenerPonentes();

    ponentesInput.addEventListener('input', buscarPonentes);

    if (ponenteHidden.value) {
      (async () => {
        const ponente = await obtenerPonente(ponenteHidden.value);
        
        // Insertar en el HTML
        ponentesInput.value = `${ponente.nombre.trim()} ${ponente.apellido.trim()}`;
      })();
    }

    async function obtenerPonentes() {
      const url = '/api/ponentes';
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      formatearPonentes(resultado);
    }

    async function obtenerPonente(id) {
      const url = `/api/ponente?id=${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      return resultado;
    }

    function formatearPonentes(arrayPonentes) {
      ponentes = arrayPonentes.map(ponente => {
        return {
          nombre: `${ponente.nombre.trim()} ${ponente.apellido.trim()}`,
          id: ponente.id
        }
      })
    }

    function buscarPonentes(e) {
      const busqueda = e.target.value.trim();

      if(busqueda.length > 2) {
        const expresion = new RegExp(busqueda, 'i');
        ponentesFiltrados = ponentes.filter(ponente => {
          if(ponente.nombre.toLowerCase().search(expresion) != -1) {
            return ponente;
          }
        });
      } else {
        ponentesFiltrados = [];
      }

      mostrarPonentes();
    }

    function mostrarPonentes() {
      while (listadoPonentes.firstChild) {
        listadoPonentes.removeChild(listadoPonentes.firstChild);
      }

      ponenteHidden.value = '';

      if(ponentesFiltrados.length > 0) {
        ponentesFiltrados.forEach(ponente => {
          const ponenteHTML = document.createElement('LI');
          ponenteHTML.classList.add('listado-ponentes__ponente');
          ponenteHTML.textContent = ponente.nombre;
          ponenteHTML.dataset.ponenteId = ponente.id;
          ponenteHTML.onclick = seleccionarPonente;
  
          // Agregar al DOM
          listadoPonentes.appendChild(ponenteHTML);
        })
      } else {
        const noResultados = document.createElement('P');
        noResultados.classList.add('listado-ponentes__no-resultados');
        noResultados.textContent = 'No se encontraron resultados';
  
        // Agregar al DOM
        listadoPonentes.appendChild(noResultados); 
      }
    }

    function seleccionarPonente(e) {
      const ponente = e.target;

      // Eliminar la clase de seleccionado a la anterior
      const ponentePrevio = document.querySelector('.listado-ponentes__ponente--seleccionado');

      if (ponentePrevio) {
        ponentePrevio.classList.remove('listado-ponentes__ponente--seleccionado');
      }

      ponente.classList.add('listado-ponentes__ponente--seleccionado');

      // Insertar en el input y en el hidden
      ponentesInput.value = ponente.textContent;
      ponenteHidden.value = ponente.dataset.ponenteId;

      // Eliminar el listado
      while (listadoPonentes.firstChild) {
        listadoPonentes.removeChild(listadoPonentes.firstChild);
      }
    }
  }
})();