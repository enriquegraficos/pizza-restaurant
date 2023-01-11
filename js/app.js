window.onload = function(){
    
    const menuBtn=document.querySelector('.hamburger');
    const menuMobile=document.querySelector('.menu-mobile');
   
    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('is-active');
        menuMobile.classList.toggle('is-active');

    });
}


// variables 

const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaMenu = document.querySelector('.container-cards');
let itemsCarrito = []; // carrito vacio

cargarEventsListeners();
function cargarEventsListeners(){
    // add item push "agregar al carrito"
    listaMenu.addEventListener('click', agregarItem);

    // Elimina items del carrito
    carrito.addEventListener('click', eliminarItem);

    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        itemsCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}




// functions

function agregarItem(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const itemSeleccionado =e.target.parentElement;
        
        leerDatosItem(itemSeleccionado);
    }
}

// Eliminar items del carrito
    function eliminarItem(e){
       
        if(e.target.classList.contains('borrar-item')){
           const itemId = e.target.getAttribute('data-id'); // obtener el id del item que deseamos eliminar

           //Elimina del arreglo de items carrito por el data id
           itemsCarrito = itemsCarrito.filter( item => item.id !== itemId);
           // filter es para acceder !== exepto al que estamos dandole boton de eliminar

           carritoHTML();
        }
    }

// read content HTML that give clic and extrae la información del curso

function leerDatosItem(item){
    // console.log(item)

    //creamos un objeto con el contenido del item actual

    const infoItem = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('h3').textContent,
        descripcion: item.querySelector('p').textContent,
        precio: item.querySelector('span').textContent,
        id: item.querySelector('button').getAttribute('data-id'),
        cantidad: 1

    }

    // Revisa si un elemento ya existe en el carrito
    // some permite iterar sobre un arreglo de objetos

    const existe = itemsCarrito.some( item => item.id === infoItem.id);
    if(existe){
        // actualizamos la cantidad
        // map crea un nuevo arreglo
        const items = itemsCarrito.map(item => {
            if (item.id === infoItem.id){
                item.cantidad++;
                return item; // retorna el objeto actualizado
            }
            else{
                return item; // retorna los objetos que no son duplicados
            }
        });
        itemsCarrito = [...items]
    }else{
        // agrega elementos al arreglo del carrito
        itemsCarrito =[...itemsCarrito, infoItem]; // copia del carrito de compras y agregamos el info item
    }

    // agrega elementos al arreglo
   

    console.log(itemsCarrito);
    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML(){
    // Limpiar el HTML

    limpiarHTML();

    // Recorre el carrito y genera el HTML
    itemsCarrito.forEach( item => {
        const row = document.createElement('tr'); // creamos una etiqueta
        row.innerHTML = `
        <td>
            <img src="${item.imagen}" width="100"class="img-carrito">
        </td>
        <td>
            ${item.titulo}
        </td>
        <td>
            ${item.precio}
        </td>
        <td>
            ${item.cantidad}
        </td>
        <td>
       
            <a href="#" class="borrar-item" data-id="${item.id}">x</a>
        </td>
        `;
        // agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row); // agregamos cada row en cada iteración
    });
}


// Eliminar los curso del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = ''; // forma lenta
   
    // forma optima es que elimina los hijos
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}