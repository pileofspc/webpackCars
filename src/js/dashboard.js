import '../assets/sass/dashboard.sass'
require.context('../assets/img/dashboard/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);


// 

// Notification bell
let unreadBellPath = '/assets/img/notification-bell_active.svg';
let bellPath = '/assets/img/notification-bell.svg';

let unreadNotifications = true;

if (unreadNotifications) {
    let bell = document.querySelector('.notification-bell__img');
    bell.setAttribute('src', unreadBellPath)
} else {
    let bell = document.querySelector('.notification-bell__img');
    bell.setAttribute('src', bellPath)
}