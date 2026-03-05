const sections = document.querySelectorAll('.slide');

function reveal(){

sections.forEach(section => {

const windowHeight = window.innerHeight;

const revealTop = section.getBoundingClientRect().top;

const revealPoint = 120;

if(revealTop < windowHeight - revealPoint){

section.classList.add('show');

}

});

}

window.addEventListener('scroll', reveal);