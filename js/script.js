// Variables HTML
const enviarBtn = document.querySelector('.boton-enviar');
const vaciarBtn = document.querySelector('.boton-vaciar');
const destinatario = document.querySelector('#destinatario');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('FORM');

// Variables JS
let cantErroresAsunto = 0;
let cantErroresMensaje = 0;
let cantErroresEmail = 0;
let asuntoValidado = false;
let mensajeValidado = false;
let emailValidado = false;

// Cargar eventos
eventListener();
function eventListener(){
    // Envento para cuando termina de cargar la página
    document.addEventListener('DOMContentLoaded', desabilitarEnviarBtn);

    // Enventos para los inputs
    destinatario.addEventListener('blur', validarDestinatario);
    asunto.addEventListener('blur', validarAsunto);
    mensaje.addEventListener('blur', validarMensaje);

    // Evento para le botón vaciar
    vaciarBtn.addEventListener('click', reiniciarFormulario);
}

// Funciones
function desabilitarEnviarBtn(){
    enviarBtn.disabled = true;
    enviarBtn.classList.remove('boton-enviar-enabled');
    enviarBtn.classList.add('boton-enviar-disabled');
}

function validarAsunto(event){
    if(event.target.value.length === 0 && cantErroresAsunto === 0){
        mostrarError(event.target, 'Campo obligatorio');
        cantErroresAsunto++;
        asuntoValidado = false;
    }else if(event.target.value.length === 0 && cantErroresAsunto !== 0){
        asuntoValidado = false;
    }else if(event.target.value.length > 0 && cantErroresAsunto !== 0){
        borrarError(event.target.parentElement);
        cantErroresAsunto--;
        asuntoValidado = true;
    }else{
        asuntoValidado = true;
    }

    validarTodo();
}

function validarMensaje(event){
    if(event.target.value.length === 0 && cantErroresMensaje === 0){
        mostrarError(event.target, 'Campo obligatorio');
        cantErroresMensaje++;
        mensajeValidado = false;
    }else if(event.target.value.length === 0 && cantErroresMensaje !== 0){
        mensajeValidado = false;
    }else if(event.target.value.length > 0 && cantErroresMensaje !== 0){
        borrarError(event.target.parentElement);
        cantErroresMensaje--;
        mensajeValidado = true;
    }else{
        mensajeValidado = true;
    }

    validarTodo();
}

function validarDestinatario(event){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if(!regex.test(event.target.value) && cantErroresEmail === 0){
        mostrarError(event.target, 'Email inválido');
        cantErroresEmail++;
        emailValidado = false;
    }else if(!regex.test(event.target.value) && cantErroresEmail !== 0){
        emailValidado = false;
    }else if(regex.test(event.target.value) && cantErroresEmail !== 0){
        borrarError(event.target.parentElement);
        cantErroresEmail--;
        emailValidado = true;
    }else{
        emailValidado = true;
    }

    validarTodo();
}

function mostrarError(input, mensaje){
    // Cambiando estilos del campo
    input.classList.add('campo-error');

    // Creando párrafo
    const parrafo = document.createElement('P');
    parrafo.textContent = mensaje;
    parrafo.classList.add('mensaje-error');

    // Agregar párrafo
    input.parentElement.appendChild(parrafo);
}

function borrarError(elementoPadre){
    elementoPadre.removeChild(elementoPadre.lastElementChild);
    elementoPadre.lastElementChild.classList.remove('campo-error');
}

function validarTodo(){
    if(asuntoValidado && mensajeValidado && emailValidado){
        enviarBtn.disabled = false;
        enviarBtn.classList.remove('boton-enviar-disabled');
        enviarBtn.classList.add('boton-enviar-enabled');
    }else{
        desabilitarEnviarBtn();
    }
}

function reiniciarFormulario(event){
    event.preventDefault();
    destinatario.value = '';
    asunto.value = '';
    mensaje.value = '';
    cantErroresAsunto = 0;
    cantErroresMensaje = 0;
    cantErroresEmail = 0;
    asuntoValidado = false;
    mensajeValidado = false;
    emailValidado = false;
    desabilitarEnviarBtn();
}