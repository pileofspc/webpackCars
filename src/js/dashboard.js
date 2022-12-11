"use strict"

import '../assets/sass/dashboard.sass'
// import '../assets/less/dashboard.less'
require.context('../assets/img/dashboard/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);

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