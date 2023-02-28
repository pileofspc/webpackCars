import LineChart from './d3_linechart';
import global from './global';
import * as date from 'date-fns';
import { findY, getCoords } from './_helpers';

// CARS Statistics
//  Попробовал реализовать MVC, но пока не получилось - не понимаю, где что должно быть. Если в модели должна быть только логика
// никак ни с чем остальным не связанная, то что там должно быть? Только запрос на бэкенд?
// ---------------------------------------------------------------------------------------------------------------------------------------
// Получается что почти весь код должен быть во view? Если так, то где должны навешиваться обработчики? Тоже во view? если да, то
// зачем мне было делать модуль отдельный? Плюс тогда получается огромный класс, который отвечает за всё, разве так должно быть?

// Должен ли входить во view весь компонент? Или может быть так, что в него входит только часть компонента? Например на сайте есть два компонента с 
// графиками: один отрисовывает график по одному датчику от машины за последние день/неделю/месяц, в котором есть 6 колонок, а второй похожий - делает
// то же, но только за месяц, и при этом в нем 8 колонок. Как в этом случае задать подписи к колонкам? Нужно делать отдельный view? Или лучше
// просто их не включать во view совсем, и тогда уже просто в модуле вне view задать эти подписи?
// ---------------------------------------------------------------------------------------------------------------------------------------
// Контроллер тоже непонятен. Это по сути то, с чем взаимодействует пользователь? Или это тоже view? Или это просто прослойка между моделью и view,
// в которой просто вызываются методы модели?
// ---------------------------------------------------------------------------------------------------------------------------------------
// Также непонятно, какая часть приложения должна адаптировать данные с датчиков машины к представлению на сайте. Например машина
// отправляет данные с датчиков каждый час, а на сайте нужно сделать график за месяц или за неделю, в котором количество колонок гораздо меньше, чем
// количество отправленных данных.
// ---------------------------------------------------------------------------------------------------------------------------------------
// Еще непонятно как переиспользовать код? Компоненты похожие, но немного различаются. Делать наследование классов? Или в данном случае
// лучше просто скопировать код?

// Пока оставил как есть.

class CarsModel {
    constructor(db) {
        Object.defineProperties(this, {
            db: {
                value: db,
                enumerable: false
            },
        })
    }
    query(item) {
        return this.db.cars[item]
    }
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
    }
    getPointsArray(itemName) {
        let points = [];
        for (let value of this.query(itemName).stats) {
            points.push({y: value});
        }
        this.normalizeX(points);
        return points
    }
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
    }
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
            return
        }
        
        while (subtitles.length < 8) {
            subtitles.unshift(func(date))
            date = new Date(date - timestampStep * scheme[counter]);
            counter++;
            if (counter >= scheme.length) {
                counter = 0;
            }
        }
        return subtitles
    }
}
class CarsView {
    constructor() {
        this.carsStats = carsStats;
        this.chartItems = carsChartItems;
        this.tooltip = global.tooltip;
        this.svgHeight = 200;
        this.svgWidth = 418;
    }
    updateRenderers(model) {
        for (let entry in model) {
            this[entry] = function() {
                if (model[entry].datasetArray.length !== this.chartItems.length) {
                    throw new Error('Массивы не равны по длине');
                }
                for (let i = 0; i < model[entry].datasetArray.length; i++) {
                    this.chartItems[i].dataset.value = model[entry].datasetArray[i];
                    // this.chartItems[i].dataset.number = i;
                    
                    this.carsStats.querySelector('.stats__miles').textContent = date.format(new Date(), 'd MMMM yyyy');
                    let subtitles = this.carsStats.querySelectorAll('.stats__item-name');
                    for (let i = 0; i < subtitles.length; i++) {
                        subtitles[i].textContent = model[entry].subtitles[i]
                    }
                }

                try {
                    document.querySelector('.stats__svg').remove();
                } catch {}
                let carsSVG = LineChart(model[entry].points, {
                    x: d => d.x,
                    y: d => d.y,
                    width: this.svgWidth,
                    height: this.svgHeight,
                });
                carsSVG.classList.add('stats__svg');
                carsSVG.setAttribute('preserveAspectRatio', 'none');
                carsStats.querySelector('.stats__graphics').append(carsSVG);
            }
        }
    }
    // Тут создаются несколько методов для вывода
}
function controlCars(model, view, button) {
    model.createEntry(button.value);
    view.updateRenderers(model);
    view[button.value]();

    path = document.querySelector('.stats_cars path');
}
let path = document.querySelector('.stats_cars path');

let tooltip = global.tooltip;
let carsStats = document.querySelector('.stats_cars')
let carsChartItems = carsStats.querySelectorAll(`.stats_cars .stats__chart-item`);
let carsTimespanButtons = carsStats.querySelectorAll(`.stats_cars input[type="radio"]`);

let carsModel = new CarsModel(global.database);
let carsView = new CarsView(carsModel);

// Обновляем данные при загрузке страницы
for (let button of carsTimespanButtons) {
    if (button.checked) {
        controlCars(carsModel, carsView, button)
        break
    }
}
// При нажатии на радиокнопки
for (let button of carsTimespanButtons) {
    button.addEventListener('click', () => {
        controlCars(carsModel, carsView, button)
    })
}


// Тултип и подсветка элементов, на которые наведен курсор
let dot = document.querySelector('.dot');
let dotHeight = parseFloat(window.getComputedStyle(dot).height);
let tooltipHeight = parseFloat(window.getComputedStyle(tooltip).height);
const chart = document.querySelector('.stats_cars .stats__chart');
const subtitles = document.querySelectorAll('.stats_cars .stats__item-name');
const graphics = document.querySelector('.stats_cars .stats__graphics');

for (let i = 0; i < carsChartItems.length; i++) {
    let item = carsChartItems[i];
    item.addEventListener('mouseenter', (evt) => {
        item.classList.add('stats__chart-item_hovered');

        let time = subtitles[i].textContent;
        let value = item.dataset.value;
        tooltip.querySelector('.tooltip__time').textContent = time;
        tooltip.querySelector('.tooltip__value').textContent = value;
    });
    item.addEventListener('mouseleave', (evt) => {
        item.classList.remove('stats__chart-item_hovered');
        item.querySelector('.dot').style.display = 'none';
    });
    item.addEventListener('mouseenter', (evt) => {
        const svg = document.querySelector('.stats_cars .stats__svg');
        const actualSvgHeight = parseFloat(window.getComputedStyle(svg).height);
        // graphics используется потому, что он не меняется во время использования фичей на странице
        const actualGraphicsWidth = parseFloat(window.getComputedStyle(graphics).width);
        let dot = item.querySelector('.dot');
        dot.style.display = 'block';

        let rectDot = dot.getBoundingClientRect();
        let rectChart = chart.getBoundingClientRect();
        let x = (rectDot.left + rectDot.right)/2 - rectChart.left;
        let percentageX = `${x / actualGraphicsWidth * 100}%`;
        let y = findY(path, percentageX) / carsView.svgHeight * actualSvgHeight;

        dot.style.top = y - dotHeight/2 + 'px';

        rectDot = getCoords(dot);
        tooltip.style.left = rectDot.left + 20 + 'px';
        tooltip.style.top = rectDot.top - tooltipHeight/2 + 'px';
        tooltip.style.visibility = 'visible';
    });
}

chart.addEventListener('mouseenter', (evt) => {
    document.documentElement.style.setProperty('--tooltip', 'var(--secondary4)');
    tooltip.style.visibility = 'visible';
});
chart.addEventListener('mouseleave', (evt) => {
    tooltip.style.visibility = 'hidden';
});