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


// Прогресс бары
function radToDeg(rad) {
    return rad*180/Math.PI
}
function degToRad(deg) {
    return deg/180*Math.PI
}
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
}

class Arc {
    constructor(x1, y1, x2, r) {
        this.arguments = arguments;
            // r**2 = y**2 + (xdiff/2)**2
            // y**2 = r**2 - xdiff**2 /4
            // y = sqrt(r**2 - xdiff**2 /4)
            // yofcenter = yofdot - y

            // yofcenter = yofdot - sqrt(r**2 - xdiff**2 / 4)
            // xcc = xc
        let xDiff = Math.abs(x2 - x1);
        let quarter = 1;
        if (y1 -  this.centerY < 0) {
            quarter = 2;
        }

        this.r = r;
        this.centerX = xDiff/2 + x1;
        this.centerY = y1 - Math.sqrt(r**2 - xDiff**2/4);
        this.circleX1 = -xDiff/2;
        this.circleY1 = Math.abs(this.centerY - y1);
        if (quarter === 1) {
            this.circleY1 *= -1
        }
            // sin x = math.abs(circleY) / r
            // x = asin(math.abs(circleY / r))
        this.angleOffset = Math.abs(radToDeg(Math.asin(this.circleY1 / r)));
        if (quarter === 1) {
            this.angleOffset *= -1;
        }
        this.maxAngle = 180 - 2 * this.angleOffset;
    }
    getPointCoordinatesByPercentage(percentage) {
        if (percentage > 100 || percentage < 0) {
            throw new Error('Допускаются значения только от 0 до 100');
        }
        // cos a = x / r
        // x = r * cos a
    
        // sin a = -y / r
        // -y = r * sin a
        let angle = percentage/100 * arc.maxAngle + arc.angleOffset;
        let x = this.r * -1*Math.cos(degToRad(angle));
        let y = this.r * Math.sin(degToRad(angle));
        let finalX = this.centerX + x;
        let finalY = this.centerY - y;
        return {
            x: finalX,
            y: finalY
        }
    }
    getPointX(percentage) {
        return this.getPointCoordinatesByPercentage(percentage).x
    }
    getPointY(percentage) {
        return this.getPointCoordinatesByPercentage(percentage).y
    }
    getXYRelativeToCircleCenter(x, y) {
        return {
            x: x - this.centerX,
            y: this.centerY - y
        }
    }
    getLargeArcFlag(percentage) {
        let startX = this.getPointX(0);
        let startY = this.getPointY(0);
        let endX = this.getPointX(percentage);
        let endY = this.getPointY(percentage);

        let relStart = this.getXYRelativeToCircleCenter(startX, startY);
        let relEnd = this.getXYRelativeToCircleCenter(endX, endY);
        
        let relMid = {
            x: -relStart.x,
            y: - relStart.y
        }

        let otherSide = 0;
        let k = relMid.y / relMid.x;
        if (relEnd.y < k * relEnd.x) {
            otherSide = 1;
        }
        return otherSide
    }
}

let arc = new Arc(17.5, 89, 94.5, 50.4);

class SVGGenerator {
    constructor(arc, percentage) {
        let x1 = arc.arguments[0];
        let y1 = arc.arguments[1];
        let x2 = arc.getPointX(percentage);
        let y2 = arc.getPointY(percentage);
        let r = arc.arguments[3];

        this.template = `
            <svg class="" xmlns="http://www.w3.org/2000/svg" width="112" height="95">
                <path d="M${x1},${y1} A${r},${r},0,${arc.getLargeArcFlag(percentage)},1,${x2},${y2}"
                fill="none"
                stroke="red"
                stroke-width="11"
                stroke-linecap="round"/>
            </svg>`;
        };
        render(target, className) {
            let template = this.template.replace(`class=""`, `class="${className}"`)
            target.insertAdjacentHTML('beforeend', template);
        }
}

let meters = {
    'energy': 0,
    'range': 20,
    'break-fluid': 50,
    'tire-wear': 80
}

