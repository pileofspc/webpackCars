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
            columns: {
                value: 12,
                enumerable: false
            }
        })
        
    };
    query(item) {
        return this.db.activity[item]
    };
    createEntry(entry) {
        this[entry] = {};
        this[entry].stats = this.query(entry).stats;
        this[entry].points = this.getPointsArray(entry);
        this[entry].subtitles = this.getSubtitles(entry);
        this[entry].datasetArray = this[entry].stats.slice();
        // this[entry].datasetArray.pop();
        // this[entry].datasetArray.shift();
    };
    getPointsArray(itemName) {
        let points = [];
        for (let value of this.query(itemName).stats) {
            points.push({y: value});
        }
        this.setX(points);
        return points
    };
    setX(coords) {
        // В данном случае не важно какое расстояние между точками, т.к оно везде одинаковое
        let gap = 52.25;
        let endGap = gap;
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
            scheme = [1];
            func = function(date) {
                return dateFNS.format(date, 'h aa');
            }
        }
        if (itemName.toLowerCase() === 'week') {
            timestampStep = 1000*60*60*24;
            scheme = [1];
            func = function(date) {
                return dateFNS.format(date, 'EEE');
            }
        }
        if (itemName.toLowerCase() === 'month') {
            timestampStep = 1000*60*60*24;
            scheme = [2, 3, 3];
            func = function(date) {
                return dateFNS.format(date, 'dd/MM')
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
        this.root = document.querySelector('.activity');
        this.marker = this.root.querySelector('.marker');
        this.dot = this.marker.querySelector('.dot');
        this.graphics = this.root.querySelector('.stats-activity__graphics');
        this.columns = this.root.querySelectorAll('.stats-activity__column');
        this.subtitles = this.root.querySelectorAll('.stats-activity__item-name');
        this.data = new ActivityData(global.database);
        this.currentSVG = null;
        this.currentPath = null;
        this.tooltip = global.tooltip;
        this.readyForAnimation = true;
    };
    updateRenderers() {
        for (let entry in this.data) {
            this[entry] = function() {
                if (this.data[entry].datasetArray.length !== this.columns.length) {
                    throw new Error('Массивы не равны по длине');
                }
                for (let i = 0; i < this.data[entry].datasetArray.length; i++) {
                    this.columns[i].dataset.value = this.data[entry].datasetArray[i];
                }
                for (let i = 0; i < this.subtitles.length; i++) {
                    this.subtitles[i].textContent = this.data[entry].subtitles[i]
                }

                // Пробуем удалить старую SVG
                try {
                    document.querySelector('.stats-activity__svg').remove();
                } catch {}

                // Получаем высоту и ширину нужного контейнера и устанавливаем их в d3:
                let width = parseFloat(window.getComputedStyle(this.graphics).width);
                let height = parseFloat(window.getComputedStyle(this.graphics).height);

                let SVG = LineChart(this.data[entry].points, {
                    x: d => d.x,
                    y: d => d.y,
                    width: width,
                    height: height,
                });
                SVG.classList.add('stats-activity__svg');
                this.root.querySelector('.stats-activity__svg-container').append(SVG);
                this.currentSVG = SVG;
                this.currentPath = this.currentSVG.querySelector('.data__line');
            }
        }
    };
    // Тут создаются несколько методов для вывода
    animateMarker(evt) {
        // this.tooltip.style.visibility = 'visible';
        let x = evt.clientX - getCoords(this.graphics).left;
        const markerWidth = parseFloat(window.getComputedStyle(this.marker).width);
        const graphicsWidth = parseFloat(window.getComputedStyle(this.graphics).width);

        let atLeftBorder = x < markerWidth / 2;
        let atRightBorder = x > graphicsWidth - markerWidth / 2;

        if (!atLeftBorder && !atRightBorder) {
            this.marker.style.left = `${x - markerWidth / 2}px`;
            this.dot.style.top = `${findY(this.currentPath, x) + 16}px`;
        } else {
            if (atLeftBorder) {
                this.marker.style.left = `0px`;
                this.dot.style.top = `${findY(this.currentPath, markerWidth / 2) + 16}px`;
            };
            if (atRightBorder) {
                this.marker.style.left = `${graphicsWidth - markerWidth}px`;
                this.dot.style.top = `${findY(this.currentPath, graphicsWidth - markerWidth / 2) + 16}px`;
            }
        };
    }
    
    handleListeners() {
        let lastEVT;
        this.graphics.addEventListener('mousemove', (evt) => {
            lastEVT = evt;
            if (this.readyForAnimation) {
                this.animateMarker(evt);

                this.readyForAnimation = false;
                setTimeout(() => {
                    this.readyForAnimation = true;
                    this.animateMarker(lastEVT);
                }, 100);
            };
        });
        this.graphics.addEventListener('mouseenter', (evt) => {
            // this.tooltip.style.visibility = 'visible';
            // console.log(evt)
            // this.marker.style.left = evt.;
        });
        this.graphics.addEventListener('mouseleave', () => {
            // this.tooltip.style.visibility = '';
            // this.marker.style.left = '50px';
        });

        for (let column of this.columns) {
            column.addEventListener('mouseenter', () => {
                // this.tooltip.querySelector('.tooltip__time').textContent = column.dataset.value;
            })
        }
    }

    initialState() {
        // Добавлено, чтобы сразу работал transition
        this.marker.style.left = `0px`;
        let evt = {
            clientX: 0
        };
        this.animateMarker(evt);

    }
};
function controlActivity(view, value = 'month') {
    view.data.createEntry(value);
    view.updateRenderers();
    view[value]();
    view.handleListeners();
    view.initialState();
};

// let tooltip = global.tooltip;
// let carsStats = document.querySelector('.stats_cars')
// let carsChartItems = carsStats.querySelectorAll(`.stats_cars .stats__chart-item`);
// let carsTimespanButtons = carsStats.querySelectorAll(`.stats_cars input[type="radio"]`);

// let carsModel = new CarsModel(global.database);
let activityView = new ActivityView();
controlActivity(activityView)

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