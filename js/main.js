let bluetoothDevice;
let characteristic;

async function connectBluetooth() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        });
        const server = await bluetoothDevice.gatt.connect();
        characteristic = await server.getPrimaryService('battery_service');
        document.getElementById("status").innerText = "Status: Connected";
        readBatteryLevel();
    } catch (error) {
        alert("Bluetooth Connection Failed!");
    }
}

async function readBatteryLevel() {
    try {
        const batteryService = await bluetoothDevice.gatt.getPrimaryService('battery_service');
        const batteryCharacteristic = await batteryService.getCharacteristic('battery_level');
        const batteryData = await batteryCharacteristic.readValue();
        let batteryLevel = batteryData.getUint8(0);
        document.getElementById("battery-level").innerText = batteryLevel + "%";
    } catch (error) {
        document.getElementById("battery-level").innerText = "Error";
    }
}

function sendCommand(command) {
    if (bluetoothDevice) {
        console.log("Sending:", command);
    } else {
        alert("Connect to Bluetooth first!");
    }
}

function sendSpeed() {
    let speed = document.getElementById("speed").value;
    sendCommand("S" + speed);
}
