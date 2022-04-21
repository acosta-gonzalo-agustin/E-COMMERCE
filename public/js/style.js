window.addEventListener('load', function() {
    
    let modal = document.querySelector('#pickup_date');
    console.log(modal);

    modal.addEventListener('click',function() {
        modal.classList.remove('fade', 'in');
    })

})