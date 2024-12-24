import React, { useEffect, useRef, useState } from 'react';
import ExcelJS from 'exceljs';
import { QRCodeCanvas } from 'qrcode.react';

function CameraPage({ capturePhoto, selectedFrame }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imagePath, setImagePath] = useState('');  
    const [countdown, setCountdown] = useState(3); 
    const [cameraActive, setCameraActive] = useState(true);  

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1); 
            }, 1000);

            return () => clearTimeout(timer); 
        } else if (countdown === 0) {
            capture(); 
        }
    }, [countdown]);

    const startCountdown = () => {
        setCountdown(3); 
    };

    const capture = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
    
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
    
            context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
    
            if (selectedFrame) {
                const frameImg = new Image();
                frameImg.src = '/assets/images/frame' + selectedFrame + '.png';  
    
                frameImg.onload = () => {
                    const frameWidth = videoWidth;  
                    const frameHeight = videoHeight;  
                    context.drawImage(frameImg, 0, 0, frameWidth, frameHeight);
                    
                    const imageData = canvasRef.current.toDataURL('image/png');
                    capturePhoto(imageData);  
                    
                    addToExcel(imageData);  
                    
                    generateQRCode(imageData);  

                    stopCamera();  
                };
    
                frameImg.onerror = (err) => {
                    console.error("Error loading frame:", err);
                    stopCamera();  
                };
            } else {
                const imageData = canvasRef.current.toDataURL('image/png');
                capturePhoto(imageData); 
                
                addToExcel(imageData); 
                
                generateQRCode(imageData); 

                stopCamera();  
            }
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        setCameraActive(false);  
    };

    const addToExcel = async (imageData) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");
    
        const imageId = workbook.addImage({
            base64: imageData,
            extension: 'png',
        });
        worksheet.addImage(imageId, 'A2');
    };
    
    const generateQRCode = async (imageData) => {
        try {
            const qrCodeData = 'Your QR content here';  
            const qrCodeUrl = await QRCodeCanvas.toDataURL(qrCodeData);
            
            console.log('QR Code generated:', qrCodeUrl);
        } catch (err) {
            console.error('Error generating QR Code:', err);
        }
    };

    return (
        <div className="page" id="camera-page">
            {cameraActive ? (
                <>
                    <video ref={videoRef} id="camera" autoPlay></video>
                    <p>جاري تشغيل الكاميرا...</p>
                </>
            ) : (
                <p>الكاميرا تم إيقافها.</p>
            )}
            <button id="start-btn" onClick={startCountdown}>التقاط</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {countdown > 0 && <div className="countdown">{countdown}</div>}
        </div>
    );
}

export default CameraPage;
