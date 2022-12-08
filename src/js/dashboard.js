"use strict"

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


// let grids = document.querySelectorAll('.grid_meter');
// let currentMeter = grids[0];
// for (let grid of grids) {
//     grid.addEventListener('click', () => {
//         for (let grid of grids) {
//             grid.classList.remove('grid_active');
//         }
//         grid.classList.add('grid_active');
//         currentMeter = grid;
//     })
//     grid.addEventListener('mouseover', () => {
//         grid.classList.add('grid_active');
//     })
//     grid.addEventListener('mouseout', () => {
//         if (currentMeter !== grid) {
//             grid.classList.remove('grid_active');
//         }
//     })
// }