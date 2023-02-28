export function findY(path, x) {
    if (typeof x !== 'string' && typeof x !== 'number') {
        throw new Error('findY получила неправильный тип');
    }

    var pathLength = path.getTotalLength()
    var start = 0
    var end = pathLength
    var target = (start + end) / 2

    var startX = path.getPointAtLength(0).x;
    var endX = path.getPointAtLength(pathLength).x;

    if (typeof x === 'string') {
        x = parseFloat(x) / 100 * endX;
    }

    // Ensure that x is within the range of the path
    x = Math.max(x, startX)
    x = Math.min(x, endX)

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
}

export function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    let result = {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
    result.horCenter = result.left + (result.right - result.left) / 2;
    result.verCenter = result.top + (result.bottom - result.top) / 2;

    return result;
}

export function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

export function throttle(func, throttleTime) {
    let isReady = true;
    let savedArgs;
    let savedThis;
    
    return function throttled(...args) {
        if (isReady) {
            func.apply(this, args);
            isReady = false;
            savedArgs = savedThis = null;

            setTimeout(() => {
                isReady = true;
                if (savedArgs) {
                    throttled.apply(savedThis, savedArgs);
                }
            }, throttleTime);
        } else {
            savedArgs = args;
            savedThis = this;
        }
    }
}

export function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;       //Максимум не включается, минимум включается
}