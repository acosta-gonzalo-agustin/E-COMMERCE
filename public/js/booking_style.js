/*----------------------------CALCULO DEL PRECIO PRODUCTO ------------------- */

window.addEventListener('load', function () {

    let precioTotal = document.querySelector('span#precioTotal').textContent;
    let suma = Number(precioTotal.replace('$', ''));
    let total = this.document.querySelector('strong#total');
    let seguros = document.querySelectorAll('.seguro input');

    let additionals = document.querySelectorAll('.additionals input');

    for (i of additionals) {
        i.addEventListener('change', function (e) {
            if(e.target.checked) {
                suma += Number(e.target.value);
                console.log(suma);
                total.innerHTML = suma;
            }
            else {
                suma -= Number(e.target.value);
                total.innerHTML = suma;
                console.log(suma);

            }
        })

    }
    let option = 0;

    for (i of seguros) {
        console.log(option);
        i.addEventListener('change', function (e) {
            if(e.target.checked && option != e.target.value){
                suma -= option;
                suma += Number(e.target.value);
                option = Number(e.target.value);
                total.innerHTML = suma;
                console.log(suma);
                console.log(option);
            }
        })

    }

})