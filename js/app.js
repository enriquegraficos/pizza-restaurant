window.onload = function(){
    
    const menuBtn=document.querySelector('.hamburger');
    const menuMobile=document.querySelector('.menu-mobile');
   
    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('is-active');
        menuMobile.classList.toggle('is-active');

    });
}