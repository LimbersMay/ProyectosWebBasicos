
// Lógica de toda la aplicación 

// Función para crear un elemento de la lista
const crearItemMenu = (nombre) => {
    const li = document.createElement('li');
    li.textContent = nombre;

    return li;
}

// Función para tachar el texto 
const tacharElemento = (event) => {

    // Si el elemento ya esta tachado, lo quitamos
    let elemento = event.target.classList;

    if (elemento.contains('tachado')) {
        elemento.remove('tachado');

        return;
    }
    
    // Si el elemento no tiene la clase de tachado lo tachamos
    event.target.classList.add('tachado');
};

// Recuperamos el botón de agregar
const botonAgregar = document.getElementById('boton-agregar-tarea');

botonAgregar.addEventListener('click', () => {

    // Cuando el usuario seleccione agregar, obtenemos la lista que contiene las tareas
    const listaElementos = document.getElementById('lista-ordenada');

    // Obtenemos el input del usuario 
    const inputElemento = document.getElementById('input-tarea');

    // Agregamos el elemento a la lista
    const elementoLista = crearItemMenu(inputElemento.value);

    // Borramos el mensaje de creación exitosa
    const mensajeContenedor = document.getElementById('mensaje-contenedor');

    if (mensajeContenedor.children.length != 0){
        mensajeContenedor.removeChild(mensajeContenedor.children.item(0));
    }
    

    // Agregamos eu evento a la lista
    elementoLista.addEventListener('dblclick', tacharElemento);

    listaElementos.appendChild(elementoLista);
});


// FUNCIONES DE LOS BOTONES INFERIORES

// Botón de limpiar completados

const limpiarCompletados = () => {

    const listaOrdenada = document.getElementById('lista-ordenada');

    const elementosHijos = listaOrdenada.children;

    const listaTachados = [];

    for (let i = 0; i  < elementosHijos.length; i++) {
        
        // Para cada elemento, comprobamos si posee la clase de 'tachado'
        if (elementosHijos.item(i).classList.contains('tachado')) {
            listaTachados.push(elementosHijos.item(i));
        }
    }

    // Eliminamos los elementos
    listaTachados.forEach(elemento => {
        listaOrdenada.removeChild(elemento);
    });
};

// Asociamos la función al botón 
const botonLimpiarCompletados = document.getElementById('limpiar-completado');

botonLimpiarCompletados.addEventListener('click', limpiarCompletados);


// Botón de vaciar lista
const vaciarLista = () => {
    // Recuperamos el elemento de la lista ordenada
    const listaOrdenada = document.getElementById('lista-ordenada');

    // Vaciamos todos los elementos
    while(listaOrdenada.hasChildNodes()) {
        listaOrdenada.removeChild(listaOrdenada.lastChild);
    }
};

// Recuperamos el botón de vaciar lista para relacionar su evento
const limpiarLista = document.getElementById('limpiar-lista');

limpiarLista.addEventListener('click', vaciarLista);

// Botón de guardar lista

// Función para crear un elemento p para el mensaje
const crearElementoPBold = (nombre) => {

    const n = document.createElement('b');
    const p = document.createElement('p');
    
    // Le agregamos el texto y se lo introducimos al elemento b <bold>
    p.textContent = nombre;
    n.appendChild(p);

    return n;
};

const guardarLista = () => {

    const mensaje = 'La tarea se guardó exitosamente..!!';
    const elementoPBold = crearElementoPBold(mensaje);

    // Recupermamos el contenedor
    const mensajeContenedor = document.getElementById('mensaje-contenedor');

    mensajeContenedor.appendChild(elementoPBold);
};

// Recuperamos el botón de guardar
const guardar = document.getElementById('guardar-lista');

guardar.addEventListener('click', guardarLista);