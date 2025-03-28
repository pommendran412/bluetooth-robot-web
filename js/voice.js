function startVoiceCommand() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
    recognition.onresult = function(event) {
        let command = event.results[0][0].transcript.toLowerCase();
        alert("Recognized: " + command);
        
        if (command.includes("forward")) sendCommand('1');
        else if (command.includes("backward")) sendCommand('2');
        else if (command.includes("left")) sendCommand('3');
        else if (command.includes("right")) sendCommand('4');
        else if (command.includes("stop")) sendCommand('5');
        else if (command.includes("auto mode")) sendCommand('A');
        else if (command.includes("manual mode")) sendCommand('M');
        else if (command.includes("speed to")) {
            let speed = command.replace(/\D/g, ""); // Extract numbers
            document.getElementById("speed").value = speed;
            sendSpeed();
        }
    };
}
