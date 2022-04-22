window.addEventListener('load', function() {
    
    /*----------------------------ELMINANDO FECHAS DE RECOGIDA  EN FECHA DE DEVOLUCION ------*/
    
    let pickup_date = document.querySelector('.pickup_date')
    

    pickup_date.addEventListener('change',function() {
      
        let dropoff_minDate = new Date(pickup_date.value);
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
        console.log(dropoff_minDate);

        let dropoff_date = document.querySelector('.dropoff_date');

        dropoff_date.setAttribute('min',dropoff_minDate);

    })

})