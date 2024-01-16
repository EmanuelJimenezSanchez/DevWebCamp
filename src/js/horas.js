(function () {
  const horas = document.querySelector('#horas');

  if (horas) {
    const categoria = document.querySelector('[name="categoria_id"]');
    const dias = document.querySelectorAll('[name="dia"]');
    const inputHiddenDia = document.querySelector('[name="dia_id"]');
    const inputHiddenHora = document.querySelector('[name="hora_id"]');
    
    categoria.addEventListener('change', terminoBusqueda);
    dias.forEach(dia => dia.addEventListener('change', terminoBusqueda));

    let busqueda = {
      categoria_id: categoria.value || '',
      dia: +inputHiddenDia.value || ''
    }

    if (!Object.values(busqueda).includes('')) {
      (async () => {
        await buscarEventos();
  
        // Resaltar la hora actual
        const id = inputHiddenHora.value;
        const horaSeleccionada = document.querySelector(`[data-hora-id="${id}"]`);
  
        horaSeleccionada.classList.add('horas__hora--seleccionada');
        horaSeleccionada.classList.remove('horas__hora--desabilitada');

        horaSeleccionada.onclick = seleccionarHora;
      })();
    }

    function terminoBusqueda(e) {
      busqueda[e.target.name] = e.target.value;

      // Reiniciar los campos ocultos y el selector de hora
      inputHiddenHora.value = '';
      inputHiddenDia.value = '';

      // Desabilitar la hora previa, si hay un nuevo click
      const horaPrevia = document.querySelector('.horas__hora--seleccionada');

      if (horaPrevia) {
        horaPrevia.classList.remove('horas__hora--seleccionada');
      }

      // Desabilitar todas las horas
      const listadoHoras = document.querySelectorAll('#horas li');
      listadoHoras.forEach(li => li.classList.add('horas__hora--desabilitada'));


      if (Object.values(busqueda).includes('')) {
        return;
      }

      buscarEventos();
    }

    async function buscarEventos() {
      const { dia, categoria_id } = busqueda;
      const url = `/api/eventos-horario?dia_id=${dia}&categoria_id=${categoria_id}`;

      const resultado = await fetch(url);
      const eventos = await resultado.json();

      obtenerHorasDisponibles(eventos);
    }

    function obtenerHorasDisponibles(eventos) {
      // Comprobar eventos ya tomados y quitar la variable de desabilitado
      const horasTomadas = eventos.map(evento => evento.hora_id);
      const listadoHoras = document.querySelectorAll('#horas li');
      const listadoHorasArray = Array.from(listadoHoras);
      const resultado = listadoHorasArray.filter(li => !horasTomadas.includes(li.dataset.horaId));

      resultado.forEach(li => li.classList.remove('horas__hora--desabilitada'));

      const horasDisponibles = document.querySelectorAll('#horas li:not(.horas__hora--desabilitada)');

      listadoHoras.forEach(hora => hora.removeEventListener('click', seleccionarHora));
      horasDisponibles.forEach(hora => hora.addEventListener('click', seleccionarHora));
    }

    function seleccionarHora(e) {
      // Desabilitar la hora previa, si hay un nuevo click
      const horaPrevia = document.querySelector('.horas__hora--seleccionada');

      if (horaPrevia) {
        horaPrevia.classList.remove('horas__hora--seleccionada');
      }

      // Agregar clase de seleccionado
      e.target.classList.add('horas__hora--seleccionada');
      inputHiddenHora.value = e.target.dataset.horaId;

      // Llenar el campo oculto de dia
      inputHiddenDia.value = document.querySelector('[name="dia"]:checked').value;
    }
  }
})();