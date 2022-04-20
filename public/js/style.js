window.addEventListener('load', function() {
    
    let modal = document.querySelector('.modal');
    console.log(modal);

    modal.addEventListener('click',function() {
        modal.classList.remove('fade', 'in');
    })

})