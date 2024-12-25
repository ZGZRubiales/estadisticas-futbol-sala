// Cargar los datos del Local Storage o usar un array vacío
let datos = JSON.parse(localStorage.getItem('datos')) || [];

// Función para mostrar los datos almacenados en la página
function mostrarResultados() {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';  // Limpiar los resultados previos

  // Mostrar los datos
  datos.forEach(function(fila) {
    resultadosDiv.innerHTML += `<p><strong>Equipo:</strong> ${fila[0]} | <strong>Jugador:</strong> ${fila[1]} | <strong>Goles:</strong> ${fila[2]}</p>`;
  });
}

// Mostrar los datos al cargar la página
mostrarResultados();

// Manejar el envío del formulario
document.getElementById('form-estadisticas').addEventListener('submit', function(event) {
  event.preventDefault();  // Evitar recargar la página

  // Obtener los datos del formulario
  const equipo = document.getElementById('equipo').value;
  const jugador = document.getElementById('jugador').value;
  const goles = document.getElementById('goles').value;

  // Añadir los datos al array
  datos.push([equipo, jugador, goles]);

  // Guardar los datos en el Local Storage
  localStorage.setItem('datos', JSON.stringify(datos));

  // Mostrar los resultados debajo
  mostrarResultados();

  // Limpiar los campos del formulario
  document.getElementById('equipo').value = '';
  document.getElementById('jugador').value = '';
  document.getElementById('goles').value = '';
});

// Función para crear y descargar un archivo CSV
document.getElementById('exportar').addEventListener('click', function() {
  // Crear el encabezado del CSV
  let csvContent = 'Equipo,Jugador,Goles\n';

  // Agregar los datos de cada registro al CSV
  datos.forEach(function(fila) {
    csvContent += fila.join(',') + '\n';
  });

  // Crear un archivo CSV a partir del contenido
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Crear un enlace para descargar el archivo
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'estadisticas_futbol_sala.csv';

  // Hacer clic en el enlace para descargar el archivo
  link.click();
});


  
