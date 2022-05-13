window.addEventListener('load', function() {

    let reservado = document.querySelector('div#reservado');


    let formularios = document.querySelectorAll('form.eliminar');

    if(reservado.textContent.trim() == 'reservado') {
        swal("El vehiculo se encuentra con una reserva pendiente");
        reservado.innerHTML = '';

    }

    for(i of formularios) {

        i.addEventListener('submit', function(event) {
            let confirmacion = confirm('esta seguro de eliminar este vehiculo?');
            
            if(confirmacion == false) {
                event.preventDefault();

            } else {
                localStorage.setItem('delete','ok');
            }
        })

    }
    
})