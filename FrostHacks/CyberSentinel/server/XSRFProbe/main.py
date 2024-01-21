#!C:\Users\HP\python_ver\py310\python.exe
# -*- coding: utf-8 -*-

#-:-:-:-:-:-:-::-:-:#
#    XSRF Probe     #
#-:-:-:-:-:-:-::-:-:#

# Author: 0xInfection
# This module requires XSRFProbe
# https://github.com/0xInfection/XSRFProbe

from xsrfprobe import xsrfprobe

if __name__ == '__main__':
    xsrfprobe.startEngine()