for (let [key, value] of Object.entries(meters)) {
    let meter = document.querySelector(`.${key}`);
    meter.querySelector(`.progress__percentage`).textContent = `${value}%`;

    let emptySVG = new SVGGenerator(arc, 100);
    emptySVG.render(meter.querySelector(`.progress__bar`), 'progress__empty');

    let currentSVG = new SVGGenerator(arc, value);
    currentSVG.render(meter.querySelector(`.progress__bar`), 'progress__current');
}

// Miles Statistics
let database = {
    day: {
        stats: [15, 25, 32, 0, 10, 20, 5],
        subtitles: ['3 AM', '7 AM', '10 AM', '2 PM', '5 PM', '9 PM', '12 PM']
    },
    week: {
        stats: [0, 12, 70, 5, 15, 53, 28],
        subtitles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
        stats: [90, 67, 52, 23, 2, 81, 0],
        subtitles: ['5', '10', '14', '18', '22', '26', '30'],
    },
}

class MilesModel {
    constructor(db) {
        Object.defineProperties(this, {
            db: {
                value: db,
                enumerable: false
            },
        })
    };
    query(item) {
        return this.db[item];
    };
    createEntry(entry) {
        this[entry] = {
            stats: this.query(entry).stats
        };
        this[entry].sum = this.getSum(this[entry]);
        this[entry].max = this.getMax(this[entry]);
        this[entry].percentages = this.getPercentagesArray(this[entry]);
        this[entry].subtitles = this.query(entry).subtitles;
    };
    getSum(item) {
        return item.stats.reduce((accumulator, value) => {
            return accumulator + value;
        });
    };
    getMax(item) {
        return item.stats.reduce((accumulator, value) => {
            if (accumulator < value) {
                accumulator = value
            }
            return accumulator
        });
    };
    getPercentagesArray(item) {
        return item.stats.map((value) => {
            return value/item.max * 100;
        });
    };
};
class MilesView {
    constructor() {
        this.chartItems = chartItems;
        this.tooltip = tooltip;
    };
    updateRenderers(model) {
        for (let entry in model) {
            this[entry] = function() {
                for (let i = 0; i < model[entry].percentages.length; i++) {
                    this.chartItems[i].querySelector('.miles-stats__column').style.height = `${model[entry].percentages[i]}%`;
                    this.chartItems[i].dataset.miles = model[entry].stats[i];
                    document.querySelector('.miles-stats__miles').textContent = model[entry].sum + ' Miles';
                    let subtitles = document.querySelectorAll('.miles-stats__item-name');
                    for (let i = 0; i < subtitles.length; i++) {
                        subtitles[i].textContent = model[entry].subtitles[i]
                    }
                }
            }
        }
    };
    // Тут создаются несколько методов для вывода
}
function control(model, view, button) {
    model.createEntry(button.value);
    view.updateRenderers(model);
    view[button.value]();
}

let chartItems = document.querySelectorAll(`.miles-stats__chart-item`);
let tooltip = document.querySelector('.tooltip');

let milesModel = new MilesModel(database);
let milesView = new MilesView(milesModel);

let milesTimespanButtons = document.querySelectorAll('.miles-stats input[type="radio"]');

// Обновляем данные при загрузке страницы
for (let button of milesTimespanButtons) {
    if (button.checked) {
        control(milesModel, milesView, button);
        break
    }
};
// При нажатии на радиокнопки
for (let button of milesTimespanButtons) {
    button.addEventListener('click', () => {
        control(milesModel, milesView, button)
    })
};

// Независимые от радиокнопок обработчики
for (let item of chartItems) {
    item.addEventListener('mouseover', (evt) => {
        if (evt.target.classList.contains('miles-stats__spacer')) {
            return
        }
        item.classList.add('miles-stats__chart-item_hovered');
        tooltip.style.visibility = 'visible';
        let time = item.querySelector(`.miles-stats__item-name`).textContent;
        tooltip.querySelector('.tooltip__time').textContent = time;
        tooltip.querySelector('.tooltip__value').textContent = `${item.dataset.miles}`;
    });
    item.addEventListener('mouseout', (evt) => {
        item.classList.remove('miles-stats__chart-item_hovered');
        tooltip.style.visibility = 'hidden';
    });
    item.addEventListener('mousemove', (evt) => {
        tooltip.style.left = `${evt.pageX + 20}px`;
        tooltip.style.top = `${evt.pageY}px`
    });
};