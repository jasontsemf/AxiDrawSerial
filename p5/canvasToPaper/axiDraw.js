// Axidraw Functions

function penUp() {
    let cmd = 'SP,0';
    sendCommand(cmd);
}

function penDown() {
    let cmd = 'SP,1';
    sendCommand(cmd);
}

function togglePen() {
    let cmd = 'TP';
    sendCommand(cmd);
}

function enableMotors(){
    let cmd = 'EM,1,1';
    sendCommand(cmd);
}

function disableMotors(){
    let cmd = 'EM,0,0';
    sendCommand(cmd);
}

function move(ms, x, y) {
    let cmd = `XM,${ms},${x},${y}`;
    sendCommand(cmd);
}

function keyboardMove(s){
    if ((keyIsDown(87) && keyIsDown(65)) || keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW)) {
        console.log("NW");
        x = -1;
        y = -1;
        move(1, x * s, y * s);
    } else if ((keyIsDown(87) && keyIsDown(68)) || keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)) {
        console.log("NE");
        x = 1;
        y = -1;
        move(1, x * s, y * s);
    } else if ((keyIsDown(83) && keyIsDown(65)) || keyIsDown(DOWN_ARROW) && keyIsDown(LEFT_ARROW)) {
        console.log("SW");
        x = -1;
        y = 1;
        move(1, x * s, y * s);
    } else if ((keyIsDown(83) && keyIsDown(68)) || keyIsDown(DOWN_ARROW) && keyIsDown(RIGHT_ARROW)) {
        console.log("SW");
        x = 1;
        y = 1;
        move(1, x * s, y * s);
    } else {
        if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
            console.log("up");
            x = 0;
            y = -1;
            move(1, x * s, y * s);
        } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
            console.log("down");
            x = 0;
            y = 1;
            move(1, x * s, y * s);
        } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            console.log("left");
            x = -1;
            y = 0;
            move(1, x * s, y * s);
        } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            console.log("right");
            x = 1;
            y = 0;
            move(1, x * s, y * s);
        }
    }
}

function sendCommand(c) {
    let cmd = c + '\r';
    serial.write(cmd);
}

// Commands: https://evil-mad.github.io/EggBot/ebb.html#EBB_Command_Reference
