window.addEventListener('load', function() {


    /*----------------------------DELIMITANDO FECHA DE DEVOLUCION FILTRO ------------------- */
    
    let pickup_date_limit = document.querySelector('input.pickup_date')
    

    pickup_date_limit.addEventListener('change',function() {
        
      
        let dropoff_minDate = new Date(pickup_date_limit.value);
        dropoff_minDate.setDate(dropoff_minDate.getDate() + 2);

        let year = dropoff_minDate.getFullYear();
        let day = dropoff_minDate.getDate();
        let month = dropoff_minDate.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        dropoff_minDate = year + '-' + month + '-' + day;
        

        let dropoff_date = document.querySelector('.dropoff_date');

        dropoff_date.setAttribute('min',dropoff_minDate);

    })



    /*---------------------------VALIDACIONES FILTRO DE BUSQUEDA-------------------------------------*/

    
    
    let filtro = document.querySelector('form.formulario');


    filtro.addEventListener('submit', function(event) {

        let errors = [];

        let pickup_city = document.querySelector('select.pickup_city');
        let dropoff_city = document.querySelector('select.dropoff_city');
        let pickup_date = document.querySelector('input.pickup_date');
        let dropoff_date = document.querySelector('input.dropoff_date');
        let pickup_time = document.querySelector('input.pickup_time');
        let dropoff_time = document.querySelector('input.dropoff_time');

       


        if(pickup_city.value == 'Ciudad retiro') {
            errors.push('Debe seleccionar una ciudad de retiro');
        }

        if(dropoff_city.value == 'Ciudad devolución') {
            errors.push('Debe seleccionar una ciudad de devolucion');
        }

        if(pickup_date.value == '') {
            errors.push('Debe seleccionar una fecha de retiro');
        }

        if(dropoff_date.value == '') {
            errors.push('Debe seleccionar una fecha de devolucion');
        }

        if(pickup_time.value == '') {
            errors.push('Debe seleccionar una hora de retiro');
        }

        if(dropoff_time.value == '') {
            errors.push('Debe seleccionar una hora de devolucion');
        }

        if(errors.length > 0) {

            event.preventDefault();

            let errors_list = document.querySelector('form ul#errors');
            for(i of errors) {

                errors_list.innerHTML += "<li>" +  i + "</li>";
            }

        }      
    })


    

    
  

})