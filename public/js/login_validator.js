

window.addEventListener('load', function() {
    
    


    /*---------------------------VALIDACIONES FILTRO DE BUSQUEDA-------------------------------------*/

    
    let filtro = document.querySelector('form.formulario-register');

    let errors_list = document.querySelector('form ul#errors_login');
    errors_list.style.color = 'red';
    errors_list.innerHTML = "<div></div>";

    let error_back = document.querySelector("p.error");


    filtro.addEventListener('submit', function(event) {
        
        
        errors_list.innerHTML = "<div></div>";
        console.log(errors_list);

                
        let errors = [];

        let email = document.querySelector('input#email');
        var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let password = document.querySelector('input#password');


        if(email.value == '') {
            errors.push('Debe ingresar su cuenta de email');
        } else if(!(expReg.test(email.value))) {
            errors.push('Debe ingresar un email valido');
        }

        

        if(password.value == '') {
            errors.push('Debe ingresar una contraseña');
        }  

        if(errors.length > 0) {

            event.preventDefault();

            for(i of errors) {

                errors_list.innerHTML += "<li>" +  i + "</li>";
                console.log(errors_list);

            }
            error_back.innerHTML = "<p></p>";      
        } 
        
    })
    
})