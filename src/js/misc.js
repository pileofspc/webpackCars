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