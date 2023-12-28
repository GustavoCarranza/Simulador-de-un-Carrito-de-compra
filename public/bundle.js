'use strict';

const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');

//Colores de tenis, creamos una variable usando de referencia la variable producto el cual tiene el id del div general de todos los elementos y solo le pasamos el id del contendor de los 3 botones de los tenis de colores
const coloresTenis = producto$1.querySelector('#propiedad-color');

//Contador para incrementar y disminuir la cantidad de tennis
const botonIncrementar = producto$1.querySelector('#incrementar-cantidad');
const botonDisminuir = producto$1.querySelector('#disminuir-cantidad');
const cantidadInput = producto$1.querySelector('#cantidad');

thumbs.addEventListener('click', (e) =>{
    //validamos con un if ah que elemento le estamos dando click dentro del contenedor, como una tipo validacion ya que si no hacemos esto, al dar click fuera de la imagen el evento lo va a permitir 
    if(e.target.tagName === 'IMG'){
        //creamos una variable para acceder al nombre de la ruta de la imagen
        const imagenSrc = e.target.src;
        //creamos otra varibale donde utilizaremos la funcion lastIndexOf para cortar la ultima diagonal de la ruta la cual contiene el nombre de la imagen
        const lastIndex = imagenSrc.lastIndexOf('/');
        //creamos una mas para cortar la ultima diagonal y solo nos muestre el noembre para ello utilizamos la propeudad de substring
        const nombreImagen = (imagenSrc.substring(lastIndex + 1));
        //la variable de nombreimagen la vamos a utilizar para reemplazar la imagen del preview de la tienda, cuando seleccionemos una imagen pequeña se va a poder cambiar en el preview
        //Lo que hacemos es mandar a llamar la variable de productoImagen en que tenemos almacenada un selector que tiene la clase de la imagen del preview y solo abrimos los batrix con la ruta de la carpeta donde estan las imagen y le pasamos la variable nombreImagen para que sea dinamica y se vayan cambiando
        productoImagen.src = `./img/tennis/${nombreImagen}`;
    }
});

//mandamos a traer a la variable creada y le añadimos un evento de tipo click y mandamos a llamar al evento, validamos que solo cuando demos click en el boton solo muestro informacion del boton para ello llamamos al evento y con target podemos ver que es a lo que le estamos dando click, accedemos al nombre con tagname y con un if le decimos que solo queremos que el evento aplique a todo lo que tendo nombre 'INPUT' ahora sobreexcribimos productoImagen que es una variable que ya esta declarada y llamamos a la ruta de las imagenes reescribiendo la ruta con el evento el nombre y el value a reemplazar de manera dinamica
coloresTenis.addEventListener('click', (e) => {
    if(e.target.tagName === 'INPUT'){
       productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
    }
});

//Eventos para los boton de cantidad
botonDisminuir.addEventListener('click', (e) => {
    if(parseInt(cantidadInput.value) > 1){
        cantidadInput.value = parseInt(cantidadInput.value) - 1;
    }
});

botonIncrementar.addEventListener('click', (e) => {
    cantidadInput.value = parseInt(cantidadInput.value) + 1  ;
    
});

var data = {
    productos: [
        {
            id: '1',
            nombre: 'Tennis Converse Standard.',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 500.0,
            color: ['negro','rojo','amarillo'],
            sizes: ['1.5','2','2,5','3','4'], 
        },
        {
            id: '2',
            nombre: 'Tennis Converse 2000.',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 450.0,
            color: ['negro','rojo','amarillo'],
            sizes: ['1.5','2','2,5','3','4'], 
        },
        {
            id: '3',
            nombre: 'Tennis Converse 21000.',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 1500.0,
            color: ['negro','rojo','amarillo'],
            sizes: ['1.5','2','2,5','3','4'], 
        }
    ]
};

