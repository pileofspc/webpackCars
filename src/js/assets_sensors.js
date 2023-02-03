let sensors = document.querySelectorAll('.sensor');

for (const sensor of sensors) {
    let checkbox = sensor.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            sensor.querySelector('.sensor__graphic-svg path').style.fill = 'var(--secondary1)';
        } else {
            sensor.querySelector('.sensor__graphic-svg path').style.fill = '';
        }
    })
}