
// Miles Statistics
import global from './dashboard_global';

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
        return this.db.miles[item];
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
        this.stats = stats;
        this.chartItems = chartItems;
        this.tooltip = tooltip;
    };
    updateRenderers(model) {
        for (let entry in model) {
            this[entry] = function() {
                for (let i = 0; i < model[entry].percentages.length; i++) {
                    this.chartItems[i].querySelector('.stats__column').style.height = `${model[entry].percentages[i]}%`;
                    this.chartItems[i].dataset.miles = model[entry].stats[i];
                    this.stats.querySelector('.stats__miles').textContent = model[entry].sum + ' Miles';
                    let subtitles = this.stats.querySelectorAll('.stats__item-name');
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

let stats = document.querySelector('.stats:not(.stats_cars)');
let chartItems = stats.querySelectorAll(`.stats__chart-item`);

let tooltip = global.tooltip;

let milesModel = new MilesModel(global.database);
let milesView = new MilesView(milesModel);

let milesTimespanButtons = stats.querySelectorAll('input[type="radio"]');

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

// Тултип и подсветка элементов, на которые наведен курсор
for (let item of chartItems) {
    item.addEventListener('mouseover', (evt) => {
        if (evt.target.classList.contains('stats__spacer')) {
            return
        }
        item.classList.add('stats__chart-item_hovered');
        tooltip.style.visibility = 'visible';
        let time = item.querySelector(`.stats__item-name`).textContent;
        tooltip.querySelector('.tooltip__time').textContent = time;
        tooltip.querySelector('.tooltip__value').textContent = `${item.dataset.miles}`;
    });
    item.addEventListener('mouseout', (evt) => {
        item.classList.remove('stats__chart-item_hovered');
        tooltip.style.visibility = 'hidden';
    });
    item.addEventListener('mousemove', (evt) => {
        tooltip.style.left = `${evt.pageX + 20}px`;
        tooltip.style.top = `${evt.pageY}px`
    });
};