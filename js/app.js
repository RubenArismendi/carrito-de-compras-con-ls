//definir las variables o selectores 

const carrito = document.getElementById("carrito");
const listaCursos=document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListener();
//definir los eventos o listeners
function cargarEventListener(){
    //click al boton de agregar al carrito 
    listaCursos.addEventListener("click",agregarcurso);
    //elimina un curso del carrito
    carrito.addEventListener("click",eliminarCurso);
    
    vaciarCarritoBtn.addEventListener("click",()=>{
        articulosCarrito=[];
        vaciarCarrito()
    })
}
//definir las funciones a utilizar 

function agregarcurso(e){
    e.preventDefault();
    //console.log("ingrese a la funcion agregar curso")
    if(e.target.classList.contains("agregar-carrito")){
        let curso = e.target.parentElement;
        leerDatosCurso(curso);
    }
    sincronizarCurso()
}

function eliminarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        const existe = articulosCarrito.some(cursos => cursos.id === cursoId);

        if(existe){
            const curso = articulosCarrito.map(curso =>{
                if( curso.id === cursoId){
                    if(curso.cantidad > 1){
                        curso.cantidad--;
                        return curso;
                    }else{
                        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
                        return curso;
                    }
                }
            })
        }
        carritoHTML();
        sincronizarCurso()
    }
}

function vaciarCarrito(){
    //forma lenta
    //contenedorCarrito.innerHTML ='';

    //forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function leerDatosCurso(curso){
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute('data-id'),
        cantidad:1
    }
    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id=== infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito =[...cursos]
    }else{
        articulosCarrito =[...articulosCarrito,infoCurso];
    }

   // console.log(articulosCarrito)
    carritoHTML();
}

function carritoHTML(){
    vaciarCarrito();
    articulosCarrito.forEach(cursos =>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${cursos.imagen}" width=100>
            </td>
            <td>
                ${cursos.titulo}
            </td>
            <td>
                ${cursos.precio}
            </td>
            <td>
                ${cursos.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${cursos.id}">x</a>
            </td>
            `

        contenedorCarrito.appendChild(row);

        console.log(articulosCarrito)
    })
}

//agregar curso a local storage

document.addEventListener('DOMContentLoaded',()=>{
    cursos=JSON.parse(localStorage.getItem('cursos'))
    
    if(cursos){
        articulosCarrito=cursos
        carritoHTML()
    }
    
})

function sincronizarCurso(){
    localStorage.setItem('cursos',JSON.stringify(articulosCarrito))|| []

}