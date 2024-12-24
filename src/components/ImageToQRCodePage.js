import React, { useState } from 'react';
import { QRCode } from 'qrcode.react';

function ImageToQRCodePage() {
    const [imagePath, setImagePath] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrCodeValue(reader.result);  
            };
            const imageFile = e.target.elements.image.files[0];
            if (imageFile) {
                reader.readAsDataURL(imageFile);  
            }
        } catch (err) {
            console.error('Error converting image to QR:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="image">: اختر صورة</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'جاري التحميل...' : 'تحويل إلى QR Code'}
                </button>
            </form>

            {qrCodeValue && (
                <div>
                    <h3>رمز QR الخاص بالصورة:</h3>
                    <QRCode value={qrCodeValue} /> 
                </div>
            )}
        </div>
    );
}

export default ImageToQRCodePage;
