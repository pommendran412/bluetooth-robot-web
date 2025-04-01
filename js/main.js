let bluetoothDevice;
let writer;

// Connect to Bluetooth Device
async function connectBluetooth() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        });

        const server = await bluetoothDevice.gatt.connect();
        document.getElementById("status").innerText = "Status: Connected ✅";

        const batteryService = await server.getPrimaryService('battery_service');
        const batteryLevel = await batteryService.getCharacteristic('battery_level');

        batteryLevel.readValue().then(value => {
            let batteryPercent = value.getUint8(0);
            document.getElementById("battery-level").innerText = batteryPercent + "%";
        });

    } catch (error) {
        console.log("Bluetooth connection failed:", error);
        document.getElementById("status").innerText = "Status: Disconnected ❌";
    }
}

// Send Movement Commands
function sendCommand(command) {
    console.log(`Sending command: ${command}`);
    // Send command over Bluetooth (Replace with actual Bluetooth logic)
}

// Movement Functions
function moveForward() { sendCommand('F'); }
function moveBackward() { sendCommand('B'); }
function moveLeft() { sendCommand('L'); }
function moveRight() { sendCommand('R'); }
function stopMovement() { sendCommand('S'); }

// Speed Control
function sendSpeed() {
    let speed = document.getElementById("speed").value;
    sendCommand(`SPEED_${speed}`);
}
