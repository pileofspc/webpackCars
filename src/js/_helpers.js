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

export function htmlToFragment(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content;
}
export function htmlToElement(html) {
    return htmlToFragment(html).firstChild
}

export function toCamelCase(string, options = {
    separators: [' - ', '- ', ' -', '_', ' ', '\n', '(', ')', ',',],
    fold: ['_', '-', ' ', '\n'],
    serviceSymbol: 'servicesymbol333' // must be lowercase string
}) {
    string = String(string);

    let result = fold(string, options);
    result = splitByWord(result, options);

    result = result.map((item, index) => {
        return index === 0 ? item : capitalize(item)
    });
    
    return result.join('');
}

function fold(string, { fold: foldChars }) {
    string = String(string);
    for (let foldChar of foldChars) {
        string = string.replace(new RegExp(`${foldChar}+`), foldChar);
    }
    return string
}

function splitByWord(string, { separators, serviceSymbol }) {
    string = String(string);
    let prevString;
    while (prevString !== string) {
        prevString = string
        for (let separator of separators) {
            string = string.replace(separator, serviceSymbol);
        }
    }
    return string.toLowerCase().split(serviceSymbol).filter(item => item === '' ? false : true)
}

function capitalize(string) {
    string = String(string);
    return string[0].toUpperCase() + string.slice(1);
}

export function getMethods(obj) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter((key) => obj[key] && typeof obj[key] === "function" && key !== 'constructor')
    .map(key => obj[key]);
};