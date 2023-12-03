#!/bin/bash

# ROS komutlarını yeni bir terminalde çalıştır
gnome-terminal -- bash -c "cd /home/fatih/segmentation_WebRTC/my-ros-web-app/src/image_processing; roslaunch usb_cam-test.launch; exec bash"
gnome-terminal -- bash -c "cd /home/fatih/segmentation_WebRTC/my-ros-web-app/src/image_processing; python processor_compressed.py; exec bash"
gnome-terminal -- bash -c "roslaunch rosbridge_server rosbridge_websocket.launch; exec bash"

# React uygulamasını başlat
gnome-terminal -- bash -c "cd /home/fatih/segmentation_WebRTC/my-ros-web-app/src; npm start; exec bash"


