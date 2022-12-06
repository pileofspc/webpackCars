import '../assets/sass/dashboard.sass'
import '../assets/img/logo.svg'
require.context('../assets/img/icons/', false, /\.svg$/);

// let navLinks = document.querySelectorAll('.nav__link');

// for (let navLink of navLinks) {
//     let imgName = navLink.textContent.replace(' ', '').toLowerCase();
//     navLink.children[0].src = `assets/img/${imgName}_icon.svg`;
    
//     if (navLink.href === window.location.href) {
//         navLink.classList.add('current')
//     }
// }