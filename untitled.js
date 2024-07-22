// ascii.js

let timer = null;
let frameIndex = 0;
let frames = [];
let delay = 250;
let originalText = "";

window.onload = function() {
    document.getElementById('start').onclick = startAnimation;
    document.getElementById('stop').onclick = stopAnimation;
    document.getElementById('animation').onchange = updateAnimation;
    document.getElementById('fontsize').onchange = changeFontSize;
    document.getElementById('turbo').onchange = updateSpeed;
};

function startAnimation() {
    const textarea = document.getElementById('textarea');
    originalText = textarea.value;
    frames = textarea.value.split("=====\n");
    frameIndex = 0;

    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
    document.getElementById('animation').disabled = true;

    timer = setInterval(showNextFrame, delay);
}

function stopAnimation() {
    clearInterval(timer);
    timer = null;

    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('animation').disabled = false;

    document.getElementById('textarea').value = originalText;
}

function showNextFrame() {
    const textarea = document.getElementById('textarea');
    textarea.value = frames[frameIndex];
    frameIndex = (frameIndex + 1) % frames.length;
}

function updateAnimation() {
    const animationSelect = document.getElementById('animation');
    const textarea = document.getElementById('textarea');
    textarea.value = ANIMATIONS[animationSelect.value] || "";
}

function changeFontSize() {
    const textarea = document.getElementById('textarea');
    const fontsizeSelect = document.getElementById('fontsize');
    textarea.style.fontSize = fontsizeSelect.value;
}

function updateSpeed() {
    const turboCheckbox = document.getElementById('turbo');
    delay = turboCheckbox.checked ? 50 : 250;

    if (timer !== null) {
        clearInterval(timer);
        timer = setInterval(showNextFrame, delay);
    }
}
