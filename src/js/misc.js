import global from './global'

// Notification bell
let unreadBellPath = 'assets/img/notification-bell_active.svg';
let bellPath = 'assets/img/notification-bell.svg';

if (global.database.unreadNotifications) {
    let bell = document.querySelector('.notification-bell__img');
    bell.setAttribute('src', unreadBellPath)
} else {
    let bell = document.querySelector('.notification-bell__img');
    bell.setAttribute('src', bellPath)
}


// Это нужно чтобы при изменении размеров окна тултип не уезжал за пределы экрана
window.addEventListener('resize', (evt) => {
    global.tooltip.style.top = '';
    global.tooltip.style.left = ''
    global.tooltip.style.visibility = 'hidden'
})