window.addEventListener('load', function () {


    let update = document.querySelector('form#update');

    update.addEventListener('submit', function (e) {

        e.preventDefault();

        localStorage.setItem('update','ok');

        update.submit();



    })



})