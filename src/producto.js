const producto = document.getElementById('producto');
const productoImagen = producto.querySelector('.producto__imagen');
const thumbs = producto.querySelector('.producto__thumbs');

//Colores de tenis, creamos una variable usando de referencia la variable producto el cual tiene el id del div general de todos los elementos y solo le pasamos el id del contendor de los 3 botones de los tenis de colores
const coloresTenis = producto.querySelector('#propiedad-color');

//Contador para incrementar y disminuir la cantidad de tennis
const botonIncrementar = producto.querySelector('#incrementar-cantidad');
const botonDisminuir = producto.querySelector('#disminuir-cantidad');
const cantidadInput = producto.querySelector('#cantidad');

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
       productoImagen.src = `./img/tennis/${e.target.value}.jpg`
    }
});

//Eventos para los boton de cantidad
botonDisminuir.addEventListener('click', (e) => {
    if(parseInt(cantidadInput.value) > 1){
        cantidadInput.value = parseInt(cantidadInput.value) - 1;
    }
})

botonIncrementar.addEventListener('click', (e) => {
    cantidadInput.value = parseInt(cantidadInput.value) + 1  ;
    
})