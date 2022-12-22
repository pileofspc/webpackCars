import global from './dashboard_global'

// Notification bell
let unreadBellPath = '/assets/img/notification-bell_active.svg';
let bellPath = '/assets/img/notification-bell.svg';

if (global.database.unreadNotifications) {
    let bell = document.querySelector('.notification-bell__img');
    bell.setAttribute('src', unreadBellPath)
} else {
    let bell = document.querySelector('.notification-bell__img');
    bell.setAttribute('src', bellPath)
}


// Ховер эффекты
let grids = document.querySelectorAll('.grid_meter');
let currentGridActive = grids[0];
currentGridActive.classList.add('grid_active');

for (let grid of grids) {
    grid.addEventListener('mouseover', () => {
        currentGridActive.classList.remove('grid_active');
        grid.classList.add('grid_active');
        currentGridActive = grid;
    })
}