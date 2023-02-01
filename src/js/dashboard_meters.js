import global from './global'

// Ховер эффекты
let grids = document.querySelectorAll('.meter');
let currentGridActive = grids[0];
currentGridActive.classList.add('active');

for (let grid of grids) {
    grid.addEventListener('mouseenter', () => {
        currentGridActive.classList.remove('active');
        grid.classList.add('active');
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

for (let [key, value] of Object.entries(global.database.meters)) {
    let meter = document.querySelector(`.meter_id_${key}`);
    meter.querySelector(`.progress__percentage`).textContent = `${value}%`;

    let emptySVG = new SVGGenerator(arc, 100);
    emptySVG.render(meter.querySelector(`.progress__bar`), 'progress__empty');

    let currentSVG = new SVGGenerator(arc, value);
    currentSVG.render(meter.querySelector(`.progress__bar`), 'progress__current');
}