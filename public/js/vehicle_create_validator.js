window.addEventListener('load', function() {
    
    


    /*---------------------------VALIDACIONES FILTRO DE BUSQUEDA-------------------------------------*/

    
    let filtro = document.querySelector('form.formulario-producto');

    let errors_list = document.querySelector('form ul.errors_create');
    errors_list.style.color = 'red';
    errors_list.innerHTML = "<div></div>";

    if(document.querySelector("p.error") != undefined) {
        var error_back = document.querySelector("p.error");

    }

    console.log(filtro);


    filtro.addEventListener('submit', function(event) {

        
      
        errors_list.innerHTML = "<div></div>";
                
        let errors = [];

        let name = document.querySelector('input#name');

        if(name.value == '') {
            errors.push('Debe ingresar un nombre');
        }

        let plate_number = document.querySelector('input#plate_number');

        if(plate_number.value == '') {
            errors.push('Debe ingresar un numero de placa');

        
        } else if(plate_number.value.length > 18) {
            errors.push('El numero de placa debe tener un maximo de 19 caracteres')
        }

        let brand = document.querySelector('select#brands');
        

        if(brand.value == 'Marca del vehiculo') {
            errors.push('Debe seleccionar una marca para el vehiculo');
        }

        let category = document.querySelector('select#category');

        if(category.value == 'Categoria de vehiculo') {
            errors.push('Debe seleccionar una categoria de vehiculo');
        }

        let seat_number = document.querySelector('input#seat_number');

        if(seat_number.value == '') {
            errors.push('Debe ingresar un numero de asientos');

        
        } else if(seat_number.value > 100) {
            errors.push('El numero de asientos debe ser como maximo 100')
        }


        let fuel = document.querySelector('select#fuel');
        

        if(fuel.value == 'Tipo de combustible') {
            errors.push('Debe seleccionar el tipo de combustible');
        }

        let transmission = document.querySelectorAll('input.transmission');
        let condicion = false;

        for(i of transmission) {
            if(i.checked) {
                condicion = true;
                break;
            }
        }

        if(condicion == false) {
            errors.push('Debe seleccionar el tipo de transmision');
        }

        let pricexday = document.querySelector('input#pricexday');

        if(pricexday.value == '') {
            errors.push('Debe ingresar un precio al vehiculo');
        }

        let city = document.querySelector('select#city');
        

        if(city.value == 'Ciudad') {
            errors.push('Debe seleccionar una ciudad para el vehiculo');
        }


        if(errors.length > 0) {

            event.preventDefault();

            for(i of errors) {

                errors_list.innerHTML += "<li>" +  i + "</li>";
            }
            if(typeof error_back != 'undefined') {
                error_back.innerHTML = "<p></p>";   
            }
              
        } else {

            localStorage.setItem('create','ok');
        } 
        
    })
    
})