const SerialPort = require('serialport');

const path = "/dev/tty.usbmodem14101"; // your path should vary, edit after you scanPort()
const portAxiDraw = new SerialPort(path);

function init() {
    // call scanPort to figure out path to AxiDraw serial port
    // scanPort();

    if (portAxiDraw.opening) {
        console.log(portAxiDraw.path + ' is open...');
        draw();
    }
}

function draw() {
    // meaneuvering AxiDraw with the below action sequence
    penUp();
    move(1000, 1000, 0);
    penDown();
    move(2000, 0, -1000);
    togglePen();
    sendCommand("XM,3000,-1000,1000");
    togglePen();
}

function scanPort() {
    SerialPort.list().then(function (ports) {
        // console.log(ports);
        ports.forEach(port => {
            if (port.path.includes("usb")) {
                console.log(port.path);
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

// https://evil-mad.github.io/EggBot/ebb.html for complete command documentation

function penUp() {
    let cmd = "SP,0";
    sendCommand(cmd);
}

function penDown() {
    let cmd = "SP,1";
    sendCommand(cmd);
}

function togglePen() {
    let cmd = "TP\r";
    sendCommand(cmd);
}

function move(ms, x, y) {
    // in "ms" milliseconds, move x-axis by "x" steps, y-axis by "y" steps
    let cmd = `XM,${ms},${x},${y}`;
    sendCommand(cmd);
}

function sendCommand(c) {
    let cmd = c + '\r';
    portAxiDraw.write(cmd, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written:', cmd);
    });
}

init();