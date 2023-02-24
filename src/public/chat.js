const socketClient = io(); 

// elementos DOM:
const nameUser = document.querySelector('#user');
const chatForm = document.querySelector('#chatForm');
const inputMsg = document.querySelector('#chatField');
const inputBtn = document.querySelector('#chatBtn');
const chatBox = document.querySelector('#chat');

// sweet alert:
let usuario = null;

if(!usuario){
    Swal.fire({
        title : 'Ingresa tu nombre de Usuario',
        text: 'Para participar del chat deberás ingresar tu nombre.',
        input: 'text',
        inputValidator:(value)=>{
            if(!value){
                return 'Necesitas ingresar un Usuario'
            }
        }    
    })
    .then( username => {
        usuario = username.value;
        nameUser.innerText = usuario;
        socketClient.emit( 'newUser' , usuario )
    })
}

// form behavior:
chatForm.onsubmit = e => {
    e.preventDefault();

    const info = {
        nombre : usuario, 
        mensaje : inputMsg.value
    }
    socketClient.emit( 'mensaje' , info );
    inputMsg.value = '';
}

/* emito mensaje */
socketClient.on( 'chat' , infoMessages => {
    // console.log(infoMessages);

    const chatRender = infoMessages.map( Msg => {
        return `<p><strong>${Msg.nombre}: </strong>${Msg.mensaje}</p>`
    }).join( ' ' ); // join = para generar string completo.
    chatBox.innerHTML = chatRender;
})

socketClient.on( 'broadcast' , usuario => {
    Toastify({
        text: `${usuario} inició sesión`,
        duration: 5000,
        position: 'right',
        style: {
            background: "linear-gradient(to right, limegreen, green)",
        }
    }).showToast()
})