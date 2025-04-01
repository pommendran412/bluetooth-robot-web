let joystickCanvas = document.getElementById("joystick");
let ctx = joystickCanvas.getContext("2d");

joystickCanvas.width = 150;
joystickCanvas.height = 150;

let centerX = joystickCanvas.width / 2;
let centerY = joystickCanvas.height / 2;
let radius = 40;

function drawJoystick(x, y) {
    ctx.clearRect(0, 0, joystickCanvas.width, joystickCanvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
}

drawJoystick(centerX, centerY);

joystickCanvas.addEventListener("mousemove", function (event) {
    let rect = joystickCanvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let dx = x - centerX;
    let dy = y - centerY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) {
        drawJoystick(x, y);

        if (dy < -20) moveForward();
        else if (dy > 20) moveBackward();
        else if (dx < -20) moveLeft();
        else if (dx > 20) moveRight();
    }
});

joystickCanvas.addEventListener("mouseleave", function () {
    drawJoystick(centerX, centerY);
});
