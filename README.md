# AxiDraw Serial examples

## To Start

Clone this repo to your desired directory

``` bash
cd path/to/folder
git clone https://github.com/jasontsemf/AxiDrawSerial.git
```

## Node quick start

``` bash
cd node
npm install serialport
node axidraw_serial.js
# uncommenct scanPort() in init() to find the correct port path
```

## Python quick start

``` bash
cd python
pip3 install pyserial
python3 axidraw_serial.py
# uncommenct scan_port() in init() to find the correct port path
```
