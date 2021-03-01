# pip3 install pyserial
import serial
from serial.tools.list_ports import comports

# your path should vary, edit after you scan_port()
path = '/dev/tty.usbmodem14101'
port_axidraw = serial.Serial(path)


def init():
    # call scanPort to figure out path to AxiDraw serial port
    # scan_port()

    if port_axidraw.isOpen():
        print(port_axidraw.name + ' is open...')
        draw()


def draw():
    # meaneuvering AxiDraw with the below action sequence
    pen_up()
    move(1000, 1000, 0)
    pen_down()
    move(2000, 0, -1000)
    toggle_pen()
    send_command('XM,3000,-1000,1000')
    toggle_pen()


def scan_port():
    for port in comports():
        # print(port)
        if 'usb' in port[0]:
            print(port[0])


# https://evil-mad.github.io/EggBot/ebb.html for complete command documentation

def pen_up():
    cmd = 'SP,0'
    send_command(cmd)


def pen_down():
    cmd = 'SP,1'
    send_command(cmd)


def toggle_pen():
    cmd = 'TP'
    send_command(cmd)


def move(ms, x, y):
    # in "ms" milliseconds, move x-axis by "x" steps, y-axis by "y" steps
    cmd = 'XM,{0},{1},{2}'.format(ms, x, y)
    send_command(cmd)


def send_command(c):
    cmd = c + '\r'
    port_axidraw.write((cmd).encode('utf-8'))     # write a string
    print('message written:', cmd)
    res = port_axidraw.readline().decode('utf-8').strip()
    # print(res.lower())
    while res.lower() != 'ok':
        pass


init()
