window.addEventListener('load', function() {

    let formulario = document.querySelector('form.delete');

    console.log(formulario);

    formulario.addEventListener('submit', function(event) {
        
        let confirmacion = confirm('esta seguro de eliminar este usuario?');
            
            if(confirmacion == false) {
                event.preventDefault();

            }
        })

    
})