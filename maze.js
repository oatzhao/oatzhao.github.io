var canMove;
var inMaze = false;
var entryX;
var entryY;
var canvas = document.getElementById("mazecanvas");
var context = canvas.getContext("2d");
var currRectX = 0;
var currRectY = 0;

// Maze parameters
var columns = 10;
var rows = 10;
var pathWidth = 20;
var rectSize = pathWidth;
var wallWidth = 2;
var straightLinePercentage = 5; // Higher is easier

var moveDistance = (pathWidth + wallWidth) / 2;
console.log("move: " + moveDistance);
var bottom = ((pathWidth + wallWidth) * rows) + pathWidth - wallWidth;
console.log("Bottom: " + bottom);
var right = ((pathWidth + wallWidth) * columns) + pathWidth - wallWidth;
console.log("Right: " + right);

var mazeWidth = right + (2 * rectSize);
var mazeHeight = bottom + (2 * rectSize);

function drawMazeAndRectangle(rectX, rectY) {
    makeWhite(0, 0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function () {
        context.drawImage(mazeImg, 0, 0);
        drawRectangle(rectX, rectY, "#0000FF");
    };
    var ImgSrc = "http://www.hereandabove.com/cgi-bin/maze?" + columns + "+" + rows + "+" + pathWidth + "+" + wallWidth + "+" + straightLinePercentage + "+0+0+0+255+255+255";
    mazeImg.src = ImgSrc;
}

function drawRectangle(x, y, style) {
    makeWhite(currRectX, currRectY, rectSize, rectSize);
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, rectSize, rectSize);
    context.closePath();
    context.fillStyle = style;
    context.fill();
}

function moveRect(e) {
    var newX;
    var newY;
    var movingAllowed;

    if (e.type === 'mousemove') {
        // For mouse movement
        var rect = canvas.getBoundingClientRect();
        newX = e.clientX - rect.left - rectSize / 2;
        newY = e.clientY - rect.top - rectSize / 2;
    } else {
        // For keyboard movement
        switch (e.keyCode) {
            case 38:   // Arrow up key
            case 87: // W key
                newX = currRectX;
                newY = currRectY - moveDistance;
                break;
            case 37: // Arrow left key
            case 65: // A key
                newX = currRectX - moveDistance;
                newY = currRectY;
                break;
            case 40: // Arrow down key
            case 83: // S key
                newX = currRectX;
                newY = currRectY + moveDistance;
                break;
            case 39: // Arrow right key
            case 68: // D key
                newX = currRectX + moveDistance;
                newY = currRectY;
                break;
            default:
                return; // Exit if it's not a relevant key
        }
    }

    if (currRectX >= pathWidth && currRectY >= pathWidth && currRectX <= right && currRectY <= bottom && inMaze === false) {
        inMaze = true;
        entryX = currRectX;
        entryY = currRectY;
        console.log("IN MAZE");
    }

    movingAllowed = canMoveTo(newX, newY);
    if (movingAllowed === 1) { // 1 means 'the rectangle can move'
        drawRectangle(newX, newY, "#0000FF");
        currRectX = newX;
        currRectY = newY;
    } else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
        // <<<<< FINISHED >>>>>
        $('.next').addClass("active");
        window.removeEventListener("keydown", moveRect, true);
    }
}

function canMoveTo(destX, destY) {
    var imgData = context.getImageData(destX, destY, rectSize, rectSize);
    var data = imgData.data;
    canMove = 1; // 1 means: the rectangle can move
    if (destX >= 0 && destX <= mazeWidth - rectSize && destY >= 0 && destY <= mazeHeight - rectSize) {
        for (var i = 0; i < 4 * rectSize * rectSize; i += 4) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // Black
                canMove = 0; // 0 means: the rectangle can't move
                break;
            } else if ((currRectX <= pathWidth || currRectY <= pathWidth || currRectX >= right || currRectY >= bottom) && inMaze === true) {
                canMove = 2; // 2 means: the end point is reached
                if (entryX === currRectX || entryY === currRectY) {
                    canMove = 1; // Allow movement if at the end
                    console.log("NU");
                }
                console.log("Exit");
                console.log("canMove: " + canMove);
                inMaze = false;
            }
        }
    } else {
        canMove = 0;
    }
    return canMove;
}

function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}

drawMazeAndRectangle(0, 0);

// Add event listeners for both keyboard and mouse movement
window.addEventListener("keydown", moveRect, true);
canvas.addEventListener("mousemove", moveRect);
