let joystick = document.getElementById("joystick");
let ctx = joystick.getContext("2d");
let joystickCenter = { x: 100, y: 100 };
let active = false;

joystick.addEventListener("touchstart", startMove);
joystick.addEventListener("touchmove", moveJoystick);
joystick.addEventListener("touchend", stopMove);

function startMove(event) {
    active = true;
    moveJoystick(event);
}

function moveJoystick(event) {
    if (!active) return;
    let touch = event.touches[0];
    let x = touch.clientX - joystick.offsetLeft;
    let y = touch.clientY - joystick.offsetTop;

    ctx.clearRect(0, 0, joystick.width, joystick.height);
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Determine direction
    if (x < 70) sendCommand('3'); // Left
    else if (x > 130) sendCommand('4'); // Right
    else if (y < 70) sendCommand('1'); // Forward
    else if (y > 130) sendCommand('2'); // Backward
}

function stopMove() {
    active = false;
    ctx.clearRect(0, 0, joystick.width, joystick.height);
    sendCommand('5'); // Stop when released
}
