/*----------------------------CALCULO DEL PRECIO PRODUCTO ------------------- */

window.addEventListener('load', function () {


    


    /*-----------------------------seleccion de elementos de la lista izquierda-----------------------------*/

    let precioTotal = document.querySelector('span#precioTotal').textContent;
    let suma = Number(precioTotal.replace('$', ''));
    let total = this.document.querySelector('strong#total');
    let seguros = document.querySelectorAll('.seguro input');
    let additionals = document.querySelectorAll('.additionals input');

    /*-----------------------------------seleccion de elementos formulario------------------------------------*/

    let additionalTotal = document.querySelector('span#additional').textContent;
    let suma_additional = Number(additionalTotal.replace('$', ''));
    let additional =  document.querySelector('span#additional');

    let seguroTag = document.querySelector('span#seguro').textContent;
    let suma_seguro = Number(seguroTag.replace('$', ''));
    let seguro =  document.querySelector('span#seguro');


    for (i of additionals) {
        i.addEventListener('change', function (e) {
            if (e.target.checked) {
                suma += Number(e.target.value);
                suma_additional += Number(e.target.value);
                total.innerHTML = suma;
                additional.innerHTML = suma_additional;
            }
            else {
                suma -= Number(e.target.value);
                suma_additional -= Number(e.target.value);
                total.innerHTML = suma;
                additional.innerHTML = suma_additional;

            }
        })

    }
    let option = 0;

    for (i of seguros) {
       
        i.addEventListener('change', function (e) {
            if (e.target.checked && option != e.target.value) {
                suma -= option;
                suma += Number(e.target.value);
                suma_seguro -= option;
                suma_seguro += Number(e.target.value);
                option = Number(e.target.value);
                total.innerHTML = suma;
                seguro.innerHTML = suma_seguro;
            }
        })

    }


    let booking = document.querySelector('form.booking');

    booking.addEventListener('submit',function(e) {

        e.preventDefault();

        localStorage.setItem('total',total);

        

        if(false == false) {
            booking.submit();
        }



    })

})