const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const ventanaCarrito = document.getElementById('carrito');
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
const producto = document.getElementById('producto');
let carrito = []; 
const formatearDinero = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'});
const notificacion = document.getElementById('notificacion');

//Ventana modal para abrir carrito
const renderCarrito = () =>{
    ventanaCarrito.classList.add('carrito--active');

    //Aqui creamos una variable en donde la instanciamos con la variable de ventanaCarrito que tiene el id carrito y le decimos a traves de un queryselectorAll que queremos acceder a todos los elementos que tienen la clase carrito__producto
    const productosAnterior = ventanaCarrito.querySelectorAll('.carrito__producto');
    //Con un foreach vamos a llamar a producto para ir removiendo y evitando que cada vez que se abra el carrito duplique el producto
    productosAnterior.forEach(producto => producto.remove());

    let total = 0;

    //comprobar si hay productos en el carrito
    if(carrito.length < 1){
        //ponemos la clase del carrito vacio
        ventanaCarrito.classList.add('carrito--vacio');
    }else {
        //eliminamos la clase de carrito vacio una vez que la condicion apunte en else 
        ventanaCarrito.classList.remove('carrito--vacio');

         //Mandamos a llamar la variable carrito la cual tiene un arreglo vacio y le agregamos un foreach para ir agrrgando los productos con la informacion de manera dinamica
        carrito.forEach((productoCarrito) =>{
        //Obtenemos la informacion de la BD simulada en el archivos productos.js accedemos mediante un forEach y le damos un alias para identificarlo, colocamos un condicional para tratar comparar si el id que esta en la BD es igual al id del Item carrito va a agregar el precio correspondiente a ese id
        data.productos.forEach((productoBaseDatos) =>{
            if(productoBaseDatos.id === productoCarrito.id){
                productoCarrito.precio = productoBaseDatos.precio;

                total += productoBaseDatos.precio * productoCarrito.cantidad;
            }
        });
        //Establecemos la ruta de la imagen par utilizarla de manera dinamica en el carrito 
        let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
        if(productoCarrito.color === 'rojo'){
            thumbSrc = './img/thumbs/rojo.jpg';
        }else if(productoCarrito.color === 'amarillo'){
            thumbSrc = './img/thumbs/amarillo.jpg';
        }
        const plantillaProducto = `
    <div class="carrito__producto-info">
        <img src="${thumbSrc}" alt="" class="carrito__thumb" />
            <div>
                <p class="carrito__producto-nombre">
                    <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                </p>
                <p class="carrito__producto-propiedades">
                    Tamaño:<span>${productoCarrito.size}</span> Color:<span>${productoCarrito.color}</span>
                </p>
            </div>
    </div>
    
    <div class="carrito__producto-contenedor-precio">
        <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                />
            </svg>
        </button>
            <p class="carrito__producto-precio">${ formatearDinero.format(productoCarrito.precio * productoCarrito.cantidad) }</p>
    </div>
        `;

        //Creamos un nuevo div 
        const itemCarrito = document.createElement('div');
        //llamamos a la variable y accedemos a su lista de clases y le añadimos la clase carrito__producto que es el div general de esa seccion
        itemCarrito.classList.add('carrito__producto');
        //Aqui lo que hacemos es especificar y mandar a llamar la plantilla HTML que queremos insertar en el div que estamos creamos en este caso es plantillaProducto
        itemCarrito.innerHTML = plantillaProducto;
        //Ahora para agregar nuestro div declarado en itemCarrito vamos a llamar la variable ventanaCarrito la cual contiene el id principa y le dicemos que queremos acceder con un queryselector al div con la clase .carrito__body y le agregar un .appendChild para mandar a llamar a nuestro div con itemCarrito
        ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
        });
    }

    ventanaCarrito.querySelector('.carrito__total').innerText = formatearDinero.format(total); 
};

