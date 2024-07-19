
//Buenas Profe, quizas este desordenado, se lo separe
//para poder verlos por separados, a mi me sirvio a si no se me mezcla todo.

//trabaje con luxon para traer las fechas actuales
let DateTime = luxon.DateTime;
dt = DateTime.now()


const dia = document.querySelector('.day')
const mes = document.querySelector('.month')
const anio = document.querySelector('.year')

dia.innerHTML = `${dt.day} /`
mes.innerHTML = dt.month
anio.innerHTML = dt.year


//obtenemos la localizacion, tiempo y descripcion con los
//iconos que trae la api, vi que tambien se pueden poner iconos animados



const temperaturaValor = document.querySelector('.tempValor')
const tempDescripcion = document.querySelector('.tempDescripcion')
const ubicacion = document.querySelector('.ubicacion')
const icono = document.querySelector('.icono')




window.addEventListener('load', ()=> {
    // usamos la geolocalizacion para saber el clima de momento
    // en un lugar determinado 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion => {
            long = posicion.coords.longitude
            latit = posicion.coords.latitude
            //segun latitud y longitud nos dara el clima determinado...
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&appid=a1ef707cfaa7b1a00cbbf6eb2eefd0b6&lang=es&units=metric`

            fetch(url)
                .then((response)=> response.json())
                .then(data =>{
                    temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} °C`
                    let desc = data.weather[0].description
                    tempDescripcion.textContent = desc.toUpperCase()
                    ubicacion.textContent = data.name

                    let codigoIcono = data.weather[0].icon
                    const urlIcono = ` https://openweathermap.org/img/wn/${codigoIcono}.png`
                    icono.src = urlIcono

                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

})


const inputTarea = document.querySelector('#inputTarea');
const formulario = document.querySelector('.formulario');
const listaDeTareas = document.querySelector('.div-tareas');
const listaVacia = document.querySelector('.vacio');
const plantilla = document.querySelector('#tareaTemplate').content;
const buscar = document.querySelector('#buscar')







// Cargar las tareas del localStorage, si no hay ninguna tarea guardada previamente, empezamos con el array tareas vacío.
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Función para guardar las tareas en el localStorage.
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
} 

// Función para agregar una tarea al DOM.
function agregarTarea(texto) {
    //creamos el clon de la plantilla para poder insertarla
    const clon = plantilla.cloneNode(true);
    clon.querySelector('.tareaTexto').textContent = texto;
    clon.querySelector('.borrar').addEventListener('click', () => {
        eliminarTarea(texto);
    });
    listaDeTareas.appendChild(clon);
    actualizarListaVacia();
}

function eliminarTarea(texto) {
    // Recorrer todas las tareas
    for (let i = 0; i < tareas.length; i++) {
        // Si encontramos la tarea que queremos eliminar
        if (tareas[i] === texto) {
            // Eliminar la tarea usando splice
            tareas.splice(i, 1);
            // Salir del bucle porque ya hemos eliminado la tarea
            break;
        }
    }

    // Guardar las tareas actualizadas
    guardarTareas();

    // Actualizar la interfaz de usuario
    renderizarTareas();
}

// Función para renderizar todas las tareas desde el array.
function renderizarTareas() {
    listaDeTareas.innerHTML = '';
    tareas.forEach(tarea => agregarTarea(tarea));
}

// Función para actualizar el mensaje de "No hay tareas pendientes".
function actualizarListaVacia() {
    if (tareas.length === 0) {
        listaVacia.style.display = 'block';
    } else {
        listaVacia.style.display = 'none';
    }
}

buscar.addEventListener('keyup', ()=>{
    let caracter = buscar.value.trim()
    buscando(caracter)
})


const buscando = (cadena)=>{
    let busqueda = Array.from(listaDeTareas.children)
    busqueda
        .filter(texto => !texto.textContent.toLowerCase().includes(cadena))                   
        .forEach(busquedaFiltrada => {
            busquedaFiltrada.classList.add('textoBlock')
        })
    busqueda
        .filter(texto => texto.textContent.toLowerCase().includes(cadena))                   
        .forEach(busquedaFiltrada => {
            busquedaFiltrada.classList.remove('textoBlock')
        })
}









// Event listener para el formulario de agregar tareas.
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto = inputTarea.value.trim();

    if (texto !== "") {
        tareas.push(texto);
        guardarTareas();
        agregarTarea(texto);
        inputTarea.value = "";
    } else {
        Toastify({

            text: "Por favor Ingrese una tarea",
            position: "center",
            duration: 2000
            
            }).showToast();
    }
});

// Renderizar las tareas al cargar la página.
renderizarTareas();













