import LineChart from './d3_linechart'
import global from './global'
import * as dateFNS from 'date-fns'

// Activity

class ActivityData {
    constructor(db) {
        Object.defineProperties(this, {
            db: {
                value: db,
                enumerable: false
            },
        })
        this.columns = 12;
    };
    query(item) {
        return this.db.activity[item]
    };
    createEntry(entry) {
        this[entry] = {
            stats: this.query(entry).stats,
            points: this.getPointsArray(entry),
        };
        this[entry].subtitles = this.getSubtitles(entry);
        this[entry].datasetArray = this[entry].stats.filter((value, index, array) => {
            if (index === 0 || index === array.length - 1) {
                return false
            } else {
                return true
            }
        });
    };
    getPointsArray(itemName) {
        let points = [];
        for (let value of this.query(itemName).stats) {
            points.push({y: value});
        }
        this.normalizeX(points);
        return points
    };
    normalizeX(coords) {
        let gap = 52.25;
        let endGap = gap/2;
        let accum = 0;
        coords.forEach((value, index, array) => {
            value.x = accum;
            if (index === 0  || index === array.length - 2) {
                accum += endGap;
            } else {
                accum += gap;
            }
        })
    };
    getSubtitles(itemName) {
        let date = new Date();
        let subtitles = [];
        let counter = 0;

        let timestampStep;
        let scheme;
        let func;
        if (itemName.toLowerCase() === 'day') {
            timestampStep = 1000*60*60;
            scheme = [3, 4];
            func = function(date) {
                return date.toLocaleTimeString().replace(/([\d])(:[\d]{2})(:[\d]{2})(.*)/, "$1$4");
            }
        }
        if (itemName.toLowerCase() === 'week') {
            timestampStep = 1000*60*60*24;
            scheme = [1];
            func = function(date) {
                return date.toString().slice(0, 3);
            }
        }
        if (itemName.toLowerCase() === 'month') {
            timestampStep = 1000*60*60*24;
            scheme = [4, 4, 4, 4, 4, 5];
            func = function(date) {
                let day = String(date.getDate());
                if (day.length === 1) {
                    day = `0${day}`
                }
                let month = String(date.getMonth() + 1);
                if (month.length === 1) {
                    month = `0${month}`
                }
                return `${day}/${month}`;
            }
        }
        if (timestampStep === undefined) {
            throw new Error('Непредвиденный формат вывода данных') 
        }
        
        while (subtitles.length < this.columns) {
            subtitles.unshift(func(date))
            date = new Date(date - timestampStep * scheme[counter]);
            counter++;
            if (counter >= scheme.length) {
                counter = 0;
            }
        }
        return subtitles
    }
};
class ActivityView {
    constructor() {
        this.activity = document.querySelector('.activity');
        this.data = new ActivityData(global.database);
        this.tooltip = global.tooltip;
    };
    updateRenderers() {
        for (let entry in this.data) {
            this[entry] = function() {
                if (this.data[entry].datasetArray.length !== this.chartItems.length) {
                    throw new Error('Массивы не равны по длине');
                }
                for (let i = 0; i < this.data[entry].datasetArray.length; i++) {
                    this.chartItems[i].dataset.value = this.data[entry].datasetArray[i];
                    
                    this.carsStats.querySelector('.stats__miles').textContent = date.format(new Date(), 'd MMMM yyyy');
                    let subtitles = this.carsStats.querySelectorAll('.stats__item-name');
                    for (let i = 0; i < subtitles.length; i++) {
                        subtitles[i].textContent = this.data[entry].subtitles[i]
                    }
                }

                try {
                    document.querySelector('.stats2__svg').remove();
                } catch {}
                let SVG = LineChart(this.data[entry].points, {
                    x: d => d.x,
                    y: d => d.y,
                    width: 418,
                    height: 200,
                });
                SVG.classList.add('stats2__svg');
                carsStats.querySelector('.stats2__svg-container').append(SVG);
                this.currentSVG = SVG;
            }
        }
    };
    // Тут создаются несколько методов для вывода
};
function controlActivity(view, button) {
    view.data.createEntry(button.value);
    view.updateRenderers();
    view[button.value]();

    path = view.currentSVG.querySelector('path');
};
let path;

let tooltip = global.tooltip;
// let carsStats = document.querySelector('.stats_cars')
// let carsChartItems = carsStats.querySelectorAll(`.stats_cars .stats__chart-item`);
// let carsTimespanButtons = carsStats.querySelectorAll(`.stats_cars input[type="radio"]`);

// let carsModel = new CarsModel(global.database);
let carsView = new ActivityView();



// // При нажатии на радиокнопки
// for (let button of carsTimespanButtons) {
//     button.addEventListener('click', () => {
//         controlCars(carsModel, carsView, button)
//     })
// // Обновляем данные при загрузке страницы
//     if (button.checked) {
//         controlCars(carsModel, carsView, button)
//     }
// };


// // Тултип и подсветка элементов, на которые наведен курсор
// let dot = document.querySelector('.dot');
// let dotHeight = parseFloat(window.getComputedStyle(dot).height);
// let tooltipHeight = parseFloat(window.getComputedStyle(tooltip).height);
// let chart = document.querySelector('.stats_cars .stats__chart');

function findY(path, x) {
    var pathLength = path.getTotalLength()
    var start = 0
    var end = pathLength
    var target = (start + end) / 2

    // Ensure that x is within the range of the path
    x = Math.max(x, path.getPointAtLength(0).x)
    x = Math.min(x, path.getPointAtLength(pathLength).x)

    // Walk along the path using binary search 
    // to locate the point with the supplied x value
    while (target >= start && target <= pathLength) {
        var pos = path.getPointAtLength(target)

        // use a threshold instead of strict equality 
        // to handle javascript floating point precision
        if (Math.abs(pos.x - x) < 1) {
            return pos.y
        } else if (pos.x > x) {
            end = target
        } else {
            start = target
        }
        target = (start + end) / 2
    }
};

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

// for (let item of carsChartItems) {
//     item.addEventListener('mouseenter', (evt) => {
//         item.classList.add('stats__chart-item_hovered');

//         let time = item.querySelector(`.stats__item-name`).textContent;
//         tooltip.querySelector('.tooltip__time').textContent = time;
//         tooltip.querySelector('.tooltip__value').textContent = `${item.dataset.value}`;
//     });
//     item.addEventListener('mouseleave', (evt) => {
//         item.classList.remove('stats__chart-item_hovered');
//         item.querySelector('.dot').style.display = 'none';
//     });
//     item.addEventListener('mouseenter', (evt) => {
//         let dot = item.querySelector('.dot');
//         dot.style.display = 'block';

//         let rectDot = dot.getBoundingClientRect();
//         let rectChart = chart.getBoundingClientRect();
//         let x = (rectDot.left + rectDot.right)/2 - rectChart.left;
//         let y = findY(path, x);

//         dot.style.top = y - dotHeight/2 + 'px';

//         rectDot = getCoords(dot);
//         tooltip.style.left = rectDot.left + 20 + 'px';
//         tooltip.style.top = rectDot.top - tooltipHeight/2 + 'px';
//     });
// };

// chart.addEventListener('mouseenter', (evt) => {
//     document.documentElement.style.setProperty('--tooltip', 'var(--secondary4)');
//     tooltip.style.visibility = 'visible';
// });
// chart.addEventListener('mouseleave', (evt) => {
//     tooltip.style.visibility = 'hidden';
// });