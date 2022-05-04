window.addEventListener('load', function() {

    let formulario = document.querySelector('form.eliminar');

    

    console.log(formulario);

    formulario.addEventListener('submit',function(e) {

        e.preventDefault();
        
        confirm("Esta seguro que desea eliminar el auto");

        alert("Hello! I am an alert box!!");
    })
    
})