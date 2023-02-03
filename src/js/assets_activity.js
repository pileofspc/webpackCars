import LineChart from './d3_linechart';
import global from './global';
import * as dateFNS from 'date-fns';
import { findY, getCoords, throttle } from './_helpers';



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
        });
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
            points.push({ y: value });
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
            if (index === 0 || index === array.length - 2) {
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
            timestampStep = 1000 * 60 * 60;
            scheme = [1];
            func = function (date) {
                return dateFNS.format(date, 'h aa');
            }
        }
        if (itemName.toLowerCase() === 'week') {
            timestampStep = 1000 * 60 * 60 * 24;
            scheme = [1];
            func = function (date) {
                return dateFNS.format(date, 'EEE');
            }
        }
        if (itemName.toLowerCase() === 'month') {
            timestampStep = 1000 * 60 * 60 * 24;
            scheme = [2, 3, 3];
            func = function (date) {
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
        this.svgWidth = 632;
        this.svgHeight = 137;
        this.tooltip = this.root.querySelector('.tooltip_activity');
        // Ширина находится здесь только потому, что на ней стоит width: max-content, что означает,
        // что она не меняется, когда сталкивается с границей контейнера
        this.tooltipDefaultWidth = parseFloat(window.getComputedStyle(this.tooltip).width);

        this.readyForAnimation = true;
        this.lastPercentage = 0;
        this.part = 'left';
    };

    updateRenderers() {
        for (let entry in this.data) {
            this[entry] = function () {
                if (this.data[entry].datasetArray.length !== this.columns.length) {
                    throw new Error('Массивы не равны по длине');
                }
                for (let i = 0; i < this.data[entry].datasetArray.length; i++) {
                    this.columns[i].dataset.value = this.data[entry].datasetArray[i];
                }
                for (let i = 0; i < this.subtitles.length; i++) {
                    this.subtitles[i].textContent = this.data[entry].subtitles[i]
                }

                // Пробуем удалить старую SVG, не выдавая ошибку
                try {
                    document.querySelector('.stats-activity__svg').remove();
                } catch { }

                let SVG = LineChart(this.data[entry].points, {
                    x: d => d.x,
                    y: d => d.y,
                    width: this.svgWidth,
                    height: this.svgHeight,
                });
                SVG.classList.add('stats-activity__svg');

                // это нужно, чтобы при изменении ширины элемента правильно работали анимации
                SVG.setAttribute('preserveAspectRatio', 'none');

                this.root.querySelector('.stats-activity__graphics').prepend(SVG);
                this.currentSVG = SVG;
                this.currentPath = this.currentSVG.querySelector('.data__line');
            }
        }
    };
    // 
    // Тут создаются несколько методов для вывода
    // 

    animateMarker = throttle((evt) => {
        function percentage(value) {
            if (typeof value !== 'number' || isNaN(value)) {
                throw new Error('В percentage попало не число!')
            }
            return `${value / graphicsWidth * 100}%`
        };

        const markerWidth = parseFloat(window.getComputedStyle(this.marker).width);
        const graphicsWidth = parseFloat(window.getComputedStyle(this.graphics).width);
        const actualSvgHeight = parseFloat(window.getComputedStyle(this.currentSVG).height);

        // Не понимаю откуда этот марджин берется, вроде это высота точки
        // да, это высота, поправил в css, тут пока оставил, можно убрать наверное
        const someMargin = 0;
        const leftmostX = markerWidth / 2;
        const rightmostX = graphicsWidth - markerWidth / 2;
        
        let x;

        if (!evt) {
            x = 0;
        } else {
            if (evt.type === 'mousemove') {
                x = evt.clientX - getCoords(this.graphics).left;
            } else {
                x = graphicsWidth * this.lastPercentage;
            };
        }

        let atLeftBorder = x < leftmostX;
        let atRightBorder = x > rightmostX;

        if (!atLeftBorder && !atRightBorder) {
            this.marker.style.left = `${x - markerWidth / 2}px`;
            this.dot.style.top = `${findY(this.currentPath, percentage(x)) / this.svgHeight * actualSvgHeight + someMargin}px`;
        } else {
            if (atLeftBorder) {
                this.marker.style.left = `0px`;
                this.dot.style.top = `${findY(this.currentPath, percentage(leftmostX)) / this.svgHeight * actualSvgHeight + someMargin}px`;

            };
            if (atRightBorder) {
                this.marker.style.left = `${graphicsWidth - markerWidth}px`;
                this.dot.style.top = `${findY(this.currentPath, percentage(rightmostX)) / this.svgHeight * actualSvgHeight + someMargin}px`;
            }
        };

        // Анимация тултипа

        if (x + this.tooltipDefaultWidth + 40 > graphicsWidth) {
            this.part = 'right';
            this.tooltip.style.left = '';
        } else {
            this.part = 'left';
            this.tooltip.style.right = '';
        }

        let gap = markerWidth / 2;
        const windowRightBorder = document.documentElement.clientWidth;

        if (this.part === 'left') {
            // Случай, если мы в левой части (тултип ЕЩЕ НЕ столкнулся с правым краем)
            if (atLeftBorder) {
                // Курсор мыши у левого края (маркер уперся в левый край)

                // getCoords(this.graphics).left - левый край graphics
                // + markerWidth - вправо до правого края маркера
                // + gap - вправо на величину отступа
                this.tooltip.style.left = `${getCoords(this.graphics).left + markerWidth + gap}px`;
            } else {
                this.tooltip.style.left = `${getCoords(this.graphics).left + x + markerWidth}px`;
            };
        } else {
            // Случай, если мы в правой части (тултип столкнулся с правым краем)
            if (atRightBorder) {
                // Курсор мыши у правого края (маркер уперся в правый край)

                // window.innerWidth - getCoords(this.graphics).left - приходим в левый край graphics
                // - graphicsWidth - приходим в правый край
                // + markerWidth - влево до левого края маркера
                // + gap - еще влево на величину отступа
                this.tooltip.style.right = `${windowRightBorder - getCoords(this.graphics).left - graphicsWidth + markerWidth + gap}px`;
            } else {
                // window.innerWidth - getCoords(this.graphics).left - это мы приходим в левый край контейнера graphics
                // - x - это мы сдвигаемся вправо до середины маркера (туда же, где сейчас курсор)
                // + markerWidth / 2 - это сдвигаемся до левого края маркера
                // + gap - ну и добавляем отступ
                this.tooltip.style.right = `${windowRightBorder - getCoords(this.graphics).left - x + markerWidth / 2 + gap}px`;
            };
        }

        this.lastPercentage = x / graphicsWidth;
    }, 100);

    handleListeners() {
        this.graphics.addEventListener('mousemove', this.animateMarker);
        window.addEventListener('resize', this.animateMarker);

        for (let column of this.columns) {
            column.addEventListener('mouseenter', () => {
                this.tooltip.querySelector('.tooltip__value').textContent = column.dataset.value;
            })
        }
    };

    initialState() {
        // Добавлено, чтобы сразу работал transition
        this.marker.style.left = `0px`;
        window.addEventListener('load', () => {
            // Не понимаю почему не работает. Если поставить большой таймаут, то работает, 
            // видимо не успевают примениться стили, хотя на большом троттлинге в хроме всё отлично
            this.animateMarker();
        })

        this.tooltip.style.top = `${getCoords(this.graphics).top - 20}px`;
        this.tooltip.querySelector('.tooltip__value').textContent = this.columns[0].dataset.value;
    };
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
controlActivity(activityView);