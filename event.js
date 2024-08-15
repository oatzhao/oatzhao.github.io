document.getElementById('start').addEventListener('click', function() {
    const width = parseInt(document.getElementById('width').value, 10);
    const growth = parseInt(document.getElementById('growth').value, 10);
    const interval = parseInt(document.getElementById('interval').value, 10);
    const numCircles = parseInt(document.getElementById('numCircles').value, 10);
    const container = document.getElementById('circle-container');

    // Clear existing circles
    container.innerHTML = '';

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.width = `${width}px`;
        circle.style.height = `${width}px`;
        circle.style.left = `${Math.random() * (window.innerWidth - width)}px`;
        circle.style.top = `${Math.random() * (window.innerHeight - width)}px`;

        // Function to grow the circle
        const growCircle = () => {
            let currentWidth = parseInt(circle.style.width, 10);
            circle.style.width = `${currentWidth + growth}px`;
            circle.style.height = circle.style.width;
        };

        // Start growing the circle
        const growthInterval = setInterval(growCircle, interval);

        // Remove the circle on click
        circle.addEventListener('click', () => {
            clearInterval(growthInterval);
            circle.remove();
        });

        container.appendChild(circle);
    }
});
