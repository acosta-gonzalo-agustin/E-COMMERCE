window.addEventListener('load', function() {

    let formulario = document.querySelectorAll('form.eliminar');

    console.log(formulario);

    for(i of formulario) {

        i.addEventListener('submit', function(event) {
            let confirmacion = confirm('esta seguro de eliminar este vehiculo?');
            
            if(confirmacion == false) {
                event.preventDefault();

            }
        })

    }
    
})