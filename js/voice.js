function startVoiceCommand() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support voice recognition.");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let command = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command:", command);

        if (command.includes("forward")) moveForward();
        else if (command.includes("backward")) moveBackward();
        else if (command.includes("left")) moveLeft();
        else if (command.includes("right")) moveRight();
        else if (command.includes("stop")) stopMovement();
        else alert("Unknown command: " + command);
    };

    recognition.start();
}
