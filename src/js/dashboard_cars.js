import LineChart from './d3_linechart'
import global from './dashboard_global'

// CARS Statistics

class CarsModel {
    constructor(db) {
        Object.defineProperties(this, {
            db: {
                value: db,
                enumerable: false
            },
        })
    };
    query(item) {
        return this.db.cars[item]
    };
    createEntry(entry) {
        this[entry] = {
            stats: this.query(entry).stats,
            points: this.getPointsArray(entry),
        };
        this[entry].subtitles = this.query(entry).subtitles;
        this[entry].datasetArray = this[entry].stats.filter((value, index, array) => {
            if (index === 0 || index === array.length - 1) {
                return false
            } else {
                return true
            }
        })
    };
    getPointsArray(item) {
        let points = [];
        for (let value of this.query(item).stats) {
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
};
class CarsView {
    constructor() {
        this.carsStats = carsStats;
        this.chartItems = carsChartItems;
        this.tooltip = global.tooltip;
    };
    updateRenderers(model) {
        for (let entry in model) {
            this[entry] = function() {
                if (model[entry].datasetArray.length !== this.chartItems.length) {
                    throw new Error('Массивы не равны по длине');
                    return
                }

                for (let i = 1; i < model[entry].datasetArray.length - 1; i++) {
                    this.chartItems[i].dataset.value = model[entry].datasetArray[i];
                    this.carsStats.querySelector('.stats__miles').textContent = 'DATE PLACEHOLDER';
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
                    width: 418,
                    height: 200,
                });
                carsSVG.classList.add('stats__svg');
                carsStats.querySelector('.stats__graphics').append(carsSVG);
            }
        }
    };
    // Тут создаются несколько методов для вывода
};
function controlCars(model, view, button) {
    model.createEntry(button.value);
    view.updateRenderers(model);
    view[button.value]();
};

let carsStats = document.querySelector('.stats_cars')
let carsChartItems = carsStats.querySelectorAll(`.stats_cars .stats__chart-item`);
let carsTimespanButtons = carsStats.querySelectorAll(`.stats_cars input[type="radio"]`);

let carsModel = new CarsModel(global.database);
let carsView = new CarsView(carsModel);

console.log(carsModel)
console.log(carsView)


// Обновляем данные при загрузке страницы
for (let button of carsTimespanButtons) {
    if (button.checked) {
        controlCars(carsModel, carsView, button)
        break
    }
};
// При нажатии на радиокнопки
for (let button of carsTimespanButtons) {
    button.addEventListener('click', () => {
        controlCars(carsModel, carsView, button)
    })
};