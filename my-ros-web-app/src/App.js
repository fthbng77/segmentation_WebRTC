import React, { useEffect, useState } from "react";
import ROSLIB from 'roslib';

function App() {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });
    
        const connectToRos = () => {
            ros.connect('ws://localhost:9090');
        };
    
        ros.on('connection', function () {
            console.log('Connected to websocket server.');
        });
    
        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
        });
    
        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
            setTimeout(connectToRos, 3000);
        });
    
        connectToRos();
    
        const topic = new ROSLIB.Topic({
            ros: ros,
            name: '/usb_cam/image_compressedd',
            messageType: 'sensor_msgs/CompressedImage'
        });
    
        topic.subscribe(function (message) {
            console.log('Received message on ' + topic.name + ': ', message);
    
            if (message.data) {
                const imageUrl = `data:image/jpg;base64,${message.data}`;
                setImgSrc(imageUrl);
            }
        });

        return () => {
            ros.close();
        };

    }, []);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {imgSrc && <img src={imgSrc} alt="From ROS" style={{ width: '640px', height: '480px' }} />}
        </div>
    );
}

export default App;