//abrir carrito
botonesAbrirCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) =>{
        //Mandamos a atraer la funcion de rendercarrito donde tiene almacenada la funcion para abrir la ventana modal una vez dando click al enlace  
        renderCarrito();
    });
});

//Cerrar ventana modal
botonesCerrarCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) =>{
        //Sin necesidad de llamar a una funcion reutilizamos la variable ventanaCarrito que tiene almacenado el id del contenedor de la venta y solo aplicamos un remove para cerrar la ventana
        ventanaCarrito.classList.remove('carrito--active');
    });
});

//Mandamos a llamar a la variable btnAgregarCarrito que declaramos al principio que tiene almacenado el id del boton y le agregar un evento de tipo click para que funcione y aplique el codigo que vayamos insertando en el evento
btnAgregarCarrito.addEventListener('click', (e) =>{
    //Declaramos variables y lo instanciamos con la variable de producto que contiene el id del contenedor general y mandamos los identificamos con el id de cada div para obtener sus valores
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre');
    const cantidad = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const size = producto.querySelector('#propiedad-tamaño input:checked').value;
    

    if(carrito.length > 0){
        let productoEnCarrito = false;
        carrito.forEach(item =>{
            if(item.id === id && item.nombre === nombre && item.color === color && item.size === size){
                item.cantidad += cantidad; 
                productoEnCarrito = true;
            }
        });
        if(!productoEnCarrito){
            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                size: size,
            });
        }
    }else {
        //Creamos un objeto mandando a llamar las variables declaradas
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            size: size,
        });
    }

    //Establecemos la ruta de la imagen que queremos mostrar
    let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
    if(color === 'rojo'){
        thumbSrc = './img/thumbs/rojo.jpg';
    }else if(color === 'amarillo'){
        thumbSrc = './img/thumbs/amarillo.jpg';
    }
    notificacion.querySelector('img').src = thumbSrc;
    //mostramos la nofiticacion
    notificacion.classList.add('notificacion--active');
    //Ocultamos la notificacion
    setTimeout(() =>{
        notificacion.classList.remove('notificacion--active');
    }, 3000);

});

//Botones de eliminar del carrito
//Aqui estamos mandando a llamar a ventanacarrito que es el contenedor de la ventana modal donde nos muestra los productos una vez agregados y le agregamos un evento de tipo click 
ventanaCarrito.addEventListener('click', (e) =>{
    //Creamos un condicional para identificar al boton de eliminar que tiene cada producto, con target accedemos al elemento y con la propiedad closest identificamos que sea un boton y en el codigo HTML cada boton es identificado por un data-accion que se puede referir como un id
    if(e.target.closest('button') ?.dataset.accion == 'eliminar-item-carrito'){

        const producto = e.target.closest('.carrito__producto');
        const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);
        
        carrito = carrito.filter((item, index) => {
            if(index !== indexProducto){
                return item;
            }     
         });

         renderCarrito();
    }
});

//Simulacion para mandar una alerta de pedido enviado
ventanaCarrito.querySelector('#carrito__btn-comprar').addEventListener('click', () =>{
    Swal.fire(
        'Compra realizada!',
        'Click para continuar!',
        'success'
      );
      ventanaCarrito.classList.remove('carrito--active');
});

class Tabs{
    constructor(idElemento){
        this.tabs = document.getElementById(idElemento);
        this.nav = this.tabs.querySelector('.tabs');

        this.nav.addEventListener('click', (e) => {
            if([...e.target.classList].includes('tabs__button')){
                //Obtenemos la tab que queremos mostrar
                const tab = e.target.dataset.tab;


                //quitamos la clase activa de alguna otra tabs que la tengan
                if(this.tabs.querySelector('.tab--active')){
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }
                if(this.tabs.querySelector('.tabs__button--active')){
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }
                //agregamos la clase activa al tab
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');
                //agregamos la clase active al boton
                e.target.classList.add('tabs__button--active');
            }
        });
    }
}

new Tabs('mas-informacion');
