import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs'; 
import { QRCodeCanvas } from 'qrcode.react';  

function ShowQrcode() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const savedData = sessionStorage.getItem('userData');
        if (savedData) {
            setUserData(JSON.parse(savedData));  
        }
    }, []);

    const downloadExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.addRow(['الاسم', 'البريد الإلكتروني', 'رقم الهاتف', 'مسار الصورة']);
        worksheet.addRow([userData.name, userData.email, userData.phone, userData.imagePath]);

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'user_data.xlsx'; 
        link.click();
    };

    const shortenUrl = async (url) => {
        try {
            const response = await fetch(`https://api.tinyurl.com/api-create.php?url=${url}`);
            const shortenedUrl = await response.text();
            return shortenedUrl;
        } catch (error) {
            console.error('Error shortening URL:', error);
            return url; 
        }
    };

    return (
        <div className="page" id="show-qrcode-page">
        {userData ? (
            <div className="center-content">
                <h3>امسح الباركود</h3>
                <br />
                {userData.imagePath && 
                    <QRCodeCanvas value={shortenUrl(userData.imagePath)} />
                }
                <br />
                <br />
                <button id='start-btn' onClick={downloadExcel}>Excel تحميل البيانات في </button>
                <br />
                <br />

                <a href='/'><button id='start-btn'>العودة الصفحة الرئيسية</button></a>
            </div>
        ) : (
            <p>لم يتم العثور على بيانات.</p>  
        )}
    </div>
    
    );
}

export default ShowQrcode;
